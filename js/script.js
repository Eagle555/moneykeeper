let startBtn = document.getElementById('start'),

    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),

    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

startBtn.addEventListener('click', () => {
    time = prompt("Введите дату в формате YYYY-MM-DD", '');
    while(time == null || time == ''){
        time = prompt("Введите дату в формате YYYY-MM-DD", '');
    }
    money = +prompt("Ваш бюджет на месяц?", '');
    while(money == null || money == '' || isNaN(money)){
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.budget = money;
    budgetValue.textContent = money.toFixed();
    appData.timeData = time;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

expensesBtn.addEventListener('click', () => {
    for (let i = 0; i < expensesItem.length; i++){
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if(typeof(a) === 'string' && typeof(a) != null && a.length <= 10 &&
        a != '' &&  typeof(b) != null  && b != ''){
            appData.expenses[a] = b;
            expensesValue.textContent += ` ${a} : ${b}`;

        }
    }
});

optionalExpensesBtn.addEventListener('click', () => {
    optionalExpensesItem.forEach(function(item, i){
        appData.optionalExpenses[i+1] = item.value;
        optionalExpensesValue.textContent += ` ${item.value}`;
    });
});

countBtn.addEventListener('click', () => {
    if (appData.budget != undefined){
            let spend = 0;
            for(let key in appData.expenses){
                let sum = +appData.expenses[key];
                spend = spend + sum;
            }
        console.log(spend);
            appData.dayIncome = ((appData.budget - spend) / 30).toFixed();
            dayBudgetValue.textContent = appData.dayIncome;
        
        if (appData.dayIncome < 100){
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.dayIncome > 100 && appData.dayIncome < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.dayIncome > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
 }
});

incomeItem.addEventListener('input', () => {
        let result = incomeItem.value;

            appData.income = result.split(', ');
            appData.income.sort();
            incomeValue.textContent = incomeItem.value;
});

checkSavings.addEventListener('click', () => {
    if(appData.savings == false){
        appData.savings = true;
    } else {
        appData.savings = false;
    }
});

sumValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let save = +sumValue.value,
            percent = +percentValue.value;
         
        appData.monthIncome = save/100/12*percent;
        appData.yearIncome = save/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
     }
});

percentValue.addEventListener('input', () => {
    if (appData.savings == true) {
        let save = +sumValue.value,
            percent = +percentValue.value;
         
        appData.monthIncome = save/100/12*percent;
        appData.yearIncome = save/100*percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
     }
});



