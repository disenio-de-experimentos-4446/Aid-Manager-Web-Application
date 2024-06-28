<template>
  <section class="flex h-full flex-column p-3 lg:p-5 lg:pb-0 widthsec">
    <h1 class="title-projects text-4xl font-medium">Projects</h1>
    <br>
    <h3 class="subtitle font-medium mb-5">Current Projects:</h3>
    <div class="all">
      <div class="project-cards">
        <!-- Mostrar proyectos con el componente CardsComponent -->
        <cards-component v-for="(project, index) in projects" :key="index" :name="project.name" :image="project.imageUrl"
                         :id="project.id"/>

        <!-- Botón para agregar un nuevo proyecto -->
        <div class="add-project">
          <Button label="+" class="addBut" @click="showAddProjectDialog"/>
        </div>

        <!-- Diálogo para agregar un nuevo proyecto -->
        <Dialog modal class="p-dialog" v-model:visible="visible">
          <div style="padding: 2rem">
            <h2 class="p-dialog-title block font-semibold mb-5">Add your project</h2>
            <p v-if="Errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in Errors">{{ error }}</li>
              </ul>
            </p>
            <span class="p-text-secondary block mb-5">Add your project info.</span>


            <!-- Campos para ingresar información del nuevo proyecto -->
            <div class="flex align-items-center gap-3 mb-2">
              <label for="name" class="font-semibold w-6rem">Name</label>
              <InputText id="name" class="flex-auto" autocomplete="off" v-model="newProject.name"/>
            </div>

            <div class="flex align-items-center gap-3 mb-2">
              <label for="image" class="font-semibold w-6rem">Image</label>
              <InputText id="image" class="flex-auto" autocomplete="off" v-model="newProject.image"/>
            </div>

            <div class="flex align-items-center gap-3 mb-2">
              <label for="description" class="font-semibold w-6rem">Description</label>
              <textarea id="description" class="flex-auto" autocomplete="off" v-model="newProject.description" rows="4"
                        cols="50" name="description-area">descripcion...</textarea>
            </div>

            <!-- Botón para agregar el nuevo proyecto -->
            <div class="flex justify-content-end gap-2">
              <Button type="submit" label="Add" @click="checkForm" style="background-color: #02513D;"/>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  </section>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import CardsComponent from '@/components/projects/card.component.vue';
import {ProjectsEntity} from "@/models/projects.entity.js";
import {fetchProjects} from "@/services/projects-api.services.js";
import {addProject} from "@/services/projects-api.services.js";
import {AnalyticsService} from "@/services/analytics.service.js";
// Variables reactivas
const visible = ref(false);
const projects = ref([]);
const newProject = ref({ProjectsEntity});
const Errors = ref([]);

const checkForm = () =>{
  Errors.value = [];

  if (!newProject.value.name || !newProject.value.image || !newProject.value.description) {
    Errors.value.push('Fill the Form [Title, Image, Description]');
  }
  projects.value.forEach((project) => {
    if (project.name.toUpperCase() === newProject.value.name.toUpperCase()) {
      Errors.value.push('This Project Already Exists');
      console.log('The project already exists');
    }
  });
  if (Errors.value.length === 0){
    createProject();
  }
  else{
    return Errors.value;
  }

}

// Método para obtener proyectos
const getProjects = (companyId) => {
  fetchProjects(companyId)
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

  const user = ref(JSON.parse(localStorage.getItem('user')));

  try {
    const projectData = {
      name: newProject.value.name,
      description: newProject.value.description,
      imageUrl: newProject.value.image,
      companyId: user.value?.companyId
    };
    const addedProject = await addProject(projectData); // Llama a la función del servicio
    // Agrega el nuevo proyecto a la lista local 'projects' con el ID generado por la API
    projects.value.push({
      id: addedProject.id,
      name: addedProject.name,
      image: addedProject.image,
      description: addedProject.description,
    });

    function initializeArray(size) {
      return Array.from({length: size}, () => 0);
    }

    console.log(addedProject.id);
    const analyticsService = new AnalyticsService();
    const analyticsData = {
      projectId: addedProject.id,
      lines: initializeArray(24),
      payments: initializeArray(6),
      progressbar: initializeArray(6),
      status: initializeArray(5),
      tasks: initializeArray(3)
    };

    await analyticsService.createNewAnalytics(analyticsData);

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
  console.log('projects', projects)
  // get the user of local storage
  const user = JSON.parse(localStorage.getItem('user'));

  getProjects(user?.companyId);
});
</script>

<style scoped>

.title-projects {
  font-family: 'Lora', serif;
  color: #02513D;
  font-weight: 600 !important;
  letter-spacing: 1.05px;
}
/* Estilos específicos para el componente ProjectCards */
.project-cards {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: 100%;
  gap: 2rem;
}

.add-project {
  width: 20%;
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

.all {
  height: 100%;

}


@media (max-width: 768px) {


  .add-project {
    width: 100%;
  }

  .p-dialog {
    width: 90%;
  }

}

.title {
  font-family: 'Lora', serif;
  color: #02513D;
  font-weight: 600 !important;
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 2vh;
  color: #02513D;
  font-weight: bold;
}
</style>