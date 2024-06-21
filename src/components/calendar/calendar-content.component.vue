<script>
import CalendarService from "@/services/calendar.service.js";
import TrashIcon from "../../assets/trash-icon.svg";
import EventEntity from "@/models/event.entity.js";
import DropdownProjects from "@/components/dropdown/dropdown.component.vue";
import EditIcon from "../../assets/edit-event-icon.svg";

export default {
  name: "calendar-content",
  components: {
    DropdownProjects,
    TrashIcon,
    EditIcon,
  },
  data() {
    return {
      calendarService: new CalendarService(),
      current_date: new Date(),
      projectIdSelected: 0,
      events: [],
      showOptions: false,
      showPopUp: false,
      eventsDay: [],
      newEvent: false,
      optionSelected: "",
      inputNewEvent: {
        name: "",
        date: "",
        location: "",
        description: "",
        color: "#74A38F",
        projectId: 0
      }
    }
  },
  async mounted() {
    await this.getEvents();
  },
  computed: {
    month() {
      const lastDayMonth = new Date(this.current_date.getFullYear(), this.current_date.getMonth() + 1, 0);
      const days = [];
      for (let i = 1; i <= lastDayMonth.getDate(); i++) {
        const date = new Date(this.current_date.getFullYear(), this.current_date.getMonth(), i).toISOString().split('T')[0];
        days.push({ number: i, date });
      }
      return days;
    },
    eventsByDay() {
      const eventsByDay = {};
      this.events.forEach(event => {
        if (!eventsByDay[event.date]) {
          eventsByDay[event.date] = [];
        }
        eventsByDay[event.date].push(event);
      });
      console.log('events by day', eventsByDay);
      return eventsByDay;
    }
  },
  methods: {
    selectDay: function(date) {
      console.log('selected date', date);
      this.inputNewEvent['date'] = date;
      this.eventsDay = this.events.filter(event => event.date === date);
      this.togglePopUp();
    },
    getEvents: async function() {
      if(this.projectIdSelected !== 0) {
        const response = await this.calendarService.getEventsCalendar(this.projectIdSelected);
        if (response) {
          this.events = response.data;
        }
      }
    },
    toggleOptions: function(date) {
      const role = this.$store.state.user.role;
      if(role === 'director')
        this.showOptions = this.showOptions === date ? null : date;
    },
    togglePopUp: function() {
      const role = this.$store.state.user.role;

      if(role === 'director') {
        this.showPopUp = !this.showPopUp;
        this.newEvent = false;
      }
    },
    saveNewEvent: async function() {
      if(this.projectIdSelected === 0) return alert('Select a project to save the event');
      if(this.optionSelected !== "edit") {
        delete this.inputNewEvent["id"];
        this.inputNewEvent["projectId"] = this.projectIdSelected;
        console.log(new EventEntity(this.inputNewEvent))

        const response = await this.calendarService.saveNewEvent(new EventEntity(this.inputNewEvent));
        if(!response) console.error('Error saving new event');
        else {
          await this.getEvents();

        }
      }else {
        const idEvent = this.inputNewEvent["id"];
        delete this.inputNewEvent["id"];
        delete this.inputNewEvent["projectId"];

        await this.calendarService.editEvent(idEvent, new EventEntity(this.inputNewEvent))
            .then(r => {
              if(!r) console.error('Error to edit the event with id: ', idEvent);
              else {
                this.getEvents();
              }
            })
      }

      this.inputNewEvent = {
        id: "",
        name: "",
        date: "",
        location: "",
        description: ""
      };
      this.optionSelected = "";
      this.togglePopUp();
    },
    deleteEvent: async function(id) {
      const response = await this.calendarService.deleteEvent(id);
      if(!response) console.log('Error to delete the event with id: ', id);
      else await this.getEvents();
    },
    editEvent: function(idEvent) {
      this.optionSelected = "edit";
      this.showPopUp = !this.showPopUp;
      this.newEvent = true;

      this.inputNewEvent["id"] = idEvent;
    },
    receiveProjectSelected(project) {
      console.log('project selected', project);
      this.projectIdSelected = project;
      this.getEvents();
    }
  }
}
</script>

