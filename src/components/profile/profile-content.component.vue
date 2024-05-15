<script>
import {UserService} from "@/services/user.service.js";

export default {
  name: "ProfileContent",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      userService: new UserService(),
      showPopUp: false,
      inputUpdateInfo: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileImg: "",
        role: ""
      }
    }
  },
  methods: {
    togglePopUp() {
      this.showPopUp = !this.showPopUp;
    },
    async updateProfile() {
      if (!this.inputUpdateInfo.firstName || !this.inputUpdateInfo.lastName || !this.inputUpdateInfo.email) {
        alert("Please fill all the fields");
        return;
      }
      this.inputUpdateInfo.id = this.user.id;
      this.inputUpdateInfo.role = this.user.role;
      this.inputUpdateInfo.password = this.user.password;
      this.inputUpdateInfo.profileImg = this.user.profileImg;

      const response = await this.userService.updateUser(this.inputUpdateInfo);
      if (response) {
        console.log('trying to update user info');
        this.$store.commit("setUser", response);
        this.togglePopUp();
      }
    }
  }
}
</script>

<template>
  <div class="profile-wrapper">
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          <img :src="user.profileImg" alt="User Photo" class="avatar">
        </div>
        <div class="profile-info">
          <p class="name">{{ user.firstName + " " + user.lastName }}</p>
          <p class="email">{{ user.email }}</p>
          <p class="role">{{ user.role }}</p>
          <button class="edit-button" @click="togglePopUp">Editar perfil</button>
        </div>
      </div>
    </div>
    <div class="popup absolute flex justify-content-center align-items-center" v-if="showPopUp">
      <div class="popup__content relative border-round-2xl">
        <div class="form__update-profile">
          <form role="form" class="flex flex-column gap-2 justify-content-center align-items-center">
            <input type="text" placeholder="First Name" v-model="inputUpdateInfo['firstName']">
            <input type="text" placeholder="Last Name" v-model="inputUpdateInfo['lastName']">
            <input type="email" placeholder="Email" v-model="inputUpdateInfo['email']">
          </form>

          <div class="form__update-profile-button" @click="updateProfile()">Save</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.profile-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar {
  margin-bottom: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.profile-info {
  text-align: center;
}

.name {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.email, .role {
  font-size: 18px;
  margin: 5px 0;
  color: #666;
}

.edit-button {
  background-color: #02513D;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #024030;
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


.form__update-profile {
  margin-top: 1.5rem;
  padding: .7rem;
  font-family: "Poppins", sans-serif;
}

.form__update-profile input {
  padding: .5rem;
  border-radius: 10px;
  outline: none;
  resize: none;
  border: 1px solid #DDDDDD;
}
.form__update-profile-button {
  padding: .5rem;
  background-color: #74A38F;
  text-align:center;
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  transition: all .2s ease-in-out;
}

.form__update-profile-button:hover {
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.3);
}

</style>
