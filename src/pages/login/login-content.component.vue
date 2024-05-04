<script>
  export default {
    name: "login-content"
  }
</script>

<template>
  <div class="login-container h-screen flex">
    <div class="logo-container flex">
      <img src="../../assets/logoAidManager.png" alt="logo" />
      <span class="font-bold text-4xl">AidManager</span>
    </div>
    <div class="card flex">
      <span class="title font-normal text-xl" style="color: #02513D;">Welcome!</span>

      <form class="flex flex-column gap-3">

        <input type="email" placeholder="Email" class="input-field  p-3" v-model="email"/>
        <input type="password" placeholder="Password" class="input-field p-3" v-model="password"/>
        <a class="link" href="#" style="color: #02513D; font-style:italic; font-size: 0.8rem;">Forgot your password?</a>

        <button class="button p-3" style="color: #fff; margin-top:30px">Sign in</button>

      </form>
    </div>

    <h3 class="card-footer">New to AidManager? <a href="" class="link" style="font-weight: 600">Join now</a></h3>


  </div>
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
    flex-direction:column;
  }
  .title {
    margin-bottom: 40px;
  }
  .input-field {
    align-self:center;
    width: 90%;
    border-radius: 20px;
    border: 1px solid #BDBDBD;
    color: #0009;
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
  }
  @media screen and (max-width: 560px) {
    .button {
      width: 100%;
    }
  }

</style>