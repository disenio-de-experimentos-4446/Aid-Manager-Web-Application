<script>
import UserIcon from "@/assets/user-icon.svg";
import MessageIcon from "@/assets/message-icon.svg";
import TeamMembersService from "@/services/team-members.service.js";
import TeamMemberEntity from "@/models/team-member.entity.js";

export default {
  name: "team-content",
  components: {
    UserIcon,
    MessageIcon
  },
  data() {
    return {
      popUp: false,
      popUpDetail: "",
      userSelected: null,
      members: [],
      message: "",
      teamMemberService: new TeamMembersService()
    }
  },
  async mounted() {
    await this.getTeamMembers();
  },
  methods: {
    getTeamMembers: async function () {
      const members = await this.teamMemberService.getMembers()
          .then(r => {
            if (r) return r.data
            else return r;
          })
          .catch(e => console.error(e))

      if (members) {
        members.forEach((m) => {
          this.members.push(new TeamMemberEntity(m));
        })
      }
    },
    togglePopUp: function (id, popUpDetail) {
      this.popUpDetail = popUpDetail;
      console.log(id);
      this.popUp = !this.popUp;
      this.userSelected = this.members.find(m => m.id === id);
      console.log(this.popUp)
      console.log(this.userSelected)
    },
    sendMessage: async function () {
      const body = {
        id: "2",
        date: new Date().getUTCDate(),
        message: this.message,
        sender: this.userSelected.name
      }
      const result = await this.teamMemberService.newMessage(this.userSelected.id, body)
      if (!result) {
        console.error("Failed to send message")
      } else {
        console.log("Message sent")
      }
    }
  }
}
</script>

<template>
  <div class="team__content relative">
    <div class="team__content-banner flex justify-content-center align-items-center" role="heading">
      <h1 aria-label="title" class="font-italic team__content-title text-6xl md:text-7xl xl:text-8xl">Yesi's Hotman
        Team</h1>
    </div>

    <div class="container-cards">

      <div class="card__wrapper flex flex-wrap justify-content-between" v-for="m in members">
        <div class="card__content-user flex justify-content-center align-items-center gap-3 lg:gap-5">
          <img :src="m.image" alt="User Avatar" role="img" width="50px" class="border-circle">
          <span class="text-lg lg:text-xl">{{ m.name }}</span>
        </div>

        <div
            class="card__content-info flex flex-wrap justify-content-start lg:justify-content-center align-items-center gap-4 lg:gap-4">
          <p class="card__info-email text-lg lg:text-xl">{{ m.email }}</p>
          <UserIcon
              class="card__info-icon cursor-pointer transition-ease-in-out"
              @click="togglePopUp(m.id, 'contact')"/>
          <MessageIcon
              class="card__info-icon cursor-pointer transition-ease-in-out"
              @click="togglePopUp(m.id, 'message')"/>
        </div>
      </div>

    </div>

    <div class="popup absolute top-50 left-50" v-if="popUp">

      <div
          class="popup__content bg-white shadow-1 border-round-2xl flex flex-column justify-content-center align-items-center p-6 relative"
          role="contentinfo">
        <i class="fa-solid fa-xmark absolute" @click="togglePopUp(userSelected.id)"></i>

        <div class="popup__content-contentinfo" v-if="popUpDetail === 'contact'">
          <div class="popup__content-img">
            <img :src="userSelected.image" alt="Photo Profile User" role="img" width="210px"/>
          </div>
          <h2 class="popup__content-title" aria-label="title">{{ userSelected.name }}</h2>

          <div aria-roledescription="content" class="popup__content-description">
            <span class="popup__member-email" aria-label="email">{{ userSelected.email }}</span>
            <p class="popup__member-description" aria-label="description">{{ userSelected.description }}</p>
          </div>
        </div>

        <div class="popup__content-contentinfo" v-if="popUpDetail === 'message'">
          <h2 class="popup__content-title" aria-label="title">{{ userSelected.name }}</h2>
          <p class="popup__member-email" aria-label="email">{{ userSelected.email }}</p>

          <div class="popup__member-description" aria-label="description">
            <textarea class="border-round-2xl w-full h-40" placeholder="Can you leave your message here..."
                      v-model="message"></textarea>
          </div>
          <div class="button bg-primary text-white border-round-2xl p-2 mt-4 cursor-pointer" @click="sendMessage()">
            Send
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.team__content {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'Poppins', sans-serif;
}

.container-cards {
  flex: 1;
}

.card__wrapper {
  margin: 2rem 0 0 0;
}

.team__content-banner {
  background-color: #98CFD7;
  padding: 6.5rem 0;
  border-radius: 1rem;
}

.team__content-title {
  font-family: "Qwitcher Grypen", cursive;
  color: #fff;
  font-weight: 300;
}

.card__content-user, .card__content-info {
  width: max-content;
  padding: 1rem;
}

.card__info-email {
  color: #74A38F;
}

.card__info-icon:hover {
  opacity: 0.8;
}


.popup {
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items:center;
  text-align: center;
}

.popup__content {
  max-width: 50%;
}

.popup__content i {
  font-size: 2.5rem;
  cursor: pointer;
  top: 5%;
  right: 5%;
}

.popup__member-description {
  margin-top: 2rem;
}

.popup__member-description textarea {
  resize: none;
  height: 100px;
  padding: 1rem;
}

.button {
  transition: all .3s ease-in;
  text-transform: uppercase;
}

.button:hover {
  transform: scale(1.02);
}

@media screen and (max-width: 730px) {
  .popup__content-img img {
    width: 150px;
  }

  .popup__content i {
    top: 0;
  }
}

</style>