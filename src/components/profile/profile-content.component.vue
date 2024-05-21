<script>
import {UserService} from "@/services/user.service.js";
import {mapState} from "vuex";

export default {
  name: "ProfileContent",
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      isFieldsEmpty: false,
      userService: new UserService(),
      showPopUp: false,
      inputUpdateInfo: {
        firstName: "",
        lastName: "",
        email: ""
      }
    }
  },
  methods: {
    clearInputUpdateInfo() {
      this.inputUpdateInfo = {
        firstName: "",
        lastName: "",
        email: ""
      };
    },

    togglePopUp() {
      this.showPopUp = !this.showPopUp;
    },

    async updateProfile() {

      console.log(this.inputUpdateInfo);

      // verificamos si los campos de entrada están vacíos
      if (!this.inputUpdateInfo.firstName || !this.inputUpdateInfo.lastName || !this.inputUpdateInfo.email) {
        this.isFieldsEmpty = true;
        console.error('Error: Todos los campos deben estar llenos para actualizar el usuario.');
        return;
      }

      // usamos el spread operator "..." para planchar la data del form en el estado user
      // , ademas incluyendo el id que recibimos por parametro de la ruta
      const newUser = {
        ...this.user,
        ...this.inputUpdateInfo,
        id: this.$route.params.id
      };

      try {
        // disparamos el updateUser pasando como param el nuevo user con la data actualizada
        await this.$store.dispatch('updateUser', newUser);
        this.clearInputUpdateInfo(); // limpamos el form luego de enviado
        this.togglePopUp(); // cerramos el popap >.<
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
      }

    },



  }
}
</script>

<template>
  <div class="content">
    <div class="flex flex-row">
      <form class="flex flex-column user-info" @submit.prevent="updateProfile">
        <h2>{{user.firstName + " " + user.lastName}}'s profile:</h2>

        <p class="editable"><strong>Full Name: </strong>
          <span v-if="!showPopUp">{{ user.firstName + ' ' + user.lastName + ' '}} </span>
          <div v-else class="full-name-input">
            <input type="text" placeholder=" First Name" v-model="inputUpdateInfo['firstName']" >
            <input type="text" placeholder=" Last Name" v-model="inputUpdateInfo['lastName']" >
          </div>
        </p>


        <p class="editable"><strong>Age:</strong> 20 years
        </p>

        <p class="editable"><strong>Email: </strong>
          <span v-if="!showPopUp">{{ user.email + ' '}} </span>
          <input v-else type="email" placeholder=" Email" v-model="inputUpdateInfo['email']" >
        </p>

        <p class="editable"><strong>ONG:</strong> Hope Haven Org
        </p>

        <p class="editable"><strong>Phone:</strong> 123456789
        </p>

        <p class="editable"><strong>Ocupation:</strong> Student
        </p>

        <p class="editable"><strong>Bio:</strong> Dedicated psychologist, employs a holistic and empathetic approach to help individuals overcome traumas and foster emotional well-being. He also advocates for mental health in his community through workshops and educational talks.
          <i class="pi pi-pencil edit-icon"></i>
        </p>

        <button v-if="!showPopUp" class="edit-button" @click="togglePopUp">Edit profile</button>
        <button v-else class="edit-button" type="submit">Save changes</button>

      </form>

      <div class="flex flex-col">
        <div class="avatar-wrapper">
          <div class="avatar-image">
            <img :src="user.profileImg || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="User Photo">
            <div class="avatar-content">
              <i class="pi pi-camera" style="font-size: 4rem; color: #9f9f9f;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pv-dialog :style="{margin: '0 10px'}" :visible.sync="isFieldsEmpty" :modal="true" :closable="false">
      <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
        <i class="text-7xl pi pi-times-circle text-red-500"></i>
        <h1>Fill the formulary!</h1>
        <p class="text-md">There is no information to update a user</p>
        <pv-button class="py-3 px-5" label="OK" @click="isFieldsEmpty = false"/>
      </div>
    </pv-dialog>
  </div>
</template>

<style scoped>
.content {
  padding:30px;
}
.user-info {
  width: 50%;
  height: 76vh;
  justify-content:center;
  margin-right: 8rem;
}
.user-info p, h2 {
  margin-bottom: 12px;
}
.user-info p:last-child {
  margin-bottom: 0;
}
.edit-icon {
  color: #9f9f9f;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.editable:hover .edit-icon {
  opacity: 1;
  cursor: pointer;
}

.profile-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:100%;
}
.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
}

.profile-wrapper i {
  border-bottom-left-radius: 8px;
}
.full-name-input input {
  margin-right: 10px;
  width: 30%;
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
  border: 1px solid #02513D;
  background-color: transparent;
  max-width: 180px;
  color: #02513D;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #02513D;
  color: white;
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
.avatar-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  align-items:center;
  justify-content: center;
}
.avatar-image {
  width: 300px;
  height: 300px;
  position:relative;
}
img {
  width:100%;
  display:block;
  margin:auto;
}
.avatar-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all .6s ease-in-out;
}
.avatar-content:hover{
  opacity: 1;
}


</style>
