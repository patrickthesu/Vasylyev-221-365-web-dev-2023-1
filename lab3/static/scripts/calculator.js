const have_db = document.querySelector("#have_db");
const have_no_db = document.querySelector("#have_no_db");
const gsheets_service = document.querySelector("#gsheets_service");
const gforms_service = document.querySelector("#gforms_service");
const gdrive_service = document.querySelector("#gdrive_service");
const groups_manage = document.querySelector("#groups_manage");
const chanel_manage = document.querySelector("#chanel_manage");
const money_manage = document.querySelector("#money_manage");

const communicationValue = document.querySelector("#communicationValue");
const communicationInput = document.querySelector("#communicationInput");
const amount = document.querySelector("#amount");

const communicationValues = {
  0: "Нет",
  1: "Минимальное",
  2: "Много",
  3: "Много на разных языках",
}

const communicationAmounts = {
  0: 0,
  1: 1000,
  2: 3000,
  3: 10000,
}

communicationValue.textContent = communicationValues[communicationInput.value];
communicationInput.addEventListener("input", (event) => {
  communicationValue.textContent = communicationValues[event.target.value];
});

function getCurrent () {
  let initialAmount = 5000;
  if (have_db.checked) initialAmount += 2000;
  if (gsheets_service.checked) initialAmount += 1000;
  if (gforms_service.checked) initialAmount += 1000;
  if (gdrive_service.checked) initialAmount += 1000;
  if (groups_manage.checked) initialAmount += 2000;
  if (chanel_manage.checked) initialAmount += 1000;
  if (money_manage.checked) initialAmount += 3000;
  return initialAmount + communicationAmounts[communicationInput.value];

}

amount.textContent = getCurrent();

const inputs = [
  have_db,
  have_no_db,
  gsheets_service,
  gforms_service,
  gdrive_service,
  groups_manage,
  chanel_manage,
  money_manage,
  communicationInput,
]

inputs.map(input => {
  input.addEventListener("input", (event) => {
  amount.textContent = getCurrent();
});
})
