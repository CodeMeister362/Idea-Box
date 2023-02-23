class Idea {
    constructor(title, body) {
        this.id = `${Date.now()}`;
        this.title = title;
        this.body = body;
        this.star = false;
    }

    updateIdea() {
        this.star = !this.star
    }
}