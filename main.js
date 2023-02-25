var savedBtn = document.querySelector('.js-save');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var ideaContainer = document.querySelector('.js-idea-container');
var formContainer = document.querySelector('.js-form');
var showStarredBtn = document.querySelector('.js-show-btn');
var showAllBtn = document.querySelector('.js-show-all-btn');
var searchBar = document.querySelector('.search');

var savedIdeas = [];
var pageState = "show-all";

formContainer.addEventListener('input', activateSaveBtn);
ideaContainer.addEventListener('click', starORDelete);
searchBar.addEventListener('input', filterText);
showStarredBtn.addEventListener('click', filterStarred);
showAllBtn.addEventListener('click', function() {
    toggleStarORAllBtn();
    repopulateIdeaContainer();
});

savedBtn.addEventListener('click', function () {
    hide(showAllBtn);
    show(showStarredBtn);
    createIdea();
    clearInput();
    repopulateIdeaContainer();
    savedBtn.disabled = true;
});

function filterText() {
    var currentSearch = searchBar.value.toLowerCase();
    ideaContainer.innerHTML = ``;

    if (pageState === 'show-all') {
        for (var i = 0; i < savedIdeas.length; i++) {
            var lowerSavedTitle = savedIdeas[i].title.toLowerCase();
            var lowerSavedBody = savedIdeas[i].body.toLowerCase();

            if (lowerSavedTitle.includes(currentSearch) || lowerSavedBody.includes(currentSearch)) {
                ideaContainer.innerHTML += `
                <div class="card" id="${savedIdeas[i].id}">
                <header class="card-header">
                    <img class="star js-star" id="star" src="${savedIdeas[i].starIcon()}">
                    <img class="delete js-delete" id="delete" src="assests/delete.svg">
                </header>
                <div class="card-text-container">
                    <h2 class="header card-title">${savedIdeas[i].title}</h2>
                    <p class="card-text"> ${savedIdeas[i].body}</p>
                </div>
                <div class="comment"></div>
                </div>`
            }
        };
    } else if (pageState === 'show-starred') {
        var starredIdeas = [];
        for (var i = 0; i < savedIdeas.length; i++) {
            if (savedIdeas[i].star) {
              starredIdeas.push(savedIdeas[i])
            }
        }

        for (var i = 0; i < starredIdeas.length; i++) {
            var lowerSavedTitle = starredIdeas[i].title.toLowerCase();
            var lowerSavedBody = starredIdeas[i].body.toLowerCase();

            if (lowerSavedTitle.includes(currentSearch) || lowerSavedBody.includes(currentSearch)) {
                ideaContainer.innerHTML += `
                <div class="card" id="${starredIdeas[i].id}">
                <header class="card-header">
                    <img class="star js-star" id="star" src="${starredIdeas[i].starIcon()}">
                    <img class="delete js-delete" id="delete" src="assests/delete.svg">
                </header>
                <div class="card-text-container">
                    <h2 class="header card-title">${starredIdeas[i].title}</h2>
                    <p class="card-text"> ${starredIdeas[i].body}</p>
                </div>
                <div class="comment"></div>
                </div>`
            }
        };
    };
};

function show(element) {
    element.classList.remove('hidden');
};

function hide(element) {
    element.classList.add('hidden');
};

function toggleStarORAllBtn() {
    if (showStarredBtn.classList.contains('hidden')) {
        show(showStarredBtn);
        hide(showAllBtn);
        pageState = "show-all";
    } else if (!showStarredBtn.classList.contains('hidden')) {
        show(showAllBtn);
        hide(showStarredBtn);
        pageState = "show-starred"
    };
};

function filterStarred() {
    toggleStarORAllBtn()
    var starredIdeas = [];
    for (var i = 0; i < savedIdeas.length; i++) {
        if(savedIdeas[i].star){
            starredIdeas.push(savedIdeas[i])
        }
    }
    ideaContainer.innerHTML = ``;
    createCardHtml(starredIdeas)
};

function createCardHtml(array) {
    for (var i = 0; i < array.length; i++) {
        ideaContainer.innerHTML += `
        <div class="card" id="${array[i].id}">
        <header class="card-header">
          <img class="star js-star" id="star" src="${array[i].starIcon()}">
          <img class="delete js-delete" id="delete" src="assests/delete.svg">
        </header>
        <div class="card-text-container">
          <h2 class="header card-title">${array[i].title}</h2>
          <p class="card-text"> ${array[i].body}</p>
        </div>
        <div class="comment"></div>
      </div>`
    }
}

function createIdea() {
    var title = titleInput.value;
    var body = bodyInput.value;
    var newIdea = new Idea(title, body);
    newIdea.saveToStorage();
};

function clearInput() {
    titleInput.value = '';
    bodyInput.value = '';
};

function starORDelete(event) {
    if (event.target.id === 'star') {
        savedIdeas[findIndex()].updateIdea(findIndex());
        repopulateIdeaContainer();
    } else if (event.target.id === 'delete') {
        savedIdeas[findIndex()].deleteFromStorage(findIndex());
        repopulateIdeaContainer();
    };
};

function repopulateIdeaContainer() {
    event.preventDefault();
    ideaContainer.innerHTML = ``;
    createCardHtml(savedIdeas)
};

function activateSaveBtn() {
    if (bodyInput.value !== "" && titleInput.value !== "") {
        savedBtn.disabled = false;
    } else {
        savedBtn.disabled = true;
    };
};

function findIndex() {
    for (var i = 0; i < savedIdeas.length; i++) {
        if (savedIdeas[i].id === event.target.parentElement.parentElement.id){ 
            return i;
        };
    };
};
