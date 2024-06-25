export class TaskEntity
{
    constructor(id, title, assigned,due,status, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assigned = assigned;
        this.due = due;
        this.status = status;
    }
}