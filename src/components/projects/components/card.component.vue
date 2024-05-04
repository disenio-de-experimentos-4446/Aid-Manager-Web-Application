<template>
  <div class="project-card">
    <Button class="img-but" @click="openTodo()">
      <img :src="image" alt="Project Image" class="project-image" />
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
      console.log(encodedId);
      this.$router.push({
        name: 'projectTodo',
        params: {
          id: encodedId,
        },
      });
    },
  },
});
</script>

<style scoped>
.project-card {
  width: 20%;
  height: 100%;
  margin: 1rem;
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

.img-but{
  width:100%;
  object-fit:cover
}

</style>
