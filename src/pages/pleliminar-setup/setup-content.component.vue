<script>
export default {
  name: "setup-content",
}
</script>

<template>
  <div class="setup-container h-screen flex">
    <div class="logo-container flex">
      <img src="../../assets/logoAidManager.png" alt="logo" />
      <span class="font-bold text-4xl">AidManager</span>
    </div>
    <div class="card flex gap-3">

      <span class="title font-normal" style="font-size:2rem">Preliminar Setup</span>

      <input type="text" placeholder="Organization Trademark" class="input-field  p-3" v-model="trademark"/>

      <input type="text" placeholder="Country/Region" class="input-field  p-3" v-model="country"/>

      <input type="number" placeholder="Phone Number" class="input-field  p-3" v-model="phone"/>
      <button class="button p-3" style="color: #fff; margin-top:30px">Start</button>

    </div>


  </div>
</template>

<style scoped>
.setup-container {
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
.cardinfo-container {
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


@media screen and (max-width: 500px) {
  .logo-container {
    flex-direction: column;
    text-align: center;
  }
  .input-field {
    width: 100%;
  }
}
@media screen and (max-width: 560px) {
  .button {
    width: 80%;
  }
}

</style>