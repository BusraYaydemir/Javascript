let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

let draw = false;
let erase = false;

/* does the user have a touch screen or not */
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice(); /* determines the user's device when loading the page */

/* What to do when clicking Create Grid */
gridButton.addEventListener("click", () => {
    container.innerHTML = ""; /* clear existing grid */
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 1;
        let div = document.createElement("div"); /* create a div element for each row */
        div.classList.add("gridRow"); /* Add div grid Row class */

        for (let j = 0; j < gridWidth.value; j++) {
            count += 1;
            let col = document.createElement("div"); /* A div element is created for each column */
            col.classList.add("gridCol"); /* Adds gridCol class to div */
            col.setAttribute("id", `gridCol${count}`); /* assign an id to each column, for example the first column is gridCol1 */

            /* An event listener when the screen is clicked or tapped */
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            /* an event listener as it moves around the screen */
            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint( /* get the id of the moved point */
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId); /* send element to checker function */
            });

            /* touch release event listener */
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col); /* inserts columns inside rows */

        }

        container.appendChild(div); /* adds rows to container */

    }
});

/* painting or erasing */
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

/* Empty the grid in Clear Grid */
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

/* Activate eraser */
eraseBtn.addEventListener("click", () => {
    erase = true;
});

/* Disable eraser */
paintBtn.addEventListener("click", () => {
    erase = false;
});

/* Update the appearance of the number in grids. If it is less than 9, add a leading 0 */
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

/* reset values when loading program */
window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};