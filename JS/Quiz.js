// Selecting DOM elements
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const submitBtn = document.getElementById('submit');
const resultEl = document.getElementById('result');
// const restartBtn = document.getElementById('restart');
const timeElapsedEl = document.getElementById('time-elapsed');
const questionsAnsweredEl = document.getElementById('questions-answered');

// Initializing variables
let currentQuestionIndex = 0;
let score = 0;
let timeElapsed = 0;
let timerId;
let questionCount = 10;
let questionList = [];

// Function to display the current question
function displayQuestion() {
  questionsAnsweredEl.textContent = `${currentQuestionIndex+1}/${questionList.length}`;
questionEl.innerHTML = processString(questionList[currentQuestionIndex].question);
}

// Function to check the answer and display the result
function checkAnswer(event) {
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
    
// Function to restart the game
function restartGame() {
    console.log("restarting")
    currentQuestionIndex = 0;
    score = 0;
    timeElapsed = 0;
    resultEl.textContent = '';
    resultEl.classList.remove(...resultEl.classList);
    resultEl.classList.add("d-none");
    submitBtn.innerText = "Submit"
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
    questionList = [];
    for (let index = 0; index < questionCount; index++) {
        const term = generateTerm();
        questionList.push(
            {
                term: term,
                question: `Expand the following, giving your answer in decreasing powers of x: ${decorateTerm(term)}`,
                answer: fixBinomialSpacing(expand(term))
               }
        )
    }
    console.log(questionList);
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
    const isNumber = Math.random() < 0.5;
    const number = isNumber ? Math.floor(Math.random() * 10) + 1 : letters[Math.floor(Math.random() * letters.length)];
    const exponent = Math.floor(Math.random() * 7) + 2;
    
    return `(x ${plusOrMinus} ${number}) ^ ${exponent}`;
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