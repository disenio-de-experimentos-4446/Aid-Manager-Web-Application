<script>
import {ref} from "vue";

export default {
  name: "signup-content",
  setup() {
    const user = ref('');
  }
}

</script>

<template>
  <div class="signup-container h-screen flex">
    <div class="logo-container flex">
      <img src="../../assets/logoAidManager.png" alt="logo" />
      <span class="font-bold text-4xl">AidManager</span>
    </div>
    <div class="card flex">
      <span class="title font-normal" style="font-size:1rem">Transform your fundraising efforts with precision analytics.</span>

      <form class="flex flex-column gap-3">

        <div class="user-name-container">
          <input type="text" placeholder="First Name" class="input-field p-3" v-model="firstName"/>
          <input type="text" placeholder="Last Name" class="input-field p-3" v-model="lastName"/>
        </div>

        <input type="text" placeholder="Institution Email" class="input-field  p-3" v-model="email"/>

        <input type="password" placeholder="Password" class="input-field p-3" v-model="password"/>

        <input type="password" placeholder="Confirm password" class="input-field p-3" v-model="confirmPassword"/>


        <div class="radio-button-container">
          <input class="radio-input" type="radio" id="director" name="type_user" value="director" v-model="director"/>
          <label class="radio-label" for="director">Director</label>

          <input class="radio-input" type="radio" id="team" name="type_user" value="team" v-model="team"/>
          <label class="radio-label" for="team">Team</label>
        </div>

        <button class="button p-3" style="color: #fff; margin-top:30px">Sign up</button>

      </form>
    </div>

    <h3 class="card-footer">Already have an account? <a href="" class="link" style="font-weight: 600">Log in</a></h3>


  </div>
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
  flex-direction:column;
}
.title {
  margin-bottom: 40px;
  font-size: 0.8rem;
}
.input-field {
  align-self:center;
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
.input-field:hover {
  background-color: #F7F7F7;
}
.button {
  width: 40%;
  align-self:center;
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
  align-self:center;
  text-align:right;
  color: #02513D;
  text-decoration: none;
}

.card-footer {
  font-weight: normal;
  font-size: 1rem;
}
.radio-button-container {
   display: flex;
   justify-content: center;
   align-items: center;
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
  border: 6px solid #02513D;
}


@media screen and (max-width: 500px) {
  .logo-container {
    flex-direction: column;
    text-align: center;
  }
  .input-field {
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