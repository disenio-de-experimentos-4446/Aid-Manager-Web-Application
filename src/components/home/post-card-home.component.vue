<script>
import image1 from "../../assets/post-comment-image-1.webp";
import image2 from "../../assets/post-comment-image-2.webp";
import image3 from "../../assets/post-comment-image-3.webp";
import image4 from "../../assets/post-comment-image-4.webp";
import image5 from "../../assets/post-comment-image-5.webp";
import image6 from "../../assets/post-comment-image-6.webp";
import image7 from "../../assets/post-comment-image-7.webp";
import image8 from "../../assets/post-comment-image-8.webp";
import image9 from "../../assets/post-comment-image-9.webp";
import image10 from "../../assets/post-comment-image-10.webp";

import {PostApiService} from "@/services/post.service.js";

export default {
  name: "post-card-home",
  props: ['post'],
  data() {
    return {
      hasRate: false,
      value: 0,
      postApi: new PostApiService(),
      images: [
        image1, image2, image3, image4, image5, image6, image7, image8, image9, image10
      ]
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
    },

    generateRandomImagesForPosts() {
      let selectedImages = [];
      // Set keyword it uses to store unique values
      let randomNumbers = new Set();

      while (randomNumbers.size < 3) {
        let randomNumber = Math.floor(Math.random() * 10);
        randomNumbers.add(randomNumber);
      }

      for (let randomNumber of randomNumbers) {
        let image = this.images[randomNumber];
        selectedImages.push(image);
      }

      return selectedImages;
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
      <p style="margin-bottom: 12px" class="mt-3 text-lg font-medium">{{ post.title }}</p>
    </template>
    <template #subtitle>
      <p class="mb-3 subject text-black-alpha-90 text-base font-normal"><span class="font-medium text-blue-900">Subject:</span> {{ post.subject }}</p>
      <p class="mb-1">Dear Hope Haven Team,</p>
    </template>
    <template #content>
      <p class="post-comment line-height-3" style="text-wrap: pretty">
        {{ post.description }}
      </p>
      <div class="card-image-container mt-3 w-full">
        <div class="images-post-container">
          <div v-for="image in generateRandomImagesForPosts()" class="image-container">
            <img class="border-round-lg" :src="image" alt=""/>
          </div>
        </div>
        <div class="date-container flex-1">
          <div class="flex align-items-center" style="gap: 9px">
            <i style="margin-bottom: -1.5px" class="text-2xl pi pi-clock text-green-800"></i>
            <span class="text-base date">{{ post.createdAt }}</span>
          </div>
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

.subject{
  letter-spacing: 0.2px;
}

.date {
  font-family: 'Lora', serif !important;
  font-weight: 500;
  color: gray;
}

.post-comment {
  letter-spacing: -.2px
}

.card-image-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.images-post-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card-image-container .image-container {
  display: flex;
  flex-grow: 1;
}

.date-container {
  display: flex;
  align-items: end;
  justify-content: end;
}

.card-image-container img {
  flex-grow: 1;
  width: 300px;
  min-height: 100%;
  height: 225px;
  object-fit: cover;
}

@media (min-width: 1660px) {

  .card-image-container {
    flex-direction: row;
  }

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