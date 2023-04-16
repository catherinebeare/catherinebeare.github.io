// Selecting DOM elements
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const submitBtn = document.getElementById('submit');
const restartBtn = document.getElementById('restart');
const resultEl = document.getElementById('result');
const timeElapsedEl = document.getElementById('time-elapsed');
const questionsAnsweredEl = document.getElementById('questions-answered');
const quizContainerEl = document.getElementById('quizContainer');
const quizStartContainerEl = document.getElementById('quizStartContainer');
const resultsContainerEl = document.getElementById('results');
const warningEl = document.getElementById('warning');
let staticQuestions = [
{
  question: `Use the binomial theorem to expand \\begin (1+2x)^{10} \\end in increasing powers of x, up to and including the term in \\begin x^3 \\end.`,
  answer: `1 + 20x + 180x^2 + 960x^3 `
},
{
  question: `Find the coefficient of \\begin x^5 \\end in the binomial expansion of \\begin (3-x)^7 \\end.`,
  answer: `-189`
},
{
  question: `Expand \\begin (1+3x)^4 \\end, giving your answer in decreasing powers of x.`,
  answer: `81x^4 + 103x^3 + 54X^2 + 12x + 1`
},
{
  question: `Find the first four terms in the expansion, in increasing powers of x \\begin (1-\\frac{x}{2})^8\\end.`,
  answer: `1 - 4x + 7x^2 - 7x^3`
},
{
  question: `Find the coefficient of \\begin x^4 \\end in the binomial expansion of \\begin (1-2x)^9 \\end.`,
  answer: `2016`
},
{
  question: `Find the coefficient of \\begin x^4 \\end in the binomial expansion of \\begin (2+\\frac{x}{5})^6 \\end.`,
  answer: `12/125`
},
{
  question: `Find the first four terms in the expansion, in increasing powers of x \\begin (2+\\frac{x}{2})^5\\end.`,
  answer: `32 + 40x + 20x^2 + 5x^3`
},
{
  question: `Find the first four terms in the expansion, in increasing powers of x \\begin (1-\\frac{x}{2})^8\\end.`,
  answer: `1 - 4x + 7x^2 - 7x^3`
},
{
  question: `In the Binomial expansion of \\begin (1+ \\frac{x}{3})^n \\end, the coefficient of \\begin x^2 \\end is 4. Find the value of \\begin n \\end, where \\begin n \\end is a positive integer.`,
  answer: `9`
},
{
  question: `Find the first three terms in the expansion, in increasing powers of x \\begin (1+\\frac{x}{3})^9\\end.`,
  answer: `1 + 3x + 4x^2`
},
{
  question: `Find the first three terms in the expansion, in increasing powers of x \\begin (3+\\frac{x}{3})^5\\end.`,
  answer: `243 + 135x + 30x^2`
},
{
  question: `Find the first four terms in the expansion, in increasing powers of x \\begin (3+\\frac{x}{3})^8\\end.`,
  answer: `6561 + 5832x + 2268x^2 + 504x^3`
},
{
  question: `Find the first four terms in the expansion, in increasing powers of x \\begin (4-\\frac{x}{2})^4\\end.`,
  answer: `256 - 128x + 24x^2 - 2x^3`
},
{
  question: `Find the coefficient of \\begin x^4 \\end in the binomial expansion of \\begin (3+\\frac{x}{3})^8\\end.`,
  answer: `70`
},
{
  question: `Find the first four terms in the expansion, in increasing powers of x \\begin (4-\\frac{x}{2})^4\\end.`,
  answer: `3125 - 625x + 50x^2 - 2x^3`
},
{
  question: `Find the coefficient of \\begin x^4 \\end in the binomial expansion of \\begin (3-2x)^5\\end.`,
  answer: `240`
},
{
  question: `Find the coefficient of \\begin x^7 \\end in the binomial expansion of \\begin (5+2x)^8\\end.`,
  answer: `1024`
},
{
  question: `Find the coefficient of \\begin x^3 \\end in the binomial expansion of \\begin (6+x)^5\\end.`,
  answer: `360`
},
{
  question: `Use the Binomial theorem to expand \\begin (2+3x)^4\\end in decreasing powers of x.`,
  answer: `81x^4 + 216x^3 + 216x^2 + 96x + 16`
},
{
  question: `Find the coefficient of \\begin x^3 \\end in the binomial expansion of \\begin (1-3x)^6\\end.`,
  answer: `-540`
}
];

// Initializing variables
let currentQuestionIndex = 0;
let score = 0;
let timeElapsed = 0;
let timerId;
let questionCount = 5;
let questionList = [];
let runningResult = [];
let finalTime = 0;

