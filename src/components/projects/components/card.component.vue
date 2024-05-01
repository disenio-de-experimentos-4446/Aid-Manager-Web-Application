
<template>


  <div class="project-card">
    <Button class="img-but" @click="openTodo()">
      <img :src="this.image" alt="Project Image" class="project-image" /> <!-- Aqui pones para redireccion -->
    </Button>
    <div class="project-name">{{ this.name }}</div>
  </div>





</template>

<script>
import Button from 'primevue/button';


export default {
  props: {
    name: {
      type: String,
      required: true,
    },image: {
      type: String,
      required: false,
    },id:{
      type: String,
      required: true,
    }
  },
  components: {

    Button,
  },
  methods: {

    openTodo() {

      const encodedId = this.id;
      console.log(encodedId);
      this.$router.push({
        name: 'projectTodo',  // Usamos el nombre de la ruta
        params: {
          id: encodedId  // Pasamos el valor de `this.name` como parámetro `id`
        }
      });
    },

  },


};



</script>

<style scoped>
/* Estilos específicos para el componente ProjectCards */

.img-but{
  width:100%;
  height:100%;
  border-radius: 14px;

}

.project-card {

  width: 20%;
  height: 100%;
  margin: 1rem;
}

.project-card img {
  width: 100%; /* O el ancho que desees */
  height: 12rem; /* O la altura que desees */
  object-fit: cover; /* Ajusta la imagen dentro de la caja sin distorsionarla */
}

.project-name {
  text-align: left;
  margin-top: 0.5rem;
}
</style>