const selected = document.getElementById("selected");
const optionsContainer = document.getElementById("options-container");
const optionList = Array.from(document.getElementsByClassName("option"));
const btn = document.getElementsByClassName("registration_button")[0];
const userName = document.getElementById('Name');
const password = document.getElementById('Password');
const accept = document.getElementById('accept');
const male = document.getElementById('male');
const female = document.getElementById('female');


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
}

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
}

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
}

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
}

function acceptValidate(accept) {
    if (!accept.checked) {
        document.getElementsByClassName('buttons')[0].classList.add("error");
        let err = new Error("please, accept terms and conditions");
        document.getElementsByClassName("error-message-radio")[0].innerHTML = `Error: ${err.message}`;
        return false;
    }
    document.getElementsByClassName("error-message-radio")[0].innerHTML = "";
    document.getElementsByClassName('buttons')[0].classList.remove("error");
    btn.removeAttribute("disabled");
    return true;
}

function validateFunc() {

    const ukr = document.getElementById("Ukraine");
    const rus = document.getElementById("Russia");
    const bel = document.getElementById("Belarus");

    if (userNameValidate(userName, 2)) {
        if (passwordValidate(password)) {
            if (countryValidate(ukr, rus, bel)) {
                if (sexValidate(male, female)) {
                    if (acceptValidate(accept)) {

                    }
                }
            }
        }
    }
};

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionList.forEach(option => {
    option.addEventListener("click", () => {
        selected.innerHTML = option.getElementsByTagName("label")[0].innerHTML;
        optionsContainer.classList.remove("active");
        validateFunc();
    });
});

userName.onblur = validateFunc;
password.onblur = validateFunc;
accept.onclick = validateFunc;
male.onclick = validateFunc;
female.onclick = validateFunc;

btn.addEventListener("click", (e) => {
    e.preventDefault();
    validateFunc();
    let data = {};
    let form = document.forms.registration_form;
    // data.name = userName.value;
    // data.password = password.value;
    // data.country = getCountry();
    // data.sex = getSex();
    // data.accept = accept.value;
    // function getCountry() {
    // for(i=0; i<form.country.length; i++) {
    //     if (form.country[i].checked) {
    //         return form.country[i];
    //     }
    // }
    // };
    // function getSex() {
    //     for(i=0; i<form.sex.length; i++) {
    //         if (form.sex[i].checked) {
    //             return form.sex[i];
    //         }
    //     }
    //     };
console.log(form.country)

})
