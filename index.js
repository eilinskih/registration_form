//Global variables
const selected = document.getElementById("selected");
const optionsContainer = document.getElementById("options-container");
const optionList = Array.from(document.getElementsByClassName("option"));
const btn = document.getElementsByClassName("registration_button")[0];
const userName = document.getElementById('Name');
const password = document.getElementById('Password');
const accept = document.getElementById('accept');
const male = document.getElementById('male');
const female = document.getElementById('female');
const sex = document.getElementsByClassName('sex')[0];
const eye = document.getElementById("eye");
let data = {};
//Validators
function userNameValidate(userName, minLength) {
    let nameLength = userName.value.length;
    if (nameLength == 0) {
        document.getElementById('Name').classList.add("error");
        let err = new Error("field is required");
        document.getElementsByClassName("error-message-name")[0].innerHTML = `Error: ${err.message}`;
        return false;
    }
    else if (nameLength <= minLength) {
        document.getElementById('Name').classList.add("error");
        let err = new Error(`field must includes more than ${minLength} symbols`);
        document.getElementsByClassName("error-message-name")[0].innerHTML = `Error: ${err.message}`;
        return false;
    }
    document.getElementsByClassName("error-message-name")[0].innerHTML = "";
    document.getElementById('Name').classList.remove("error");
    return true
};

function passwordValidate(password) {
    let passwordLength = password.value.length;
    let rule = /^[a-z0-9]+$/ && /[a-z]/ && /[0-9]/;
    if (passwordLength == 0) {
        document.getElementById('Password').classList.add("error");
        let err = new Error("field is required");
        document.getElementsByClassName("error-message-password")[0].innerHTML = `Error: ${err.message}`;
        return false;
    }
    else if (!password.value.match(rule)) {
        document.getElementById('Password').classList.add("error");
        let err = new Error("field must includes letters and numbers");
        document.getElementsByClassName("error-message-password")[0].innerHTML = `Error: ${err.message}`;
        return false;
    }
    document.getElementsByClassName("error-message-password")[0].innerHTML = "";
    document.getElementById('Password').classList.remove("error");
    return true;
};

function countryValidate(ukr, rus, bel) {
    if ((ukr.checked == false) && (rus.checked == false) && (bel.checked == false)) {
        document.getElementsByClassName('select-box')[0].classList.add("error");
        let err = new Error("at least 1 country must be checked");
        document.getElementsByClassName("error-message-country")[0].innerHTML = `Error: ${err.message}`;
        return false;
    } else {
        document.getElementsByClassName("error-message-country")[0].innerHTML = "";
        document.getElementsByClassName('select-box')[0].classList.remove("error");
        return true;
    }
};

function sexValidate(male, female) {
    if (!male.checked && !female.checked) {
        document.getElementsByClassName('buttons')[0].classList.add("error");
        let err = new Error("select male/female");
        document.getElementsByClassName("error-message-radio")[0].innerHTML = `Error: ${err.message}`;
        return false;
    }
    document.getElementsByClassName("error-message-radio")[0].innerHTML = "";
    document.getElementsByClassName('buttons')[0].classList.remove("error");
    return true;
};

function acceptValidate(accept) {
    if (!accept.checked) {
        document.getElementsByClassName('buttons')[0].classList.add("error");
        let err = new Error("please, accept terms and conditions");
        document.getElementsByClassName("error-message-radio")[0].innerHTML = `Error: ${err.message}`;
        return false;
    }
    document.getElementsByClassName("error-message-radio")[0].innerHTML = "";
    document.getElementsByClassName('buttons')[0].classList.remove("error");
    return true;
};
//Valilidate function
function validateFunc() {

    const ukr = document.getElementById("Ukraine");
    const rus = document.getElementById("Russia");
    const bel = document.getElementById("Belarus");

    if (userNameValidate(userName, 2)) {
        if (passwordValidate(password)) {
            if (countryValidate(ukr, rus, bel)) {
                if (sexValidate(male, female)) {
                    if (acceptValidate(accept)) {
                        btn.removeAttribute("disabled");
                        btn.classList.add("success");
                    }
                }
            }
        }
    }
};
//password visibility handler
eye.addEventListener('click', (e) => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
});
//Menu handler
selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});
//Select group handler
optionList.forEach(option => {
    option.addEventListener("click", (e) => {
        validateFunc();
        let countrySelected = option.getElementsByTagName("input")[0].value;
        selected.innerHTML = countrySelected;
        optionsContainer.classList.remove("active");
        data.country = countrySelected;
    });
});
// Radio handler
Array.from(sex.getElementsByClassName("registration_group")).forEach(sex => {
    sex.addEventListener("click", (e) => {
        validateFunc();
        let sexSelected = sex.getElementsByTagName("input")[0].value;
        data.sex = sexSelected;
    });
});

userName.onblur = validateFunc;
password.onblur = validateFunc;
accept.onclick = validateFunc;
//Send data & reset form handler
btn.addEventListener("click", (e) => {
    e.preventDefault();
    validateFunc();
    data.name = userName.value;
    data.password = password.value;
    data.accept = accept.value;
    localStorage.setItem("data", JSON.stringify(data))
    btn.setAttribute("disabled", "disabled");
    userName.value = "";
    password.value = "";
    optionList.forEach(option => {
        option.getElementsByTagName("input")[0].checked = false;
            selected.innerHTML = "Country"
            optionsContainer.classList.remove("active");
             validateFunc();
        });
        Array.from(sex.getElementsByClassName("registration_group")).forEach(sex => {              
                sex.getElementsByTagName("input")[0].checked = false;
                validateFunc();
        });
        btn.classList.remove("success");
})
