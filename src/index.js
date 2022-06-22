let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

displayAllToys();
addAnewToy();
});

//Get all toys and display them on page load
function displayAllToys(){
  fetch('http://localhost:3000/toys')
  .then(response=>response.json())
  .then(data=>{
   data.forEach(toy => displayOneToy(toy));
  })
  .catch(error=>console.log(error))
}

//add an individual toy to the display
function displayOneToy(toy){
  const toyCollectionDiv = document.querySelector('#toy-collection');
  const newToyCardDiv = document.createElement('div');
  newToyCardDiv.classList.add('card');
  newToyCardDiv.innerHTML = `<h2>${toy.name}</h2> <img class='toy-avatar' src=${toy.image}> <p>${toy.likes}</p> <button id=${toy.id} class='like-btn'>Like ❤️</button>`;
  toyCollectionDiv.appendChild(newToyCardDiv);
  increaseAToyLikes();
}

//add a new toy to the collection
function addAnewToy(){
document.getElementsByClassName('add-toy-form')[0].addEventListener('submit',function(event){
event.preventDefault()
const newToyDetails = document.getElementsByClassName('input-text');


fetch('http://localhost:3000/toys',{
  method:"POST",
  headers:{
    'Content-Type':'application/json',
    Accept:'application/json'
  },
body:JSON.stringify({
  name:newToyDetails[0].value,
  image:newToyDetails[1].value,
  likes:0
})
})
.then(response=>response.json())
.then(createdToy=>displayOneToy(createdToy))
.catch(error=>console.log(error))
});
}

//Increase the likes count and update in the DOM
function increaseAToyLikes(){
  const likeButtons = document.querySelectorAll('.like-btn') 
  likeButtons.forEach(likeButton=>{
  likeButton.addEventListener('click',function(){
  let currentLikes = likeButton.parentNode.querySelector('p').textContent;
  currentLikes++;
  likeButton.parentNode.querySelector('p').textContent = currentLikes;
  })
  })
}
