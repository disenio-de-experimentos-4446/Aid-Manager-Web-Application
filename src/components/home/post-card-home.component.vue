<script>

import {PostApiService} from "@/services/post.service.js";

export default {
  name: "post-card-home",
  props: ['post'],
  data() {
    return {
      hasRate: false,
      value: 0,
      postApi: new PostApiService()
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    onClickRating(newRating) {

      this.hasRate = true;

      this.postApi.updatePostRating(this.post.id, this.user.id, newRating)
          .then(response => {
            console.log(response);
            this.post.rating = newRating;
          })
    }
  }
}
</script>

<template>
  <pv-card style="background-color: #F7F7F7; box-shadow: none; border-radius: 10px; overflow: hidden"
           class="shadow-2 w-full px-3 py-4">
    <template #header>
      <div class="flex flex-row gap-3 justify-content-between flex-wrap">
        <div class="flex flex-row gap-3">
          <pv-avatar aria-label="yesiJoto"
                     class="w-3rem h-3rem profile"
                     :image="post.user.profileImg"
                     shape="circle"/>
          <div class="flex flex-column justify-content-between">
            <p class="font-medium">{{ post.user.firstName + " " + post.user.lastName }}</p>
            <div class="flex flex-row align-items-center gap-4">
              <p class="text-sm text-green-600 font-normal" style="text-wrap: wrap">{{ post.user.email }}</p>
            </div>
          </div>
        </div>
        <div class="align-self-center border-round-2xl">
          <pv-rating @update:modelValue="onClickRating" v-model="post.rating" :cancel="false" :stars="5"></pv-rating>
        </div>
      </div>
    </template>
    <template #title>
      <p class="my-3 text-lg font-medium">{{ post.title }}</p>
    </template>
    <template #subtitle>
      <p class="mb-1">Dear Hope Haven Team,</p>
    </template>
    <template #content>
      <p class="post-comment line-height-3" style="text-wrap: pretty">
        {{ post.description }}
      </p>
      <div class="card-image-container mt-3 w-full">
        <div v-for="image in post.images" class="image-container">
          <img class="border-round-lg" :src="image"/>
        </div>
      </div>
    </template>
  </pv-card>
  <pv-dialog :style="{margin: '0 10px'}" :visible.sync="hasRate" :modal="true" :closable="false">
    <div class="error-modal p-5 flex flex-column align-items-center gap-5 text-center">
      <i class="text-7xl pi pi-star-fill text-yellow-500"></i>
      <h1>Rating Submitted!</h1>
      <p class="text-md">Your rating for the post has been successfully recorded</p>
      <pv-button class="py-3 px-5" label="OK" @click="hasRate = false"/>
    </div>
  </pv-dialog>
</template>

<style scoped>

.post-comment {
  letter-spacing: -.2px
}

.card-image-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

img {
  width: 100%;
  height: 200px;
}

.profile {
  object-fit: cover;
}

@media (max-width: 640px) {
  .card-image-container {
    flex-direction: column;
  }
}

</style>