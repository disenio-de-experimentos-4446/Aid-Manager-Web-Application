

<template>
  <section class="flex h-full flex-column p-3 lg:p-5 lg:pb-0">

    <h1 class="title">Projects</h1>
    <br>
    <h3 class="subtitle">Current Projects</h3>
    <div>
      <div class="project-cards">
        <project-card v-for="(project, index) in projects" :key="index" :name="project.name" :image="project.image" :id="project.id" />

        <div class="add-project">
          <Button label="+" class="addBut" @click="visible = true">
          </Button>
        </div>

        <Dialog class="p-dialog" v-model:visible="visible">

          <div style="padding:2rem">
            <h2 class="p-dialog-title block font-semibold mb-5">Add your project</h2>
            <span class="p-text-secondary block mb-5">Add your project info.</span>

            <div class="flex align-items-center gap-3 mb-2">
              <label for="name" class="font-semibold w-6rem">Name</label>
              <InputText id="name" class="flex-auto" autocomplete="off" v-model="newProject.title" />

            </div>

            <div class="flex align-items-center gap-3 mb-2">
              <label for="image" class="font-semibold w-6rem">Image</label>
              <InputText id="image" class="flex-auto" autocomplete="off" v-model="newProject.image" />
            </div>


            <div class="flex justify-content-end gap-2">
              <Button label="Add" @click="addProject" style="background-color: #02513D " />
            </div>
          </div>

        </Dialog>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
const visible = ref(false);

</script>

<script>
import {ref} from "vue";
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ProjectCard from './card.component.vue'; // Importa el componente de tarjeta individual


export default {

  name: 'ProjectCards.component',

  components: {
    ProjectCard,
    Button,
    Dialog,
    InputText,
  },
  data() {
    return {
      projects: [], // Arreglo para almacenar los datos de los proyectos
      newProject: { title: '', image: '' , id: ''}, // Objeto para almacenar los datos del nuevo proyecto
    };
  },
  methods: {

    getProjects(){
      fetch("http://localhost:3000/projects")
          .then(response => response.json())
          .then(data => this.projects = data)
          .catch(error => {
            console.error('Error al obtener datos de la API:', error);
          });
    },

    addProject() {
      // Validar que el título y la imagen del nuevo proyecto no estén vacíos
      if (!this.newProject.title || !this.newProject.image) {
        alert('Por favor, ingrese el título y la URL de la imagen para el nuevo proyecto.');
        return;
      }
      // Agregar el nuevo proyecto al arreglo de proyectos
      this.projects.push({ name: this.newProject.title, image: this.newProject.image });
      // Limpiar los campos del formulario
      this.newProject.title = '';
      this.newProject.image = '';
      this.newProject.id = this.projects.length + 1;
      console.log(this.newProject);

      visible.value = false;
      // Cerrar el diálogo
    }
  },
  mounted() {
    this.getProjects();
  },
};
</script>

<style scoped>
/* Estilos específicos para el componente ProjectCards */
.project-cards {
  display: flex;
  flex-wrap: wrap;
}

.add-project {
  width: 20%;
  margin: 1rem;
}
.addBut {
  border-radius: 14px;
  width: 100%;
  height: 12rem;
  object-fit: cover;
  background-color: rgba(2, 81, 61, 0.4);
  color: #02513D;
  font-size: 600%;
  font-weight: lighter;
}

@media (max-width: 768px) {
  .project-cards {
    flex-direction: column-reverse;
  }
  .add-project
  {
    width:90%
  }
  .p-dialog{
    width: 90%;
  }
}

.title{
  font-family: 'Lora',serif;
  font-size: 6vh;
  color: #02513D;
  font-weight: unset;
}

.subtitle{
  font-family: 'Lora',serif;
  font-size: 2vh;
  color: #02513D;
  font-weight: bold;
}

</style>
