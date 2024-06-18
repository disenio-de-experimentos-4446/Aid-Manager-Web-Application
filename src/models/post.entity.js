class Post {
    constructor(id, name, email, title, description, profile_img, publication_date, images) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.title = title;
        this.description = description;
        this.profile_img = profile_img;
        this.publication_date = publication_date;
        this.images = images;
    }
}

export default Post;