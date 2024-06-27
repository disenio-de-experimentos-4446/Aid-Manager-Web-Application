<template>
  <div class="project-card">
    <Button class="img-but" @click="openTodo()">
      <img :src="image" alt="Not a valid image" class="project-image" />
    </Button>
    <div class="project-name">{{ name }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Button from 'primevue/button';


export default defineComponent({
  name: 'CardsComponent',
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
  },
  methods: {
    openTodo() {
      const encodedId = this.id;
      const projectName = this.name;
      const projectDescription = this.description;
      console.log(encodedId, projectName, projectDescription);
      this.$router.push({
        name: 'projectTodo',
        params: {
          id: encodedId,
          },
        query:{
          name: projectName,
          description: projectDescription
        }
      });
    },
  },
});
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