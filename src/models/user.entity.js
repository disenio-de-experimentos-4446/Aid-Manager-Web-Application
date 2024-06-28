export class User {
    constructor(id, firstName, lastName, email, profileImg, password, role, companyName, age, bio, companyId, occupation, phone) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.companyName = companyName;
        this.age = age;
        this.bio = bio;
        this.companyId = companyId;
        this.occupation = occupation;
        this.phone = phone;
        this.profileImg = profileImg;
    }
}