// Function to display the current question
function displayQuestion() {
  questionsAnsweredEl.textContent = `${currentQuestionIndex+1}/${questionList.length}`;
questionEl.innerHTML = processString(questionList[currentQuestionIndex].question);
}

// Function to check the answer and display the result
function checkAnswer(event) {
  event.preventDefault();
    if (currentQuestionIndex > questionList.length) {
        restartGame();
        return
    }
	event.preventDefault();
	const userAnswer = answerEl.value.replaceAll(' ','').toLowerCase();
	const correctAnswer = questionList[currentQuestionIndex].answer.replaceAll(' ','').toLowerCase();
    if (userAnswer === correctAnswer) {
        score += 1;
    }
	
  runningResult.push(
    {
      question: questionList[currentQuestionIndex],
      userAnswer: userAnswer,
      isCorrect: userAnswer === correctAnswer
    }
  );
  
  console.log(runningResult);
  answerEl.value = '';
	currentQuestionIndex++;

	if (currentQuestionIndex === questionList.length) {
    clearInterval(timerId);
    timeElapsedEl.textContent = formatTime(timeElapsed);
    questionsAnsweredEl.textContent = `${currentQuestionIndex}/${questionList.length}`;

    const bannerType = score > 7 ? "alert-success" : "alert-danger"

    resultEl.classList.remove(...resultEl.classList);
    resultEl.classList.add("alert", bannerType);
    resultEl.textContent = `You scored ${score} out of ${questionList.length}`;
    submitBtn.innerText = "Restart"
    // quizContainerEl.classList.remove(...quizContainerEl.classList);
    quizContainerEl.classList.add('d-none');
    resultsContainerEl.classList.remove(...resultsContainerEl.classList);
    finalTime = timeElapsed;
    buildQuizResults();
    currentQuestionIndex++;
    } else {
        
    displayQuestion();
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedTime = `${minutes > 0 ? minutes.toString() + "m " : ""}${remainingSeconds}s`;
    return `Time elapsed: ${formattedTime}`;
  }
    


function buildQuizResults() {
  let quizResultsHTML = "";
  for (let i = 0; i < runningResult.length; i++) {
    let current = `Q${(i+1)}. `
    let result = runningResult[i];
    let question = result.question.question;
    let questionHTML = `<h4>${current}${processString(question)}</h4>`;
    let userAnswerHTML = `<p>Your answer: ${result.userAnswer}</p>`;
    let correctAnswerHTML = `<p>Correct answer: ${result.question.answer}</p>`;
    let alertClass = result.isCorrect ? "alert-success" : "alert-danger";
    let isCorrectHTML = `<div class="alert ${alertClass} mt-3" role="alert">${userAnswerHTML}${correctAnswerHTML}</div>`;
    let resultHTML = `<div class="text-bg-light p-5 rounded questionBoxes my-3">${questionHTML}${isCorrectHTML}</div>`;
    quizResultsHTML += resultHTML;
  }
  let heading = `<h4> ${score}/${questionCount} ${formatTime(finalTime)} </h4>`;
  quizResultsHTML += heading;
  document.getElementById("quiz-results").innerHTML = quizResultsHTML;
}

function printResults() {
	let originalContents = document.body.innerHTML;
  removeQuestionBoxesFromClassList(document.getElementById("quiz-results"));
  let printContents = document.getElementById("quiz-results").innerHTML;
  

	document.body.innerHTML = printContents;
	window.print();
	document.body.innerHTML = originalContents;
}

function removeQuestionBoxesFromClassList(doc) {
  const questionBoxesElements = doc.querySelectorAll('div.questionBoxes');
  console.log(questionBoxesElements);
  for (let i = 0; i < questionBoxesElements.length; i++) {
    const element = questionBoxesElements[i];
    element.classList.remove('questionBoxes', 'p-5');
    // element.classList.remove('questionBoxes', 'my-3', 'p-5');
    element.classList.add('p-4', 'my-3') 
  }
}

function configureQuiz(count){
  questionCount = count;
  quizStartContainerEl.classList.add("d-none");
  restartGame();
}

// Function to restart the game
function restartGame() {
    console.log("restarting")
    currentQuestionIndex = 0;
    score = 0;
    timeElapsed = 0;
    finalTime = 0;
    resultEl.textContent = '';
    resultEl.classList.remove(...resultEl.classList);
    resultEl.classList.add("d-none");
    resultsContainerEl.classList.remove(...resultsContainerEl.classList);
    resultsContainerEl.classList.add("d-none");
    quizContainerEl.classList.remove("d-none");
    warningEl.classList.remove("d-none");
    // quizContainerEl.classList.add("d-none");
    document.getElementById("quiz-results").innerHTML = "";
    submitBtn.innerText = "Submit"
    questionList = [];
    runningResult = [];
    generateQuiz();
    displayQuestion();
    startTimer();
}
    
// Function to start the timer
function startTimer() {
    timerId = setInterval(() => {
    timeElapsed++;
    timeElapsedEl.textContent = formatTime(timeElapsed);
    }, 1000);
}
    
// Adding event listeners
submitBtn.addEventListener('click', checkAnswer);
restartBtn.addEventListener('click', restartGame);
document.getElementById('quizForm').addEventListener('submit', checkAnswer);
function processString(inputString) {
    const startFlag = "\\begin";
    const endFlag = "\\end";
    const chunks = inputString.split(startFlag);
    let outputString = chunks[0];
    
    for (let i = 1; i < chunks.length; i++) {
      const chunk = chunks[i];
      const endPosition = chunk.indexOf(endFlag);
      
      if (endPosition !== -1) {
        const renderOutput = katex.renderToString(chunk.slice(0, endPosition), {
            throwOnError: false
        });
        
        // render(chunk.slice(0, endPosition));
        outputString += renderOutput + chunk.slice(endPosition + endFlag.length);
      } else {
        outputString += startFlag + chunk;
      }
    }
    
    // Remove start and end flags from output string
    outputString = outputString.replace(new RegExp(`${startFlag}|${endFlag}`, 'g'), '');
    
    return outputString;
  }

  function generateUniqueRandomNumbers(n, min, max) {
    const uniqueNumbers = new Set();
    
    while (uniqueNumbers.size < n) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(randomNumber);
    }
    
    return Array.from(uniqueNumbers);
  }

  function generateQuiz() {    
    let staticCount = Math.round(questionCount * 0.4);
    let count = questionCount-staticCount
    questionList = [];
    for (let index = 0; index < count; index++) {
        const term = generateTerm();
        questionList.push(
            {
                term: term,
                question: `Expand the following, giving your answer in increasing powers of x: ${decorateTerm(term)}`,
                answer: fixBinomialSpacing(expand(term))
               }
        )
    }

    shuffleArray(staticQuestions);
    for (let index = 0; index < staticCount; index++) {
      questionList.push(staticQuestions[index])
    }

    // questionList.concat(staticQuestions);
    shuffleArray(questionList);
  }

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function fixBinomialSpacing(str) {
    // Remove any existing whitespace from the string
    str = str.replace(/\s+/g, '');
  
    // Find the index of the first term after the x^2 term
    const x2Index = str.indexOf('x^2');
    const nextTermIndex = str.slice(x2Index + 3).search(/[\+\-]/) + x2Index + 3;
  
    // Insert a space before each + or -
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (i === x2Index || i === nextTermIndex) {
        result += ' ';
      }
      if (str[i] === '+' || str[i] === '-') {
        result += ' ' + str[i] + ' ';
      } else {
        result += str[i];
      }
    }
  
    return result;
  }

  function decorateTerm(term) {
    return `\\begin\{${term}\}\\end`;
  }

  function generateTerm() {
    const letters = 'abcdefghijkmnpqrstuvwyz';
    const plusOrMinus = Math.random() < 0.5 ? '-' : '+';
    const isNumber = Math.random() < 0.9;
    const number = isNumber ? Math.floor(Math.random() * 10) + 1 : letters[Math.floor(Math.random() * letters.length)];
    const exponent = Math.floor(Math.random() * 4) + 2  ;
    
    return `(${number} ${plusOrMinus} x) ^ ${exponent}`;
  }

