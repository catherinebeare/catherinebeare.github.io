const waysToGetAllHeadsInput = document.getElementById('inputCombination');
const numWaysToAllHeadsBanner = document.getElementById('numWaysToAllHeadsBanner');

function verifyWaysToGetAllHeads() {
    console.log(waysToGetAllHeadsInput.value)
    const isValid = waysToGetAllHeadsInput.value == 1
    const bannerType = isValid ? "alert-success" : "alert-danger"
    const bannerText = isValid ? "Correct" : "Not quite"

    numWaysToAllHeadsBanner.classList.remove(...numWaysToAllHeadsBanner.classList);
    numWaysToAllHeadsBanner.classList.add("alert", bannerType);
    numWaysToAllHeadsBanner.innerHTML = `${bannerText}, answer`;
}

const nInput = document.getElementById('inputN');
const kInput = document.getElementById('inputK');
const nAndKBanner = document.getElementById('nAndkBanner');
const nAndKResult = document.getElementById('nkresult');

function verifyNandK() {
    const n = nInput.value
    const k = kInput.value

    const isValid = n == 6 && k == 4
    const bannerType = isValid ? "alert-success" : "alert-danger"
    const bannerText = isValid ? "Correct" : "Not quite!"

    nAndKBanner.classList.remove(...nAndKBanner.classList);
    nAndKBanner.classList.add("alert", bannerType);
    nAndKResult.innerText = bannerText;
}

function verifyBinomial() {
    // Mark please help
}