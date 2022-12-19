const API_PERS = "https://rickandmortyapi.com/api/character/";
let cardsList;
let keyCardsList;
let numRandom = [];

let second=false;
let clickedId;
let canClick=true;
let cartas_giradas = 0;
let clicks = 0;

function hideImage(){

}

function toggleImage(id){
  document.getElementById(id).classList.toggle('hidden');
  document.getElementById(id+'-img').classList.toggle('show');
  debugger
}

//function click
function addImageCard() {
  
  if(!canClick)
    return;

  toggleImage(this.id);

  if(second) {

    clicks++;
  
    if(
      document.getElementById(this.id).dataset.characterId
      !=
      document.getElementById(clickedId).dataset.characterId
    ){
      let previousId=clickedId;
      canClick=false;
      setTimeout(()=>{
        toggleImage(this.id);
        toggleImage(previousId);
        canClick=true;
      },1500)
    }
    else{
      cartas_giradas+=2;
      if(cartas_giradas==16){
        setTimeout(()=>{ window.alert("Enhorabuna lo hisciste en " + clicks + " cliks");
      },200)
      }
    } 
  }

  second =!second;
  clickedId=this.id;

}

function getRandomNumber(min, max) {
  let totalEle = max - min + 1;
  let result = Math.floor(Math.random() * totalEle) + min;
  return result;
}

function createArrayOfNumber(start, end) {
  let myArray = [];
  for (let i = start; i <= end; i++) {
    myArray.push(i);
  }
  return myArray;
}

let numbersArray = createArrayOfNumber(0, 19);

fetch(API_PERS)
.then(function respuesta(res) {
  return res.json();
})
.then(function sacarCartas(response) {
  cardsList = response.results;
  Object.keys(cardsList).forEach(key => {
    keyCardsList = key;
  });   
  let x;
  for (let i = 0; i < 8; i++) {
    x = i*2;
    let randomIndex = getRandomNumber(0, numbersArray.length - 1);
    let randomNumber = numbersArray[randomIndex];
    numRandom[x] = randomNumber;
    numRandom[x+1] = randomNumber;
    numbersArray.splice(randomIndex, 1);
  }

  let shuffledArray = numRandom.sort((a, b) => 0.5 - Math.random());

  let j = 0;
  shuffledArray.forEach(element => {
    j++;
    document.querySelector("#cartas").innerHTML +=
      `<div id="${j}" class="listen imageCards${j}" data-character-id=${cardsList[element].id}>
        <img src="../assest/img/card-blue.png" alt="carta azul">
      </div>
      <div id="${j}-img" class="imageCardsAPI">
        <img src="${cardsList[element].image}" alt="${cardsList[element].name}"/>
      </div>`;

  });

  let elements = document.getElementsByClassName("listen");

  Array.from(elements).forEach(function(element) {
    element.addEventListener('click', addImageCard);
  });

});