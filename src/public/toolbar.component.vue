<script>
export default {
  name: "toolbar",
  props: {
    toggleNav: {
      type: Function,
      required: true
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    handleToggle() {
      this.toggleNav();
    },
    navigateToProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>

<template>
  <pv-toolbar class="header h-7rem px-4 w-full">
    <!--pone los contenedores en este caso uno al final y el otro al principio con #start y #end de la toolbar-->
    <template #start>
      <div class=" flex flex-row align-items-center gap-4">
        <i class="pi pi-bars" @click="handleToggle" style="color: slateblue; font-size: 1.5rem; cursor: pointer"></i>
        <div class="flex flex-row align-items-center gap-3">
          <img class="block h-2rem w-3rem" src="../assets/logoAidManager.png" alt="logoAidManager"/>
          <div class="title-container flex flex-column justify-content-center line-height-2">
            <p class="title font-semibold " style="letter-spacing: 1px;">AidManager</p>
            <span class="text-sm" style="letter-spacing: .8px;">{{ user.role }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #end>
      <div class="flex flex-row gap-3">
        <pv-avatar aria-label="yesifoto"
                   class="w-3rem h-3rem align-self-center user-img"
                   :image="user.profileImg"
                   shape="circle"
                   @click="navigateToProfile"
                   :class="{ active: $route.path === '/profile' }"/>
        <div class="flex flex-column justify-content-center gap-1">
          <p class="font-medium user-name"
             @click="navigateToProfile"
             :class="{ active: $route.path === '/profile' }">
             {{ user.firstName + " " + user.lastName }}</p>
          <div class="flex flex-row align-items-center gap-4">
            <p class="text-sm text-green-600 font-normal">Hope Heaven</p>
            <div class="members-quantity">
              <i class="pi pi-user mr-2" style="font-size: .8rem; color: #008A66"></i><span class="text-sm">23</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </pv-toolbar>
</template>

<style scoped>

.header {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.title-container {
  margin-top: 2px;
}

.title {
  letter-spacing: 1px;
  font-size: 1rem;
}

.pi-bars {
  display: none;
}

.members-quantity span {
  color: #008A66;
}
.user-img, .user-name {
  cursor: pointer;
}
@media (max-width: 1024px) {

  .pi-bars {
    display: block;
  }
}

</style>