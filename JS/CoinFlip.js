const validCoinPermutations = [["heads", "heads"], ["heads", "tails"],["tails", "heads"], ["tails", "tails"]];
const coinPermutationBanner = document.getElementById('coinPermutationsBanner');

function flipCoin(coin) {
    if (!coin.classList.contains("dontCount")) {
        coinPermutationBanner.classList.remove(...coinPermutationBanner.classList);
        coinPermutationBanner.classList.add("d-none");
    }

    coin.classList.add('flipping');
    setTimeout(() => {
      coin.classList.remove('flipping');
  
      let ft = coin.classList.contains('heads') ? 'Heads' : 'Tails'
      const bt = coin.classList.contains('heads') ? 'Tails' : 'Heads'
  
      const front = coin.querySelector('.front');
      const back = coin.querySelector('.back');
  
      front.textContent = ft;
      back.textContent = bt;
    }, 700);
    
    coin.classList.toggle('heads');
    coin.classList.toggle('tails');
  }

  function verifyCoinGrid() {
    const state = getState();
    const isValid = arraysAreEqual(validCoinPermutations, state);
    const bannerType = isValid ? "alert-success" : "alert-danger"
    const bannerText = isValid ? "Correct" : "Wrong"

    coinPermutationBanner.classList.remove(...coinPermutationBanner.classList);
    coinPermutationBanner.classList.add("alert", bannerType);
    coinPermutationBanner.innerText = bannerText
  }
  
  function getState() {
    const coins = document.querySelectorAll('.coin')
    const state = Array.from(coins)
                            .filter((coin) => {
                                return !coin.classList.contains('dontCount')
                            })
                            .map((coin) => {
                            return coin.classList.contains('heads') ? 'heads' : 'tails';
                            });
    const gridifiedState = transposeState(state);
    return gridifiedState
  }
  
  function transposeState(state) {
    return [[state[0], state[1]],
            [state[2], state[3]],
            [state[4], state[5]],
            [state[6], state[7]],
        ]
  }

  function arraysAreEqual(arr1, arr2) {
    // Sort both arrays
    const sortedArr1 = arr1.map(innerArr => innerArr).sort();
    const sortedArr2 = arr2.map(innerArr => innerArr).sort();
    console.log(JSON.stringify(sortedArr1), JSON.stringify(sortedArr2));
    // Compare the sorted arrays using JSON.stringify
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
  }