//   CALCULATING THE ANSWER

function expand(expr) {
    console.log(`Ex:       ${expr}`)
    
    let extent = parseInt(expr.substring(expr.indexOf('^')+1), 10)
    
    if (extent === 0) return '1'
    if (extent === 1) return expr.substring(1, expr.indexOf(')'))
    
    let a = expr.substring(1, expr.replace('+', '-').indexOf('-', 2))
    let b = expr.substring(expr.replace('+', '-').indexOf('-', 2)+1, expr.indexOf(')'))
    
    let exSymbol = (expr.indexOf('+') !== -1) ? '+' : '-'
    let symbolForB = exSymbol
    
    let binCoefficients = generate(extent + 1)
    binCoefficients = binCoefficients[binCoefficients.length-1]
    
    let binExpr = ''
    binExpr = (extent % 2 === 0) ? binPow(a, extent).replace('-', '') : binPow(a, extent)
    
    if (b == 0 && extent === 2) {
      return binExpr
    }
    // a = 1 || b = 1
    if (!isNaN(a) && !isNaN(b)) {
      a = parseInt(a, 10)
      b = parseInt(b, 10)
      
      for (let i = 1; i <= extent-1; i++) {
        if (i != 1 && extent > 2 && symbolForB === '-') {
          exSymbol = exSymbol === '+' ? '-' : '+' 
        }
        
        binExpr = binExpr + exSymbol + (binCoefficients[i] * Math.pow(a, extent - i) * Math.pow(b, i)) 
      }
    // a = 1 || b = x
    } else if (!isNaN(a) && isNaN(b)) {
      a = parseInt(a, 10)
      
      for (let i = 1; i <= extent-1; i++) {
        if (i != 1 && extent > 2 && symbolForB === '-') {
          exSymbol = exSymbol === '+' ? '-' : '+' 
        }
        
        binExpr = binExpr + exSymbol + (binCoefficients[i] * Math.pow(a, extent - i)) + binPow(b, i)
      }
    // a = x || b = 1
    } else if (isNaN(a) && !isNaN(b)) {
      b = parseInt(b, 10)
      
      for (let i = 1; i <= extent-1; i++) {
        if (i != 1 && extent > 2 && symbolForB === '-') {
          exSymbol = exSymbol === '+' ? '-' : '+' 
        }
        
        if (!isNaN(parseInt(a, 10))) {
          if (exSymbol === '+' && `${(binCoefficients[i] * Math.pow(parseInt(a, 10), extent - i) * Math.pow(b,i))}`.indexOf('-') != -1) {
            binExpr = (extent - i) === 1 ? binExpr + (binCoefficients[i] * Math.pow(parseInt(a, 10), extent - i) * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}` : binExpr + (binCoefficients[i] * Math.pow(parseInt(a, 10), extent - i) * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}^${extent - i}` 
          } else {
            binExpr = (extent - i) === 1 ? binExpr + exSymbol + (binCoefficients[i] * Math.pow(parseInt(a, 10), extent - i) * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}` : binExpr + exSymbol + (binCoefficients[i] * Math.pow(parseInt(a, 10), extent - i) * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}^${extent - i}` 
          }
        } else {
          
          if ((extent - i) === 1) {
            if (exSymbol === '+' && a.indexOf('-') != -1) {
              binExpr = binExpr + '-' + (binCoefficients[i] * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}`
            } else {
              binExpr = binExpr + exSymbol + (binCoefficients[i] * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}` 
            }
          } else {
            if (exSymbol === '+' && a.indexOf('-') != -1) {
              if (symbolForB === '+' && (extent - i) % 2 === 0) {
                binExpr = binExpr + exSymbol + (binCoefficients[i] * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}^${extent - i}` 
              } else {
                binExpr = binExpr + '-' + (binCoefficients[i] * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}^${extent - i}`
                console.log((binCoefficients[i] * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}`)
              }
            } else {
              binExpr = binExpr + exSymbol + (binCoefficients[i] * Math.pow(b,i)) + `${a.replace(/[^a-z ]/gi, '')}^${extent - i}` 
            }
          }
        }
      }
    // a = x || b = x
    } else {
      for (let i = 1; i <= extent-1; i++) {
        if (i != 1 && extent > 2 && symbolForB === '-') {
          exSymbol = exSymbol === '+' ? '-' : '+' 
        }
        
        binExpr = binExpr + exSymbol + binCoefficients[i] + binPow(a, extent - i) + binPow(b, i)
      }
    }
    
    symbolForB = (exSymbol === '+' && extent > 2 && symbolForB === '-') ? '-' : '+'
    binExpr = extent === 2 ? binExpr + '+' + binPow(b, extent) : binExpr + symbolForB + binPow(b, extent)
    
    console.log(`Number a: ${a}`)
    console.log(`Number b: ${b}`)
    console.log(`Extent:   ${extent}`)
    console.log(binCoefficients)
    
    return binExpr.replace(/(--)/gi, '+')
    }
  
  
  const generate = (ex) => {
  let result = []
  for (let i = 1; i <= ex; i++) {
      if (i == 1) result.push([1])
      else if (i == 2) result.push([1, 1])
      else {
          let preArr = result[result.length - 1]
          let arr = new Array(i)
          arr[0] = 1
          for (let j = 0; j < i - 2; j++) {
              arr[j + 1] = preArr[j] + preArr[j + 1]
          }
          arr[i - 1] = 1
          result.push(arr)
      }
  }
  return result
  };
  
  const binPow = (number, ex) => {
  
  if (!isNaN(number)) {
  return `${Math.pow(parseInt(number, 10), ex)}`
  } else if (!isNaN(parseInt(number, 10))) {
  return (ex == 1) ? `${Math.pow(parseInt(number, 10), ex)}` : `${Math.pow(parseInt(number, 10), ex)}${number.replace(/[^a-z]/gi, '')}^${ex}`
  } else {
  return (ex == 1) ? `${number}` : `${number}^${ex}` 
  }
  
  }