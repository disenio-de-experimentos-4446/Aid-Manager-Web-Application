<script>
import {UserService} from "@/services/user.service.js";
import {CompanyService} from "@/services/company.service.js";

export default {
  name: "signup-content",
  data() {
    return {
      token: "",
      userService: new UserService(),
      companyService: new CompanyService(),
      users: [],
      confirmPassword: '',
      passwordFieldType: 'password',
      identificationCode: '',
      isPasswordNotMatch: false,
      isEmailExists: false,
      isFieldsEmpty: false,
      isUserCreated: false,
      showError: false,
      existsCompanyId: true,
      message_error: "",
      form: {
        firstName: '',
        lastName: '',
        age: 0,
        email: '',
        phone: "",
        occupation: "",
        password: '',
        profileImg: '',
        role: '',
        companyName: '',
        bio: "",
        companyId: 0
      }
    }
  },
  async created() {
    //await this.getUsers();
  },
  methods: {

    async getUsers() {
      // obtenemos la respuesta del endpoint
      const response = await this.userService.getAllUsers();

      this.users = response.data;
      console.log(response.data);
    },

    async onSubmitRegister() {
      // verify if the inputs are empty :O
      if (!this.areFieldsComplete()) {
        this.isFieldsEmpty = true;
        return;
      }

      // verify is the passwords match
      if (this.form.password !== this.confirmPassword) {
        this.isPasswordNotMatch = true;
        return;
      }

      if (this.form.role === 'director') {
        await this.createNewUser("director");

      } else {
        this.isUserCreated = true;
      }

    },

    async createNewUser( companyIdentification ) {
      if(this.identificationCode === "" && companyIdentification !== "director") {
        this.isFieldsEmpty = true;
        return;
      }
      if(this.form.role !== "director") {
        await this.userService.signUpUser(this.form.email, this.form.password)
            .then(async(r)=> {
              if(r.status === 200) {
                await this.userService.signInUser(this.form.email, this.form.password)
                    .then(res=> {
                      console.log('res', res)
                      if(res.status === 200) {
                        this.token = res.data.token;
                        this.$store.commit('setToken', this.token);
                      }
                    })
                    .catch(e=>console.log('error: ', e))
              }

            })
            .catch(e=>console.log('error: ', e))

        await this.companyService.getCompanyByUID(companyIdentification)
            .then(r => {
              const response = r.data;
              if(response.status_code == 404) {
                this.existsCompanyId = false;
              }else {
                this.form.companyName = response.company.brandName;
                this.form.companyId = response.company.identificationCode;
                this.existsCompanyId = true;
              }
            })
      }

      this.form.companyId = this.form.companyId.toString();

      if(this.existsCompanyId) {
        await this.userService.signUpUser(this.form.email, this.form.password)
            .then(async(r)=> {
              if(r.status === 200) {
                await this.userService.signInUser(this.form.email, this.form.password)
                    .then(res=> {
                      if(res.status === 200) {
                        this.token = res.data.token;
                        console.log('token', this.token);
                        this.$store.commit('setToken', this.token);
                      }
                    })
                    .catch(e=>console.log('error: ', e))
              }

            })
            .catch(e=>console.log('error: ', e))


        try {
          await this.userService.createNewUser(this.form)
              .then(r=> {
                const response = r.data;
                if(response.status_code !== 202) {
                  this.message_error = response.message;
                  this.showError = true;
                  return;
                }
                this.$store.commit('updateForm', response.data);
                //this.$store.state.user = response.data;
                this.$store.commit('setUser', response.data);
                this.isUserCreated = false;
                if(this.form.role === "director")
                  this.$router.push('/subscription');
                else this.$router.push('/home');
              })

        } catch (error) {
          console.error('Error to register a new user:', error);
        }
      }else {
        this.message_error = "The company identification code does not exist";
        this.showError = true;
      }
    },

    areFieldsComplete() {

      const fieldsRequired = ['firstName', 'lastName', 'email', 'password', 'role']

      // verify if all inputs are fill
      for (let field of fieldsRequired) {
        if (!this.form[field] || this.form[field].trim().length === 0) {
          return false;
        }
      }

      // verify if at least one of the radio buttons is selected
      if (this.form.role == '' && this.form.role == '') {
        return false;
      }

      return true;
    },

    togglePasswordFieldType() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },

    goToLogin() {
      this.$store.commit('clearForm');
      this.isUserCreated = false;
      this.$router.push('/login');
    },

  }
}

</script>

