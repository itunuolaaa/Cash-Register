let price = 19.5; // You can change this for testing
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash").value);
  const changeDueElem = document.getElementById("change-due");

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueElem.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeDue = cash - price;
  let totalCid = cid.reduce((sum, [_, amount]) => sum + amount, 0);
  totalCid = parseFloat(totalCid.toFixed(2));

  const changeArray = [];
  let changeRemaining = changeDue;

  const reversedCid = [...cid].reverse();

  for (let [unit, amount] of reversedCid) {
    let unitValue = currencyUnits[unit];
    let amountUsed = 0;

    while (changeRemaining >= unitValue && amount > 0) {
      changeRemaining = parseFloat((changeRemaining - unitValue).toFixed(2));
      amount = parseFloat((amount - unitValue).toFixed(2));
      amountUsed += unitValue;
    }

    if (amountUsed > 0) {
      changeArray.push([unit, amountUsed]);
    }
  }

  const changeGiven = changeArray.reduce((sum, [_, amt]) => sum + amt, 0);
  changeRemaining = parseFloat(changeRemaining.toFixed(2));

  if (changeRemaining > 0) {
    changeDueElem.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (changeRemaining === 0 && totalCid === changeDue) {
  const closedChange = changeArray
    .map(([unit, amt]) => `${unit}: $${amt.toFixed(2)}`)
    .join(" ");
  changeDueElem.textContent = `Status: CLOSED ${closedChange}`;
  return;
}

  const openChange = changeArray
    .map(([unit, amt]) => `${unit}: $${amt.toFixed(2)}`)
    .join(" ");
  changeDueElem.textContent = `Status: OPEN ${openChange}`;
});