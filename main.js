var savedBtn = document.querySelector('.js-save');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var ideaContainer = document.querySelector('.js-idea-container')
var formContainer = document.querySelector('.js-form')

var savedIdeas = [];

formContainer.addEventListener('input', activateSaveBtn)
ideaContainer.addEventListener('click', starORDelete)

savedBtn.addEventListener('click', function () {
    createIdea()
    clearInput()
    repopulateIdeaContainer()
    savedBtn.disabled = true
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
        console.log ('STAR if')
    } else if (event.target.id === 'delete') {
        savedIdeas[findIndex()].deleteFromStorage(findIndex())
        repopulateIdeaContainer()
    }
}

function repopulateIdeaContainer() {
    event.preventDefault()
    ideaContainer.innerHTML = '';
    for (var i = 0; i < savedIdeas.length; i++) {
        ////////// Update img star class //////////////////
        ideaContainer.innerHTML += `
            <div class="card" id="${savedIdeas[i].id}">
             <header class="card-header">
               <img class="star js-star" id="star" src="assests/star.svg">
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

//iteration 3.1
// delete button will splice ideaInst out of array
//capture eventtarget idea cards ID
// iterate through array to find it using ID
// splice it out
// rerender ideas
/// query selector on idea container
// if event.garet.className === "delete" then reun the delete funciton
// if savedIdeas[i].id === event.target.id { spliice(i,1)}
// run re render 
// if event.tagret.classname -=== "star"  then run the updateIDea()

function findIndex() {
    for (var i = 0; i < savedIdeas.length; i++) {
        if (savedIdeas[i].id === event.target.parentElement.parentElement.id){ 
            return i
        }
    }
}
