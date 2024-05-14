<script>
import columnC from "./column.component.vue";

export default {


  name: "Todo",
  components: {
    columnC
  },
  props: {
    id: {
      type: String,
      required: true,
    }
  },

  methods: {

    fetchTasks() {

      console.log(this.id)
      fetch("http://localhost:3000/projects/" + this.id)
          .then(response => response.json())
          .then(data => {
            this.project = data;
          })
          .catch(error => {
            console.error('Error al obtener datos de la API:', error);
          });
    },
  },
  mounted() {
    this.fetchTasks();
  },
  data() {
    return {
      project: [], // Arreglo para almacenar los datos de los proyectos
      newTask: {id: '', title: '', assigned: '', due: '', status: ''}, // Objeto para almacenar los datos del nuevo proyecto
    };
  },

};

</script>

<template>
  <section class="flex h-full flex-column p-3 lg:p-3 lg:pb-0">
    <h1 class="title text-5xl font-medium">{{ project.name }}</h1>
    <br>
    <h3 class="subtitle">Tasks</h3>
    <div class="column-container">
      <columnC task-column="To-Do" :id></columnC>
      <columnC task-column="Doing" :id></columnC>
      <columnC task-column="Done" :id></columnC>
    </div>

  </section>
</template>

<style scoped>

.title {
  font-family: 'Lora', serif;
  font-size: 6vh;
  color: #000000;
  font-weight: unset;
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 2vh;
  color: #02513D;
  font-weight: bold;
}

.column-container {
  display: flex;
  justify-content: space-around;
  margin-top: 0rem;
  margin-bottom: 2rem;
  flex-direction: row;
}

</style>