const loanAmount = document.getElementById("loan-amount");
const loanTenure = document.getElementById("loan-tenure");
const loanRate = document.getElementById("loan-interest");
const loanEmi = document.getElementById("loanemi");
const loanPrinciple = document.getElementById("loanprinciple");
const loanTotal = document.getElementById("loantotal");
const loanInterest = document.getElementById("loaninterest");
let submitBtn = document.getElementById("calcbtn");
let error = document.querySelector(".error");
let result = document.querySelector(".result");

function calculate(){
    if(loanAmount.value == '' || loanTenure.value == '' || loanRate.value == ''){
        error.style.display = "block";
        error.innerHTML = "Please Fill All The Fields";
        setTimeout(()=>{
            error.style.display = "none";
        },2000)
    }else{
        calculateEmi();
    }
}
function calculateEmi(){
    amount = loanAmount.value;
    tenure = loanTenure.value*12; //1year = 12months;
    rate = loanRate.value/12/100; //loan rate per year/100 = loan percentage
    emi = (amount*rate*(1+rate)**tenure)/((1+rate)**tenure-1);
    total = emi*tenure; //total amount to be paid including interest
    interest = total-amount; //interest = total amount - principle amount
    result.style.display = "Block";
    document.querySelector(".container").style.height = "100%";
    loanEmi.innerHTML = Math.floor(emi);
    loanPrinciple.innerHTML = Math.floor(amount);
    loanTotal.innerHTML = Math.floor(total);
    loanInterest.innerHTML = Math.floor(interest);

    //displaying pie chart that describe the details
    let xValues = ["Principles","Interest"];
    let yValues = [amount,Math.floor(interest)];
    let barColors = ["#3598DB","#d6f0fd"];

    new Chart("loanChart",{
        type: "pie",
        data: {
            labels: xValues,
            datasets:[
                {
                    backgroundColor: barColors,
                    data: yValues
                }
            ]
        },
        options: {
            title: {
                display: false
            }
        }
    })
}