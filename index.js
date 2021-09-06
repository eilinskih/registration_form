const selected = document.getElementById("selected");
const optionsContainer = document.getElementById("options-container");
const optionList = Array.from(document.getElementsByClassName("option"));

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionList.forEach(option => {
    option.addEventListener("click", () => {
        selected.innerHTML = option.getElementsByTagName("label")[0].innerHTML;
        optionsContainer.classList.remove("active");
    });
});