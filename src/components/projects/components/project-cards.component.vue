<template>
  <section class="flex h-full flex-column p-3 lg:p-5 lg:pb-0 widthsec">
    <h1 class="title">Projects</h1>
    <br>
    <h3 class="subtitle">Current Projects</h3>
<div class="all">
    <div class="project-cards">
      <!-- Mostrar proyectos con el componente CardsComponent -->
      <cards-component v-for="(project, index) in projects" :key="index" :name="project.name" :image="project.image" :id="project.id" />

      <!-- Botón para agregar un nuevo proyecto -->
      <div class="add-project">
        <Button label="+" class="addBut" @click="showAddProjectDialog" />
      </div>

      <!-- Diálogo para agregar un nuevo proyecto -->
      <Dialog modal="true" class="p-dialog" v-model:visible="visible">
        <div style="padding: 2rem">
          <h2 class="p-dialog-title block font-semibold mb-5">Add your project</h2>
          <span class="p-text-secondary block mb-5">Add your project info.</span>

          <!-- Campos para ingresar información del nuevo proyecto -->
          <div class="flex align-items-center gap-3 mb-2">
            <label for="name" class="font-semibold w-6rem">Name</label>
            <InputText id="name" class="flex-auto" autocomplete="off" v-model="newProject.name" />
          </div>

          <div class="flex align-items-center gap-3 mb-2">
            <label for="image" class="font-semibold w-6rem">Image</label>
            <InputText id="image" class="flex-auto" autocomplete="off" v-model="newProject.image" />
          </div>

          <div class="flex align-items-center gap-3 mb-2">
            <label for="description" class="font-semibold w-6rem">Description</label>
            <textarea id="description" class="flex-auto" autocomplete="off" v-model="newProject.description" rows="4" cols="50" name="description-area">descripcion...</textarea>
          </div>

          <!-- Botón para agregar el nuevo proyecto -->
          <div class="flex justify-content-end gap-2">
            <Button label="Add" @click="createProject" style="background-color: #02513D;" />
          </div>
        </div>
      </Dialog>
    </div>
</div>
  </section>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import  Button  from 'primevue/button';
import  Dialog  from 'primevue/dialog';
import  InputText  from 'primevue/inputtext';
import CardsComponent from '@/components/projects/components/card.component.vue';
import {ProjectsEntity} from "@/components/projects/models/projects.entity.js";
import {fetchProjects} from "@/components/projects/components/services/projects-api.services.js";
import {addProject} from "@/components/projects/components/services/projects-api.services.js";
// Variables reactivas
const visible = ref(false);
const projects = ref([]);
const newProject = ref({ProjectsEntity});


// Método para obtener proyectos
const getProjects = () => {
      fetchProjects()
      .then(data => {
        projects.value = data;
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
      });
};

// Método para mostrar el diálogo de agregar proyecto
const showAddProjectDialog = () => {
  visible.value = true;
};

// Método para agregar un nuevo proyecto
const createProject = async () => {
  if (!newProject.value.name || !newProject.value.image || !newProject.value.description) {
    alert('Por favor, ingrese el título, la descripción y la URL de la imagen para el nuevo proyecto.');
    return;
  }

  try {
    const projectData = {
      id: String(projects.value.length + 1), // Puedes generar un ID único aquí
      name: newProject.value.name,
      image: newProject.value.image,
      description: newProject.value.description,
      tasks: [], // Puedes inicializar con un array vacío si es necesario
      members: [] // Puedes inicializar con un array vacío si es necesario
    };


    const addedProject = await addProject(projectData); // Llama a la función del servicio

    // Agrega el nuevo proyecto a la lista local 'projects' con el ID generado por la API
    projects.value.push({
      id: addedProject.id,
      name: addedProject.name,
      image: addedProject.image,
      description: addedProject.description,
      tasks: addedProject.tasks || [], // Puedes inicializar con un array vacío si es necesario
      members: addedProject.members || [] // Puedes inicializar con un array vacío si es necesario
    });

    console.log('Nuevo proyecto agregado:', addedProject);

    // Limpiar los campos del nuevo proyecto después de guardarlo
    newProject.value.name = '';
    newProject.value.image = '';
    newProject.value.description = '';

    // Cerrar el diálogo de agregar proyecto
    visible.value = false;
  } catch (error) {
    console.error('Error al agregar el proyecto:', error);
    alert('Hubo un error al agregar el proyecto. Por favor, revisa la consola para más detalles.');
  }
};

// Obtener proyectos al montar el componente
onMounted(() => {
  getProjects();
});
</script>

<style scoped>
/* Estilos específicos para el componente ProjectCards */
.project-cards {
  display: flex;
  flex-wrap: wrap;
  height:auto;
  width: 100%;
  gap: 2rem;
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
  font-size: 6vh;
  font-weight: lighter;
}

.all{
  height: 100%;

}



@media (max-width: 768px) {


  .add-project {
    width: 90%;
  }

  .p-dialog {
    width: 90%;
  }

}

.title {
  font-family: 'Lora', serif;
  font-size: 6vh;
  color: #02513D;
  font-weight: unset;
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 2vh;
  color: #02513D;
  font-weight: bold;
}
</style>
