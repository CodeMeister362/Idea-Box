var savedBtn = document.querySelector('.js-save');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var ideaContainer = document.querySelector('.js-idea-container')
var formContainer = document.querySelector('.js-form')

var savedIdeas = [];

formContainer.addEventListener('input', activateSaveBtn)

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
    savedIdeas.unshift(newIdea);
}

function clearInput() {
    titleInput.value = '';
    bodyInput.value = '';
}

function repopulateIdeaContainer() {
    event.preventDefault()
    ideaContainer.innerHTML = '';

    for (var i = 0; i < savedIdeas.length; i++) {
 ////////// Update img star class //////////////////
        ideaContainer.innerHTML +=
            `<div id="${savedIdeas[i].id}">
               <header>
                <img class="star">
                 <img class="delete">
                </header>
                <h1>${savedIdeas[i].title}</h1>
                <p>${savedIdeas[i].body}</p>
                <div class="comment">Comment</div>
             </div>`
    }
}

// iteration 2.3
// start with save button unclickable 
// once both input fields have been filled 
// make button clickable by changing the class 
// addeventlistener checks if value is !== 0 
//handler will change button class 


function activateSaveBtn(){
    if (bodyInput.value !== "" && titleInput.value !== "" ) {
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


