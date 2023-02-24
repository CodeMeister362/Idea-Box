var savedBtn = document.querySelector('.js-save');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var ideaContainer = document.querySelector('.js-idea-container');
var formContainer = document.querySelector('.js-form');
var showStarredBtn = document.querySelector('.js-show-btn')
var showAllBtn = document.querySelector('.js-show-all-btn')

var savedIdeas = [];

formContainer.addEventListener('input', activateSaveBtn);
ideaContainer.addEventListener('click', starORDelete);
showStarredBtn.addEventListener('click', filterStarred)
showAllBtn.addEventListener('click', function(){
    toggleStarORAllBtn("Show All")
    repopulateIdeaContainer()
})

function toggleStarORAllBtn(currentState){
    if (currentState === "Show All"){
        showAllBtn.classList.add('hidden')
        showStarredBtn.classList.remove('hidden')
    } else if (currentState === "Show Starred")
        showAllBtn.classList.remove('hidden')
        showStarredBtn.classList.add('hidden')
}

function filterStarred(){
    toggleStarORAllBtn("Show Starred")
    ideaContainer.innerHTML = ''
    for (var i = 0; i < savedIdeas.length; i++) {
        if (savedIdeas[i].star){
            ideaContainer.innerHTML += `
            <div class="card" id="${savedIdeas[i].id}">
             <header class="card-header">
               <img class="star js-star" id="star" src="assests/star-active.svg">
               <img class="delete js-delete" id="delete" src="assests/delete.svg">
             </header>
             <p class="header card-title">${savedIdeas[i].title}</p>
             <p class="card-text">${savedIdeas[i].body}</p>
             <div class="comment"></div>
           </div>`
        }
    }
}

savedBtn.addEventListener('click', function () {
    createIdea();
    clearInput();
    repopulateIdeaContainer();
    savedBtn.disabled = true;
})

function createIdea() {
    var title = titleInput.value;
    var body = bodyInput.value;
    var newIdea = new Idea(title, body);
    newIdea.saveToStorage();
}

function clearInput() {
    titleInput.value = '';
    bodyInput.value = '';
}

function starORDelete(event) {
    if (event.target.id === 'star') {
        savedIdeas[findIndex()].updateIdea(findIndex());
        repopulateIdeaContainer();
    } else if (event.target.id === 'delete') {
        savedIdeas[findIndex()].deleteFromStorage(findIndex());
        repopulateIdeaContainer();
    }
}

function repopulateIdeaContainer() {
    event.preventDefault();
    ideaContainer.innerHTML = '';
    var starImage = ''
    for (var i = 0; i < savedIdeas.length; i++) {
        if (savedIdeas[i].star){
            starImage = "assests/star-active.svg"
        } else {
            starImage = "assests/star.svg"
        }
        ideaContainer.innerHTML += `
            <div class="card" id="${savedIdeas[i].id}">
             <header class="card-header">
               <img class="star js-star" id="star" src="${starImage}">
               <img class="delete js-delete" id="delete" src="assests/delete.svg">
             </header>
             <p class="header card-title">${savedIdeas[i].title}</p>
             <p class="card-text">${savedIdeas[i].body}</p>
             <div class="comment"></div>
           </div>`
    }
}

function activateSaveBtn() {
    if (bodyInput.value !== "" && titleInput.value !== "") {
        savedBtn.disabled = false;
    } else {
        savedBtn.disabled = true;
    }
}

function findIndex() {
    for (var i = 0; i < savedIdeas.length; i++) {
        if (savedIdeas[i].id === event.target.parentElement.parentElement.id){ 
            return i
        }
    }
}
