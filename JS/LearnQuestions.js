const waysToGetAllHeadsInput = document.getElementById('inputCombination');
const numWaysToAllHeadsBanner = document.getElementById('numWaysToAllHeadsBanner');

function verifyWaysToGetAllHeads() {
    console.log(waysToGetAllHeadsInput.value)
    const isValid = waysToGetAllHeadsInput.value == 1
    const bannerType = isValid ? "alert-success" : "alert-danger"
    const bannerText = isValid ? "Correct!" : "Not quite!"

    numWaysToAllHeadsBanner.classList.remove(...numWaysToAllHeadsBanner.classList);
    numWaysToAllHeadsBanner.classList.add("alert", bannerType);
    numWaysToAllHeadsBanner.innerHTML = `${bannerText} There is only one way to get all heads: heads in the first toss and heads in the second toss.`;
}

const factorialInput = document.getElementById('factorialInput');
const factorialBanner = document.getElementById('factorialBanner');
const factorialResult = document.getElementById('factorialResult')

function verifyFactorial() {
    console.log(factorialInput.value)
    const isValid = factorialInput.value == 24
    const bannerType = isValid ? "alert-success" : "alert-danger"
    const bannerText = isValid ? "Correct!" : "Not quite!"

    factorialBanner.classList.remove(...factorialBanner.classList);
    factorialBanner.classList.add("alert", bannerType);
    factorialResult.innerText = bannerText;
}

const nInput = document.getElementById('inputN');
const kInput = document.getElementById('inputK');
const noOfWaysInput = document.getElementById('inputNoOfWays');
const nAndKBanner = document.getElementById('nAndkBanner');
const nAndKResult = document.getElementById('nkresult');

function verifyNandK() {
    const n = nInput.value
    const k = kInput.value
    const ans = noOfWaysInput.value

    const isValid = n == 6 && k == 4 && ans == 15
    const bannerType = isValid ? "alert-success" : "alert-danger"
    const bannerText = isValid ? "Correct!" : "Not quite!"

    nAndKBanner.classList.remove(...nAndKBanner.classList);
    nAndKBanner.classList.add("alert", bannerType);
    nAndKResult.innerText = bannerText;
}

const monomialExpressInput = document.getElementById('monomialInput');
const trinomialExpressInput = document.getElementById('trinomialInput');
const binomialExpressInput = document.getElementById('binomialInput');
const binomialExpressionBanner = document.getElementById('binomialExpressionBanner');
const binomialExpressionResult = document.getElementById('binomialExpressionResult');

function verifyBinomial() {
    const isValid = binomialExpressInput.checked === true;
    const bannerType = isValid ? "alert-success" : "alert-danger"
    const bannerText = isValid ? "Correct!" : "Not quite!"

    binomialExpressionBanner.classList.remove(...binomialExpressionBanner.classList);
    binomialExpressionBanner.classList.add("alert", bannerType);
    binomialExpressionResult.innerText = bannerText; 
}

const usesInputs = [
    {
        name: "usesQ1",
        correct: "usesQ1Input1"
    },
    {
        name: "usesQ2",
        correct: "usesQ2Input2"
    },
    {
        name: "usesQ3",
        correct: "usesQ3Input2"
    },
    {
        name: "usesQ4",
        correct: "usesQ4Input1"
    }
];

function verifyUses() {
    for (let index = 0; index < usesInputs.length; index++) {
        const element = usesInputs[index];
        const input = document.getElementById(`${element.correct}`);
        const banner = document.getElementById(`${element.name}Banner`);
        const result = document.getElementById(`${element.name}Result`);

        const isValid = input.checked === true;
        const bannerType = isValid ? "alert-success" : "alert-danger"
        const bannerText = isValid ? "Correct!" : "Not quite!"
    
        banner.classList.remove(...banner.classList);
        banner.classList.add("alert", bannerType);
        result.innerText = bannerText; 
    }
}