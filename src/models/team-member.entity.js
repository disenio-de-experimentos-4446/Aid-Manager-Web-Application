class TeamMemberEntity {
    constructor({id, firstName, lastName, email, description }) {
        this.id = id;
        this.image = "https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png";
        this.name = firstName + " " + lastName;
        this.email = email;
        this.description = description;
    }
}

export default TeamMemberEntity;