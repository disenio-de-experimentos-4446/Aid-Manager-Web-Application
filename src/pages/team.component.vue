<script>
import UserIcon from "../assets/user-icon.svg"
import MessageIcon from "../assets/message-icon.svg"
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
      members: [],
      teamMemberService: new TeamMembersService()
    }
  },
  async mounted() {
    await this.getTeamMembers();
  },
  methods: {
    getTeamMembers: async function() {
      const members = await this.teamMemberService.getMembers()
          .then(r=>{
            if(r) return r.data
            else return r;
          })
          .catch(e=>console.error(e))

      if(members) {
        members.forEach((m) => {
          this.members.push(new TeamMemberEntity(m));
        })
      }
    }
  }
}
</script>

<template>
  <div class="team__content">
    <div class="team__content-banner flex justify-content-center align-items-center" role="heading">
      <h1 aria-label="title" class="font-italic team__content-title">Yesi's Hotman Team</h1>
    </div>

    <div class="container-cards">

      <div class="card__wrapper flex justify-content-between" v-for="m in members">
        <div class="card__content-user flex justify-content-center align-items-center gap-5">
          <img :src="m.image" alt="User Avatar" role="img" width="50px" class="border-circle">
          <span class="text-2xl">{{m.name}}</span>
        </div>

        <div class="card__content-info flex justify-content-center align-items-center gap-3">
          <p class="card__info-email">{{m.email}}</p>
          <UserIcon class="card__info-icon cursor-pointer transition-ease-in-out"/>
          <MessageIcon class="card__info-icon cursor-pointer transition-ease-in-out"/>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Qwitcher+Grypen:wght@400;700&display=swap');

.team__content {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
}

.container-cards {
  margin: 2rem 6rem;
  overflow-y: scroll;
  height: 250px;
  flex: 1;
}

.card__wrapper {
  margin: 2rem 0;
}

.team__content-banner {
  background-color: #98CFD7;
  padding: 6.5rem 0;
  border-radius: 1rem;
  margin: 2rem;
}

.team__content-title {
  font-family: "Qwitcher Grypen", cursive;
  font-size: 6vw;
  color: #fff;
  font-weight: 200;
}

.card__content-user, .card__content-info {
  width: max-content;
  padding: 1rem;
}

.card__info-email {
  color: #74A38F;
  font-size: 1.2rem;
}

.card__info-icon:hover {
  opacity: 0.8;
}

</style>