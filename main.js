let IsTriggered = [0, 0, 0];

let BillCost = document.querySelector("#bill");
let BillCostErrorMessage = document.querySelector(".bill-error");

let PeopleNum = document.querySelector("#person");
let PeopleNumErrorMessage = document.querySelector(".people-error");

let Buttons = document.querySelectorAll(".PercentButton");
let CustomPercent = document.querySelector("#customPercent");
let PercentErrorMessage = document.querySelector(".percent-error");

let TipResult = document.querySelector(".TipInDollars");
let TotalResult = document.querySelector(".TotalInDollars");

let ResetButton = document.querySelector(".Reset");

let Bill;
let People;
let Percent;

let Tips;
let PerPerson;

function Calculate() {
    Tips = "$" + (Bill * Percent / 100 ).toFixed(2);
    PerPerson = "$" + (Bill * (Percent / 100 + 1) / People).toFixed(2);

    TipResult.innerHTML = Tips;
    TotalResult.innerHTML = PerPerson;
}

function CheckForErrors() {
    let IsAllTrue = true;
    for (let i = 0; i < 3; i++) { 
        if (!IsTriggered[i]) {
            IsAllTrue = false;
            switch (i) {
                case 0:
                    BillCostErrorMessage.classList.add("error");
                    break;
                case 1:
                    PeopleNumErrorMessage.classList.add("error");
                    break;
                case 2:
                    PercentErrorMessage.classList.add("error");
                    break;
            }
        }
    }

    if (IsAllTrue) {
        Calculate();
    }
}

    // Wanted to do with a timer, but I failed a bit and couldn't find the root of the problem.

function startCountdown(event) {
    CheckForErrors();
}

BillCost.addEventListener("input", function () {
    startCountdown();
    BillCostErrorMessage.classList.remove("error");
    IsTriggered[0] = true;
    Bill = BillCost.value;
});

PeopleNum.addEventListener("input", function () {
    startCountdown();
    IsTriggered[1] = true;
    PeopleNumErrorMessage.classList.remove("error");
    People = PeopleNum.value;
});

Buttons.forEach(button => {
    button.addEventListener("click", function () {
        startCountdown();
        IsTriggered[2] = true;
        PercentErrorMessage.classList.remove("error");
        Percent = button.dataset.percent;

        Buttons.forEach(ebutton => {
            ebutton.classList.remove("active")
        });

        button.classList.add("active");
    })
});

CustomPercent.addEventListener("input", function () {
    startCountdown();
    IsTriggered[2] = true;
    PercentErrorMessage.classList.remove("error");
    Percent = CustomPercent.value;

    Buttons.forEach(ebutton => {
        ebutton.classList.remove("active")
    });
});

ResetButton.addEventListener("click", function() {
    BillCost.value = "0";
    PeopleNum.value = "0";
    CustomPercent.value = "Custom";

    Bill = 0;
    People = 0;
    Percent = 0;

    Buttons.forEach(ebutton => {
        ebutton.classList.remove("active")
    });


})