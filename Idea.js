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
        if(this.star){
            this.star = false;
        } else {
            this.star = true;
        }
        
    };

    starIcon() {
        if(this.star) {
            return "assests/star-active.svg"
        } else {
           return "assests/star.svg"
        }
    }
};