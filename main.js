var savedBtn = document.querySelector('.js-save');
var titleInput = document.querySelector('.js-title-input');
var bodyInput = document.querySelector('.js-body-input');
var ideaContainer = document.querySelector('.js-idea-container');
var formContainer = document.querySelector('.js-form');
var showStarredBtn = document.querySelector('.js-show-btn');
var showAllBtn = document.querySelector('.js-show-all-btn');
var searchBar = document.querySelector('#search');

var savedIdeas = [];
// var pageState = "show-all";
// ^ to track state of page (Star filtered view vs All view)

formContainer.addEventListener('input', activateSaveBtn);
ideaContainer.addEventListener('click', starORDelete);
searchBar.addEventListener('input', filterText);
showStarredBtn.addEventListener('click', filterStarred);
showAllBtn.addEventListener('click', function(){
    toggleStarORAllBtn();
    // console.log(showAllBtn,"after");
    // console.log(showStarredBtn, "after");
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
    ideaContainer.innerHTML = '';

    // BUG: When you're viewing Saved Ideas and use the search bar, it searches
    // thru the entire savedIdeas array instead of just the starred ideas.
    // IDEA: Depending on current pageState, do either 1) loop thru the entire
    // savedIdeas array like currently written
    // OR 2) filter savedIdeas to this.star = true, save as a new "favorites" array, and loop thru "favorites" only
    for (i = 0; i < savedIdeas.length; i++) {
        var lowerSavedTitle = savedIdeas[i].title.toLowerCase();
        var lowerSavedBody = savedIdeas[i].body.toLowerCase();

        if (lowerSavedTitle.includes(currentSearch) || lowerSavedBody.includes(currentSearch)) {
            var starImage = '';
            if (savedIdeas[i].star){
                starImage = "assests/star-active.svg";
            } else {
                starImage = "assests/star.svg";
            };

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
        };
    };
};

function show(element) {
    element.classList.remove('hidden');
};

function hide(element) {
    element.classList.add('hidden');
};

function toggleStarORAllBtn(){
    if (showStarredBtn.classList.contains('hidden')) {
        show(showStarredBtn);
        hide(showAllBtn);
        // change pageState to "show-all" -> needed for search feature
    } else if (!showStarredBtn.classList.contains('hidden')){
        show(showAllBtn);
        hide(showStarredBtn);
        // change pageState to "show-starred" -> needed for search feature
    };
};

function filterStarred(){
    toggleStarORAllBtn()
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
        };
    };
};

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
    ideaContainer.innerHTML = '';
    var starImage = '';
    for (var i = 0; i < savedIdeas.length; i++) {
        if (savedIdeas[i].star){
            starImage = "assests/star-active.svg"
        } else {
            starImage = "assests/star.svg"
        };
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
    };
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

// Would this function work for innerHTML refactoring?
    // Call repopulateIdeas using the correct Ideas array (all vs favorites)
    // and correct starImage (all view= keep current if statement to adjust,
    // starred view= assign it to correct source link)

// function repopulateIdeas(savedIdeas, starImage) {
//     ideaContainer.innerHTML += `
//             <div class="card" id="${savedIdeas[i].id}">
//              <header class="card-header">
//                <img class="star js-star" id="star" src="${starImage}">
//                <img class="delete js-delete" id="delete" src="assests/delete.svg">
//              </header>
//              <p class="header card-title">${savedIdeas[i].title}</p>
//              <p class="card-text">${savedIdeas[i].body}</p>
//              <div class="comment"></div>
//            </div>`
// };