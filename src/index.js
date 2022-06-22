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
  const toyName = document.createElement('h2')
  toyName.textContent = toy.name;
  const toyImage = document.createElement('img');
  toyImage.src = toy.image;
  toyImage.classList.add('toy-avatar');
  const numberOfLikes = document.createElement('p');
  numberOfLikes.textContent = toy.likes;
  const likeButton= document.createElement('button');
  likeButton.textContent = "Like ❤️";
  likeButton.classList.add('like-btn');
  likeButton.setAttribute('id',toy.id);
  likeButton.addEventListener('click',increaseAToyLikes);
  newToyCardDiv.append(toyName,toyImage,numberOfLikes,likeButton);
  toyCollectionDiv.appendChild(newToyCardDiv);
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
function increaseAToyLikes(event){
 const parentDiv =  event.target.parentNode;
 let currentLikes = parentDiv.querySelector('p').textContent;
 currentLikes++;

 fetch(`http://localhost:3000/toys/${event.target.id}`,{
   method:'PATCH',
   headers:{
     'content-type':'application/json',
     Accept:'application/json'
   },
   body:JSON.stringify({
     likes:currentLikes
   })
 })
 .then(response=>response.json())
 .then(updatedToy=>parentDiv.querySelector('p').textContent = updatedToy.likes)
 .catch(error=>console.log(error));
 parentDiv.querySelector('p').textContent=currentLikes;
}
