<template>
  <div class="project-card">
    <Button class="img-but" @click="openTodo">
      <img :src="props.image" alt="Project Image" class="project-image" />
    </Button>
    <div class="project-name">{{ props.name }}</div>
  </div>
</template>


<script setup>
import Button from "primevue/button";
import {defineProps} from 'vue';
import router from "@/router/index.js";
const props = defineProps({

  name: {
    type: String,
        required: true,
  },
  mounted() {
    console.log("ImageLoaded: ");
  },
  components: {
    Button,
  },
  id: {
    type: Number,
        required: true,
  },
  image: {
    type: String,
        required: true,
  },

});


const openTodo = () => {
  const encodedId = props.id;
  console.log(encodedId);
  router.push({
    name: 'projectTodo',
    params: {
      id: encodedId,
    },
  });
      console.log("ImageLoaded: ", props.image);

};


</script>

<style scoped>
.project-card {
  width: 20%;
  height: 100%;
  object-fit: cover;

}

.project-card img {
  width: 100%;
  height: 12rem;
  resize: both;
}

.project-name {
  text-align: left;
  margin-top: 0.5rem;
}

.img-but {
  width: 100%;
  object-fit: cover
}

@media (max-width: 768px) {
  .project-card {
    width: 100%;
    height: auto;
  }
}

</style>