<template>
  <div class="calendar relative p-4 lg:p-5 mb-2">
    <h1 class="calendar-title text-4xl mb-4 text-left" aria-label="title">Calendar</h1>
    <dropdown-projects @projectSelected="receiveProjectSelected"></dropdown-projects>
    <div class="calendar__days-week mt-2" role="heading">
      <span aria-label="title">SUN</span>
      <span aria-label="title">MON</span>
      <span aria-label="title">TUES</span>
      <span aria-label="title">WED</span>
      <span aria-label="title">THURS</span>
      <span aria-label="title">FRI</span>
      <span aria-label="title">SAT</span>
    </div>

    <div class="days-week">
      <div v-for="d in month" :key="d.date" class="day" @click="selectDay(d.date)">
        {{ d.number }}

        <div class="day-event" v-if="eventsByDay[d.date]" :style="{backgroundColor: eventsByDay[d.date][0].color}"
             @click="toggleOptions(d.date)" @click.stop>
          <div v-for="event in eventsByDay[d.date]" :key="event.id" class="event">
            <strong>{{ event.name }}</strong>

            <div class="day-event__modify flex flex-column" v-if="showOptions === event.date" :key="event.id">
              <div class="day-event__modify-column flex gap-1" @click="deleteEvent(event.id)">
                <TrashIcon/>
                <span>Delete</span>
              </div>

              <div class="day-event__modify-column flex gap-1" @click="editEvent(event.id)">
                <EditIcon/>
                <span>Edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popup absolute flex justify-content-center align-items-center " v-if="showPopUp">
      <div class="popup__content relative border-round-2xl">
        <i class="fa-solid fa-xmark absolute top-0 right-0 p-3" @click="togglePopUp()"></i>
        <h2>Events</h2>
        <div class="popup__new-event flex justify-content-center align-items-center"
             @click="()=>{newEvent = !newEvent}">
          <i class="fa-solid fa-plus"></i>
          <p>New Event</p>
        </div>
        <div v-if="!newEvent" v-for="event in eventsDay" :key="event.id" class="event__detail">
          <h3>{{ event.name }}</h3>
          <p>{{ event.location }}</p>
          <p>{{ event.date }}</p>
          <p>{{ event.description }}</p>
        </div>

        <div class="form__new-event" v-if="newEvent">
          <form role="form" class="flex flex-column gap-2 justify-content-center align-items-center">
            <input type="text" placeholder="Title" v-model="inputNewEvent['name']">
            <input type="text" placeholder="Place" v-model="inputNewEvent['location']">
            <textarea placeholder="Type your description here..." v-model="inputNewEvent['description']"></textarea>
          </form>

          <div class="form__new-event-button" @click="saveNewEvent()" v-if="optionSelected !== 'edit'">SAVE</div>
          <div class="form__new-event-button" @click="saveNewEvent()" v-if="optionSelected === 'edit'">EDIT</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
}

.calendar-title {
  font-family: 'Lora', serif !important;
  font-weight: 600 !important;
  letter-spacing: 1px;
  color: #02513D;
}

.calendar__days-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar__days-week span {
  font-weight: bold;
}

.days-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: none;
}

.day {
  padding: 4rem 3rem;
  cursor: pointer;
  position:relative;
  border-bottom: 1px solid #787878;
  transition: all .1s ease-in-out;
  user-select: none;
}

.day:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.day::after {
  content: '';
  display: block;
  height: 100%;
  width: 1px;
  background-color: #787878;
  position: absolute;
  top: 0;
  right: 0;
}

/*the last cells % 7*/
.days-week .day:nth-child(7n)::after{
  display: none;
}

.day-event {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  padding: 5px;
  z-index: 1;
  color: #fff;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.day-event:hover {
  z-index: 2;
}

.day-event__modify {
  padding: .5rem;
  border-radius: 15px;
  box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  color: #000;
  position: absolute;
  top: -150%;
  right: -50%;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.day-event__modify-column:hover {
  opacity: .8;
}

.popup {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}

.popup__content {
  max-width: 60%;
  background-color: #fff;
  padding: 3rem;
}

.popup__content i {
  font-size: 2rem;
  cursor: pointer;
}

.event__detail {
  padding: 1rem;
}

.popup__new-event {
  padding: .5rem;
  background-color: #74A38F;
  color: #fff;
  cursor: pointer;
  gap: .5rem;
  transition: all .2s ease-in;
  border-radius: 15px;
  margin-top: .8rem;
}

.popup__new-event:hover {
  transform: scale(1.025);
}

.popup__new-event p, .popup__new-event i {
  font-size: 1rem;
}

.form__new-event {
  margin-top: 1.5rem;
  padding: .7rem;
  font-family: "Poppins", sans-serif;
}

.form__new-event input, .form__new-event textarea {
  padding: .5rem;
  border-radius: 10px;
  outline: none;
  resize: none;
  border: 1px solid #DDDDDD;
}

.form__new-event-button {
  padding: .5rem;
  background-color: #74A38F;
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  transition: all .2s ease-in-out;
}

.form__new-event-button:hover {
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
}

</style>