export class TaskEntity
{
    constructor(id, title, assigned,due,status) {
        this.id = id;
        this.title = title;
        this.assigned = assigned;
        this.due = due;
        this.status = status;
    }
}