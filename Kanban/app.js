const dropdowns = document.querySelectorAll(".dropdown");
let boardDropdown = document.getElementById("boardDropdown");

let modalBackground = document.getElementById("popup-wrapper");

let boardCoulmnSelected = document.getElementById("boardSelected");
let typeSelected = document.getElementById("typeSelected");
let definitionInput = document.getElementById("definitionInput");
let dateInput = document.getElementById("dateInput");
let commentInput = document.getElementById("commentInput");

let addItemBtn = document.getElementById("addItemBtn");

let boxCoulmn = document.querySelectorAll(".box-coulmn");

let plusBtn = document.querySelectorAll(".fa-plus");

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            selected.innerText = option.innerText;
            select.classList.remove("select-clicked");
            caret.classList.remove("caret-rotate");
            menu.classList.remove("menu-open");

            options.forEach(option => {
                option.classList.remove("active");
            });

            option.classList.add("active");
        });
    });
});

plusBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        modalBackground.style.display = "flex";
        const options = boardDropdown.querySelectorAll(".menu li");
        options.forEach(option => {
            option.classList.remove("active");
        });
        
        if(btn.id == "add-backlog"){
            boardCoulmnSelected.innerHTML = "Backlog";
        } else if(btn.id == "add-todo"){
            boardCoulmnSelected.innerHTML = "To Do";
        } else if(btn.id == "add-inprogress"){
            boardCoulmnSelected.innerHTML = "In Progress";
        } else if(btn.id == "add-test"){
            boardCoulmnSelected.innerHTML = "Test";
        } else if(btn.id == "add-uat"){
            boardCoulmnSelected.innerHTML = "UAT";
        } else if(btn.id == "add-done"){
            boardCoulmnSelected.innerHTML = "Done";
        }

        options.forEach(option => {
            if(option.innerText == boardCoulmnSelected.innerText) {
                option.classList.add("active");
            }
        });
    });
});

modalBackground.addEventListener("click", () => {
    if (event.target === modalBackground) {
        modalBackground.style.display = "none";
    }
});


function calculateItemInCoulmn() {
    boxCoulmn.forEach(coulmn => {
        let boxes = coulmn.querySelectorAll(".box");
        let numSpan = coulmn.querySelector(".num");
        numSpan.innerHTML = boxes.length;
    });
}

calculateItemInCoulmn();

addItemBtn.addEventListener("click", () => {


    let boardCoulmnInnerText = boardCoulmnSelected.innerText;
    let itemTypeInnerText = typeSelected.innerText;
    let definitionInnerText = definitionInput.value;
    let dateInnerText = new Date(dateInput.value).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        // year: 'numeric'
    });
    let commentInnerText = commentInput.value;

    let inWhichBoard = document.getElementById(boardCoulmnInnerText);
    let boxDiv = document.createElement("div");
    boxDiv.classList.add("box");

    let tagSpan = document.createElement("span");
    tagSpan.classList.add("tag");
    if (itemTypeInnerText == "Customization") {
        tagSpan.id = "red";
    } else if (itemTypeInnerText == "Software Development") {
        tagSpan.id = "green";
    } else if (itemTypeInnerText == "Documentation") {
        tagSpan.id = "yellow";
    }
    tagSpan.innerHTML = itemTypeInnerText;
    boxDiv.appendChild(tagSpan);

    let p = document.createElement("p");
    p.innerHTML = definitionInnerText;
    boxDiv.appendChild(p);

    let boxFooterDiv = document.createElement("div");
    boxFooterDiv.classList.add("box-footer");

    let dateDiv = document.createElement("div");
    dateDiv.classList.add("date");

    let li = document.createElement("li");

    let i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-calendar-days");

    li.appendChild(i);
    dateDiv.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = dateInnerText;
    dateDiv.appendChild(span);

    boxFooterDiv.appendChild(dateDiv);

    let commentLi = document.createElement("li");
    commentLi.classList.add("comment");

    let commentI = document.createElement("i");
    commentI.classList.add("fa-solid");
    commentI.classList.add("fa-message");

    commentLi.appendChild(commentI);
    commentLi.innerHTML += "14";

    boxFooterDiv.appendChild(commentLi);
    boxDiv.appendChild(boxFooterDiv);

    inWhichBoard.appendChild(boxDiv);

    calculateItemInCoulmn();
});