<template>
  <div class="signup-container min-h-screen flex">
    <div class="logo-container flex">
      <img src="../../assets/logoAidManager.png" alt="logo"/>
      <span class="font-bold text-4xl">AidManager</span>
    </div>
    <div class="card flex">
      <span class="title font-normal" style="font-size:1rem">Transform your fundraising efforts with precision analytics.</span>

      <form class="flex flex-column gap-3" @submit.prevent="onSubmitRegister()">

        <div class="user-name-container">
          <input type="text" placeholder="First Name" class="input-field p-3" v-model="form.firstName"/>
          <input type="text" placeholder="Last Name" class="input-field p-3" v-model="form.lastName"/>
        </div>

        <input type="email" placeholder="Institution Email" class="input-field  p-3" v-model="form.email"/>

        <input type="password" placeholder="Password" class="input-field p-3" v-model="form.password"/>

        <div class="confirm-password-field">
          <input :type="passwordFieldType" placeholder="Confirm password"
                 class="input-field p-3" v-model="confirmPassword"
          />
          <i :class="passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"
             @click="togglePasswordFieldType"
             class="toggle-icon"
          ></i>
        </div>

        <div class="radio-button-container">
          <input class="radio-input" type="radio" id="director" name="type_user" value="director" v-model="form.role"/>
          <label class="radio-label" for="director">Director</label>

          <input class="radio-input" type="radio" id="team" name="type_user" value="team" v-model="form.role"/>
          <label class="radio-label" for="team">Team</label>
        </div>
        <button class="button p-3" style="color: #fff; margin-top:30px">Sign up</button>
      </form>
    </div>
    <h3 class="card-footer">Already have an account?
      <router-link to="/login" class="link" style="font-weight: 600">Log in</router-link>
    </h3>
  </div>
  <!-- display modal when the password and password confirm do not match -->
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="isPasswordNotMatch" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-exclamation-triangle text-yellow-500"></i>
      <h1>Check the password</h1>
      <p class="text-md">The confirmation password and password are not the same</p>
      <pv-button class="py-3 px-5" label="OK" @click="isPasswordNotMatch = false"/>
    </div>
  </pv-dialog>
  <!-- Display modal when the email entered has already been registered -->
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="isEmailExists" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-times-circle text-red-500"></i>
      <h1>This email is not valid!</h1>
      <p class="text-md">The email entered has already been registered</p>
      <pv-button class="py-3 px-5" label="OK" @click="isEmailExists = false"/>
    </div>
  </pv-dialog>
  <!-- Display modal when the inputs are empty -->
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="isFieldsEmpty" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-times-circle text-red-500"></i>
      <h1>Fill the formulary!</h1>
      <p class="text-md">There is no information to register a user</p>
      <pv-button class="py-3 px-5" label="OK" @click="isFieldsEmpty = false"/>
    </div>
  </pv-dialog>
  <!--  Display modal when the user has successfully registered-->
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="isUserCreated" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-check-circle text-green-500"></i>
      <h2>Enter your Organization's Unique ID</h2>
      <input v-model="identificationCode" class="w-full border-1 input-field border-round-md py-2 text-lg text-center"
             placeholder="7w9Klb" style="letter-spacing: 1.5px">
      <p class="text-md">You are one step away from starting a great adventure with us!</p>
      <pv-button style="letter-spacing: .8px" class="py-3 px-5" label="Join" @click="createNewUser(this.identificationCode)"/>
    </div>
  </pv-dialog>
  <!-- Display modal to errors x -->
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="showError" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-times-circle text-red-500"></i>
      <h1>Error!</h1>
      <p class="text-md">{{message_error}}</p>
      <pv-button class="py-3 px-5" label="OK" @click="showError = false"/>
    </div>
  </pv-dialog>
</template>

<style scoped>
.signup-container {
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
  font-size: 0.8rem;
}

.input-field {
  align-self: center;
  width: 90%;
  border-radius: 20px;
  border: 1px solid #BDBDBD;
  color: #0009;
}

.user-name-container {
  align-self: center;
  width: 90%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
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
  margin: 0 0 3rem 0;
}

.radio-button-container {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.radio-label {
  margin-right: 25px;
  line-height: 32px;
  font-size: 0.9rem;
}

.radio-input {
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid #999;
  transition: 0.2s all linear;
  margin-right: 5px;

  position: relative;
}

.radio-input:checked {
  border: 8px solid #02513D;
}

.confirm-password-field {
  align-self: center;
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
}

.input-field {
  flex: 1;
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

  .confirm-password-field {
    width: 100%;
  }

  .link {
    width: 100%;
  }

  .user-name-container {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
}

@media screen and (max-width: 560px) {
  .button {
    width: 80%;
  }
}

</style>