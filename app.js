let box = document.querySelectorAll(".box");
let boxshow = document.querySelectorAll(".boxshow");
let img = document.querySelectorAll("img");
let numbers = [];
let count = 0;
let timer = 0;
let isChecking = false;
let checkArr = [];
let checkParent = [];
let score = 0;

// Returns a Random Array
function random(num, range) {
  const shuffledArray = num.sort(() => Math.random() - 0.5).slice(0, range);
  return shuffledArray;
}

// Setting (num) Array for for Images and (pos) Array for Positions
function start() {
  for (i of box) {
    numbers.push(count);
    if (count == 15) {
      let num = random(numbers, 8);
      let pos = random(numbers, 16);
      set(num, pos);
    }
    count++;
  }
}

// Setting Randomly Generated Images on Random Positions
function set(Img, Box) {
  Img.forEach((image, i) => {
    for (let j = 0; j < 2; j++) {
      img[Box[timer++]].src = `images/${image}.webp`;
    }
  });
  hide();
}

// Rotating (hiding) Boxes after giving some time user to memorize the positions
function hide() {
  setTimeout(() => {
    for (i of box) {
      i.style.transform = "rotateY(180deg)";
    }
    play();
  }, 2500);
}


// Adding Event Listener Click to all Boxes
function play() {
  for (i of box) {
    i.addEventListener("click", handleClick);
  }
}

// Checking Conditions after clicked
function handleClick(e) {
  // Return if system is checking between 2 boxes
  if (isChecking || checkArr.length >= 2) return;

  // Revealing Boxes
  e.target.style.transform = "rotateY(0deg)";
  checkArr.push(e.target.children[0].children[0]);
  checkParent.push(e.target);

  // Running check() when two boxes are clicked
  if (checkArr.length === 2) {
    check(checkArr, checkParent);
  }
}

function check(a, b) {
  // Lock further clicks during the check
  isChecking = true;
  // Delaying checking function to make sure , boxes are revealed
  setTimeout(() => {
    // if both images URL are same
    if (a[0].getAttribute("src") == a[1].getAttribute("src")) {
      score++;
      console.log(score);
      b[0].removeEventListener("click", handleClick);
      b[1].removeEventListener("click", handleClick);
    }
    // if they doesn't match
    else {
      b[0].style.transform = "rotateY(180deg)";
      b[1].style.transform = "rotateY(180deg)";
    }
    // Reseting the Array for the next click
    a.length = 0;
    b.length = 0;
    // Allowing to click again
    isChecking = false;
  }, 500);
}
window.onload = start();