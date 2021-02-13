const signaturesFile = './assets/data/signatures.json';
var signatures;

let image = document.querySelector('#signature-picture');
let text = document.querySelector('#signature-text');
let buttons = document.querySelectorAll('.sig-button');

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    let direction = parseInt(button.value);
    changePicture(direction);
  });
});

currentPicture = 0;

async function fetchData(fileName) {
  return fetch(fileName).then((response) => {
    return response.json();
  });
}

async function initiateSignature() {
  signatures = await fetchData(signaturesFile);
  setPicture(currentPicture);
}

function setPicture(sigNum) {
  image.src = signatures[sigNum].img;
  image.alt = signatures[sigNum].alt;
  text.textContent = signatures[sigNum].name;
}

function changePicture(direction) {
  if (
    currentPicture + direction >= 0 &&
    currentPicture + direction < signatures.length
  ) {
    currentPicture += direction;
  } else if (currentPicture + direction < 0) {
    currentPicture = signatures.length - 1;
  } else {
    currentPicture = 0;
  }

  setPicture(currentPicture);
}

initiateSignature();
