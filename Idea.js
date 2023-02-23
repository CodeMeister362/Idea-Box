class Idea {
    constructor(title, body) {
        this.id = Date.now();
        this.title = title;
        this.body = body;
        this.star = false;
    }

    updateIdea() {
        // change the ideas starred state
        // will take in idea instance
        // will change this.star
    }
}

// module.exports = Idea;