// const = require('./Idea');

var savedBtn = document.querySelector('.js-save');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var ideaContainer = document.querySelector('.js-idea-container')

savedBtn.addEventListener('click', function () {
    createIdea()
    clearInput()
    repopulateIdeaContainer()
})

var savedIdeas = [];

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
            `<div>
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
