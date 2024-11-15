let headerButtons = document.getElementsByClassName("header-button");
let unselectedButtons = document.getElementsByClassName("unselected");
let selectedButtons = document.getElementsByClassName("selected");


for (let i = 0; i < headerButtons.length; i++) {
    let currentButton = headerButtons[i];
    currentButton.addEventListener("click", function() {
        if(currentButton.classList.contains("unselected")) {
            selectedButtons[0].classList.add("unselected");
            selectedButtons[0].classList.remove("selected");

            currentButton.classList.add("selected");
            currentButton.classList.remove("unselected");
        }
    });
}