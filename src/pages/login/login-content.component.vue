<script>
import {UserService} from "@/services/user.service.js";

export default {
  name: "login-content",
  data() {
    return {
      userService: new UserService(),
      users: [],
      email: '',
      formValid: false,
      password: '',
      passwordFieldType: 'password',
      isRegistered: false,
      showDialog: false,
    }
  },
  async created() {
    await this.getUsers();
  },
  methods: {
    handleSubmitLogin() {
      this.isRegistered = false;
      console.log('Email entered:', this.email);
      console.log('Password entered:', this.password);

      for (let i = 0; i < this.users.length; i++) {
        // recorremos y vericamos que coincida las propidades de algun objeto con los inputs
        if (this.users[i].email === this.email && this.users[i].password === this.password) {
          this.isRegistered = true;
          // guardamos el usuario en el almacen Vuex ubicado en store.js
          this.$store.commit('setUser', this.users[i]);
          this.$router.push('/home');
          break;
        }
      }

      if (!this.isRegistered) {
        this.showDialog = true;
      }
    },

    validateForm() {
      this.formValid = this.email !== '' && this.password !== '';
    },

    async getUsers() {
      // obtenemos la respuesta del endpoint
      const response = await this.userService.getAllUsers();

      this.users = response.data;
      console.log(response.data);
    },

    togglePasswordFieldType() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }

  }
}
</script>

<template>
  <div class="login-container h-screen flex">
    <div class="logo-container flex">
      <img src="../../assets/logoAidManager.png" alt="logo"/>
      <span class="font-bold text-3xl">AidManager</span>
    </div>
    <div class="card flex">
      <span class="title font-normal text-xl" style="color: #02513D;">Welcome!</span>

      <form class="flex flex-column gap-3" @submit.prevent="handleSubmitLogin">

        <input type="email" placeholder="Email"
               class="input-field p-3" v-model="email"
               @input="validateForm"
        />
        <div class="password-field">
          <input :type="passwordFieldType" placeholder="Password"
                 class="input-field p-3" v-model="password"
                 @input="validateForm"
          />
          <i :class="passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"
             @click="togglePasswordFieldType"
             class="toggle-icon"
          ></i>
        </div>

        <a class="link" href="#" style="color: #02513D; font-style:italic; font-size: 0.8rem;">Forgot your password?</a>

        <button :disabled="!formValid" type="submit" class="button p-3" style="color: #fff; margin-top:30px">Sign in
        </button>

      </form>
    </div>
    <h3 class="card-footer">New to AidManager?
      <router-link to="/register" class="link" style="font-weight: 600">Join now</router-link>
    </h3>
  </div>
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="showDialog" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-exclamation-circle text-red-500"></i>
      <h1>Login Failed!</h1>
      <p class="text-md">Invalid email or password, please enter your credentials again</p>
      <pv-button class="py-3 px-5" label="OK" @click="showDialog = false"/>
    </div>
  </pv-dialog>
</template>

<style scoped>

.login-container {
  background-color: #E6F4E2;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.logo-container {
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
}

.card {
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  height: auto;
  text-align: center;
  justify-content: center;
  padding: 40px;
  margin: 40px;
  flex-direction: column;
}

.title {
  margin-bottom: 40px;
}

.input-field {
  align-self: center;
  width: 90%;
  border-radius: 20px;
  border: 1px solid #BDBDBD;
  color: #0009;
}

.input-field:focus {
  background-color: #F7F7F7;
}

.button {
  width: 40%;
  align-self: center;
  background-color: #02513D;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.button:hover {
  background-color: #024030;
}

.link {
  width: 90%;
  align-self: center;
  text-align: right;
  color: #02513D;
  text-decoration: none;
}

.card-footer {
  font-weight: normal;
  font-size: 1rem;
}
.password-field {
  align-self: center;
   position: relative;
   width: 90%;
   display:flex;
   align-items: center;
 }

.input-field {
  flex: 1;
  padding-right: 2.5rem;
}

.toggle-icon {
  color: #575757;
  position: absolute;
  right: 15px;
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  .logo-container {
    flex-direction: column;
    text-align: center;
  }

  .input-field {
    width: 100%;
  }
  .password-field {
    width: 100%;

  }

  .link {
    width: 100%;
  }
}

@media screen and (max-width: 560px) {
  .button {
    width: 100%;
  }
}

</style>