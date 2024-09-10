
let price = 3.26; 
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]

const currencyUnits = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01]
];

function handlePurchase() {
  const cash = parseFloat(document.getElementById('cash').value);
  let changeDue = cash - price;
  const changeDisplay = document.getElementById('change-due');

  if (cash < price) {
    alert('Customer does not have enough money to purchase the item');
    return;
  }

  if (cash === price) {
    changeDisplay.innerText = 'No change due - customer paid with exact cash';
    return;
  }

  let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0);
  totalCid = parseFloat(totalCid.toFixed(2));

  if (totalCid < changeDue) {
    changeDisplay.innerText = 'Status: INSUFFICIENT_FUNDS';
    return;
  }

  if (totalCid === changeDue) {
    changeDisplay.innerText = `Status: CLOSED ${formatChange(cid)}`;
    updateCashDisplay(cid); 
    return;
  }

  const changeArray = getChange(changeDue, cid);
  
  if (!changeArray) {
    changeDisplay.innerText = 'Status: INSUFFICIENT_FUNDS';
  } else {
    changeDisplay.innerText = `Status: OPEN ${formatChange(changeArray)}`;
  }

  updateCashDisplay(cid);
}

function getChange(changeDue, cid) {
  let change = [];
  let totalChange = changeDue;

  for (let [unit, value] of currencyUnits) {
    let cidIndex = cid.findIndex(item => item[0] === unit);
    let cidAmount = cid[cidIndex][1];
    let amountTaken = 0;

    while (totalChange >= value && cidAmount > 0) {
      totalChange -= value;
      cidAmount -= value;
      amountTaken += value;
      totalChange = parseFloat(totalChange.toFixed(2)); 
    }

    if (amountTaken > 0) {
      cid[cidIndex][1] -= amountTaken;
      change.push([unit, amountTaken]);
    }
  }

  if (totalChange > 0) {
    return null; 
  }

  return change;
}

function formatChange(changeArray) {
  return changeArray
    .filter(([unit, amount]) => amount > 0) 
    .map(([unit, amount]) => `${unit}: $${parseFloat(amount.toFixed(2))}`) 
    .join(' ');
}

function updateCashDisplay(cid) {
  cid.forEach(([unit, amount]) => {
    const formattedAmount = parseFloat(amount.toFixed(2));
    switch (unit) {
      case 'PENNY':
        document.getElementById('pennies').innerText = `Pennies: $${formattedAmount}`;
        break;
      case 'NICKEL':
        document.getElementById('nickels').innerText = `Nickels: $${formattedAmount}`;
        break;
      case 'DIME':
        document.getElementById('dimes').innerText = `Dimes: $${formattedAmount}`;
        break;
      case 'QUARTER':
        document.getElementById('quarters').innerText = `Quarters: $${formattedAmount}`;
        break;
      case 'ONE':
        document.getElementById('ones').innerText = `Ones: $${formattedAmount}`;
        break;
      case 'FIVE':
        document.getElementById('fives').innerText = `Fives: $${formattedAmount}`;
        break;
      case 'TEN':
        document.getElementById('tens').innerText = `Tens: $${formattedAmount}`;
        break;
      case 'TWENTY':
        document.getElementById('twenties').innerText = `Twenties: $${formattedAmount}`;
        break;
      case 'ONE HUNDRED':
        document.getElementById('hundreds').innerText = `Hundreds: $${formattedAmount}`;
        break;
      default:
        break;
    }
  });
}

document.getElementById('purchase-btn').addEventListener('click', handlePurchase);
