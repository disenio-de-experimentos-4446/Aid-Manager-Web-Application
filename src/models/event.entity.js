class EventEntity {
    constructor({ name, date, location, description}) {
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
        this.color = (Math.round(Math.random()))? "#74A38F" : "#98CFD7";
    }

}

export default EventEntity