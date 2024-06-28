class Post {
    constructor(id, user, title, subject, description, rating, createdAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.subject = subject;
        this.description = description;
        this.rating = rating;
        this.createdAt = createdAt;
    }
}

export default Post;