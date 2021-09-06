const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionList.forEach(option => {
    option.addEventListener("click", () => {
        selected.innerHTML = option.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});