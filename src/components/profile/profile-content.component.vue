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
      },
      editField: {
        fullName: false,
        email: false
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
      this.editField = {
        fullName: false,
        email: false
      };
    },

    toggleEditField(field) {
      this.editField[field] = true;
    },

    async updateProfile() {

      console.log(this.inputUpdateInfo);

      // verificamos si los campos de entrada están vacíos
      if (((!this.inputUpdateInfo.firstName || !this.inputUpdateInfo.lastName) && this.editField['fullName'])|| (!this.inputUpdateInfo.email && this.editField['email'])) {
        this.isFieldsEmpty = true;
        console.error('Error: Todos los campos deben estar llenos para actualizar el usuario.');
        return;
      }

      // si no se ha dado click en el lapiz para editar el campo, se le asigna el valor actual del usuario
      if (!this.editField['fullName']) {
        this.inputUpdateInfo.firstName = this.user.firstName;
        this.inputUpdateInfo.lastName = this.user.lastName;
      }
      if (!this.editField['email']) {
        this.inputUpdateInfo.email = this.user.email;
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

    }

  },

}
</script>

<template>
  <div class="content">
    <div class="profile-content flex">
      <form class="flex user-info form__update-profile" @submit.prevent="updateProfile">
        <h2>{{user.firstName + " " + user.lastName}}'s profile:</h2>

        <p class="editable flex flex-col  gap-2">
          <strong>Full Name:</strong>
          <span v-if="!editField['fullName']">{{ user.firstName + ' ' + user.lastName + ' '}} </span>
          <div v-else class="full-name-input">
            <input type="text" placeholder="First Name" v-model="inputUpdateInfo['firstName']" >
            <input type="text" placeholder="Last Name" v-model="inputUpdateInfo['lastName']" >
          </div>
          <i v-if="!editField['fullName'] && showPopUp" class="pi pi-pencil edit-icon" @click="toggleEditField('fullName')"></i>

        </p>

        <p class="editable flex gap-2"><strong>Age:</strong> 20 years
          <i v-if=showPopUp class="pi pi-pencil edit-icon"></i> <!--posteriomente se habilitara la opc de editar, cuando el usuario tenga estos atributos-->
        </p>

        <p class="editable flex gap-2"><strong>Email: </strong>
          <span v-if="!editField['email']">{{ user.email}} </span>
          <input v-else type="email" placeholder="Email" v-model="inputUpdateInfo['email']" >
          <i v-if="!editField['email'] && showPopUp" class="pi pi-pencil edit-icon" @click="toggleEditField('email')"></i>
        </p>

        <p class="editable flex gap-2"><strong>ONG:</strong>Hope Haven Org
          <i v-if=showPopUp class="pi pi-pencil edit-icon"></i> <!--posteriomente se habilitara la opc de editar, cuando el usuario tenga estos atributos-->
        </p>

        <p class="editable flex gap-2"><strong>Phone:</strong>123456789
          <i v-if=showPopUp class="pi pi-pencil edit-icon"></i> <!--posteriomente se habilitara la opc de editar, cuando el usuario tenga estos atributos-->
        </p>

        <p class="editable flex gap-2"><strong>Ocupation:</strong>Student
          <i v-if=showPopUp class="pi pi-pencil edit-icon"></i> <!--posteriomente se habilitara la opc de editar, cuando el usuario tenga estos atributos-->
        </p>

        <p class="editable"><strong>Bio:</strong> Dedicated psychologist, employs a holistic and empathetic approach to help individuals overcome traumas and foster emotional well-being. He also advocates for mental health in his community through workshops and educational talks.
          <i v-if=showPopUp class="pi pi-pencil edit-icon"></i> <!--posteriomente se habilitara la opc de editar, cuando el usuario tenga estos atributos-->
        </p>

        <button v-if="!showPopUp" class="edit-button" @click="togglePopUp">Edit profile</button>
        <button v-else class="edit-button" type="submit">Save changes</button>

      </form>

      <div class="flex flex-col">
        <div class="avatar-wrapper">
          <div class="avatar-image">
            <img class="h-full" :src="user.profileImg || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'" alt="User Photo">
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
  margin-right: 10%;
  flex-direction: column;
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
.editable {
}
.editable:hover .edit-icon {
  opacity: 1;
  cursor: pointer;
}


.profile-wrapper i {
  border-bottom-left-radius: 8px;
}
.full-name-input input {
  margin-right: 10px;
  width: 47%;
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

.form__update-profile {
  padding: .7rem;
  font-family: "Poppins", sans-serif;
}

.form__update-profile input {
  padding: 0.4rem;
  border-radius: 10px;
  outline: none;
  resize: none;
  border: 1px solid #DDDDDD;
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
  height: 350px;
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
  transition: all .5s ease-in-out;
}
.avatar-content:hover{
  opacity: 1;
  cursor: pointer;
}
@media only screen and (max-width: 700px) {
  .profile-content {
    width: 100%;
    height: auto;
    flex-direction: column;
  align-items: center;
  }
  .user-info{
    width: 100%;
    margin-right: 0;
  }
}
@media only screen and (max-width: 800px) {
  .full-name-input input {
    width: 100%;
    margin-right: 0;
  }

  .user-info p,
  h2 {
    margin-bottom: 0.5rem;
  }

  .editable p {
    margin-right: 0.5rem;
  }

  .edit-button {
    margin-top: 1rem;
  }
}




</style>
