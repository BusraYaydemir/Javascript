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

/* kullanıcı dokunmatik ekrana sahip mi değil mi */
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

isTouchDevice(); /* sayfa yüklenirken kullanıcının cihazını belirler */

/* Create Grid'e tıklandığında yapılacaklar */
gridButton.addEventListener("click", () => {
    container.innerHTML = ""; /* var olan ızgarayı temizle */
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 1;
        let div = document.createElement("div"); /* her satır için bir div elementi oluştur */
        div.classList.add("gridRow"); /* div'e gridRow classını ekle */

        for (let j = 0; j < gridWidth.value; j++) {
            count += 1;
            let col = document.createElement("div"); /* her sütun için bir div elementi oluşturulur */
            col.classList.add("gridCol"); /* div'e gridCol classını ekler */
            col.setAttribute("id", `gridCol${count}`); /* her sütuna bir id ata, örneğin ilk sütun gridCol1 */

            /* ekrana tıklandığında yada dokunulduğunda bir olay dinleyicisi */
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            /* ekranda hareket ederken bir olay dinleycisi */
            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint( /* hareket ettirilen noktanın id'sini al */
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId); /* elementi checker function'ına gönder */
            });

            /* dokunmayı bırakma olayı dinleyicisi */
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col); /* sütunları satırların içine ekler */

        }

        container.appendChild(div); /* satırları container'a ekler */

    }
});

/* boyama yada silme işlemi */
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

/* Clear Grid de ızgarayı boşalt */
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

/* Silgiyi aktif et */
eraseBtn.addEventListener("click", () => {
    erase = true;
});

/* Silgiyi pasif et */
paintBtn.addEventListener("click", () => {
    erase = false;
});

/* Gridlerdeki sayının görünümünü güncelle. Eğer 9 dan küçük ise başına bir 0 ekle */
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

/* program yüklenirken değerleri sıfırla */
window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};