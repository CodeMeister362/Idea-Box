class Idea {
    constructor(title, body) {
        this.id = `${Date.now()}`;
        this.title = title;
        this.body = body;
        this.star = false;
    };

    saveToStorage(){
        savedIdeas.unshift(this);
    };

    deleteFromStorage(index){
        savedIdeas.splice(index,1);
    };

    updateIdea() {
        this.star = !this.star;
    };

    starIcon() {
        if(this.star) {
            return "assests/star-active.svg"
        } else {
           return "assests/star.svg"
        }
    }
};