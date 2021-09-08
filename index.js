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
//Common validators
function validator(fieldName, errClass, errMessage) {
    fieldName.classList.add("error");
    const err = new Error(errMessage);
    document.getElementsByClassName(errClass)[0].innerHTML = `Error: ${err.message}`;
};
function successValidate(errClass, fieldName) {
    document.getElementsByClassName(errClass)[0].innerHTML = "";
    fieldName.classList.remove("error");
    fieldName.classList.add("success");
};
//Validators
function userNameValidate(userName, minLength) {
    const nameLength = userName.value.length;
    const errorClass = "error-message-name"
    if (nameLength === 0) {
        validator(userName, errorClass, "field is required")
        return false;
    } else if (nameLength <= minLength) {
        validator(userName, errorClass, `field must includes more than ${minLength} symbols`)
        return false;
    }
    successValidate(errorClass, userName)
    return true
};
function passwordValidate(password) {
    const passwordLength = password.value.length;
    const errorClass = "error-message-password"
    const rule = /^[a-z0-9]+$/ && /[a-z]/ && /[0-9]/;
    if (passwordLength === 0) {
        validator(password, errorClass, "field is required")
        return false;
    } else if (!password.value.match(rule)) {
        validator(password, errorClass, "field must includes letters and numbers")
        return false;
    }
    successValidate(errorClass, password)
    return true;
};
function countryValidate(ukr, rus, bel) {
    const selectBox = document.getElementsByClassName('select-box')[0];
    const errorClass = "error-message-country";
    if ((!ukr.checked) && (!rus.checked) && (!bel.checked)) {
        validator(selectBox, errorClass, "at least 1 country must be checked")
        return false;
    } else {
        successValidate(errorClass, selectBox)
        return true;
    }
};
function sexValidate(male, female) {
    const buttonsBox = document.getElementsByClassName('buttons')[0];
    const errorClass = "error-message-radio";
    if (!male.checked && !female.checked) {
        validator(buttonsBox, errorClass, "select male/female")
        return false;
    }
    successValidate(errorClass, buttonsBox)
    return true;
};
function acceptValidate(accept) {
    const buttonsBox = document.getElementsByClassName('buttons')[0];
    const errorClass = "error-message-radio";
    if (!accept.checked) {
        validator(buttonsBox, errorClass, "please, accept terms and conditions")
        return false;
    }
    successValidate(errorClass, buttonsBox)
    return true;
};
//Valilidate function
function validateFunc() {

    const ukr = document.getElementById("Ukraine");
    const rus = document.getElementById("Russia");
    const bel = document.getElementById("Belarus");
    const validateStatus = userNameValidate(userName, 2)&&passwordValidate(password)&&countryValidate(ukr, rus, bel)&&sexValidate(male, female)&&acceptValidate(accept)
    if (validateStatus) {
        btn.removeAttribute("disabled");
        btn.classList.add("success");
    }
};
function setPasswordType() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
};
//password visibility handler
eye.addEventListener('click', setPasswordType);
//Menu handler
selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});
//Select group handler
optionList.forEach(option => {
    option.addEventListener("click", (e) => {
        validateFunc();
        const countrySelected = option.getElementsByTagName("input")[0].value;
        selected.innerHTML = countrySelected;
        optionsContainer.classList.remove("active");
        document.getElementsByClassName('select-box')[0].classList.remove("error");
        document.getElementsByClassName("error-message-country")[0].innerHTML = "";
        data.country = countrySelected;
    });
});
// Radio handler
Array.from(sex.getElementsByClassName("registration_group")).forEach(sex => {
    sex.addEventListener("click", (e) => {
        validateFunc();
        const sexSelected = sex.getElementsByTagName("input")[0].value;
        data.sex = sexSelected;
    });
});

userName.addEventListener("blur", validateFunc);
password.addEventListener("blur", validateFunc);
accept.addEventListener("blur", validateFunc);
//Send data & reset form handler
function onSendHandler() {
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
}
btn.addEventListener("click", onSendHandler);
