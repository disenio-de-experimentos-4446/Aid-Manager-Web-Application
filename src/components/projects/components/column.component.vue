<script setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Task from './task.component.vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import {addTask, fetchTaskData} from '@/components/projects/components/services/projects-api.services.js';
import { TaskEntity } from '@/components/projects/models/task.entity.js';
import Dialog from 'primevue/dialog';
import  InputText  from 'primevue/inputtext';
import Calendar from "primevue/calendar";


// Variables reactivas
const state = ref({
  tasks: [],
  totalTasks: 0,
  newTask: ref(new TaskEntity()), // Inicializar con una nueva instancia de TaskEntity
});

const visible = ref(false); // Variable reactiva para controlar la visibilidad del diálogo

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  taskColumn: {
    type: String,
    required: true,
  },
});



// Función para cambiar el color dinámico
function cambiarColor(taskColumn) {
  console.log('Changing color for:', taskColumn)
  switch (taskColumn) {
    case 'To-Do':
      return '#FFDBDB';
    case 'Doing':
      return '#FFF3DB';
    case 'Done':
      return '#DBE9FF';
    default:
      return ''; // Color por defecto
  }
}

// Función para cargar las tareas desde la API
const fetchTasks = () => {
  fetchTaskData(props.id)
      .then((data) => {
        state.value.totalTasks = data.tasks.length;
        state.value.tasks = data.tasks.filter((task) => task.status === props.taskColumn);
        console.log('Tasks loaded:', state.value.tasks);

      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });
};

const createTask = async () => {
  if (!state.value.newTask.title || !state.value.newTask.assigned || !state.value.newTask.due) {
    alert('Por favor, ingrese el título, la descripción y la URL de la imagen para el nuevo proyecto.');
    return;
  }

  try {
    const TaskData = {
      id: state.value.totalTasks + 1, // Puedes generar un ID único aquí
      title: state.value.newTask.title,
      assigned: state.value.newTask.assigned,
      due: state.value.newTask.due.toISOString().split('T')[0],
      status: props.taskColumn, // Puedes inicializar con un array vacío si es necesario
    };
      console.log(TaskData);

    const addedTask = await addTask(props.id,TaskData); // Llama a la función del servicio

    // Agrega el nuevo proyecto a la lista local 'projects' con el ID generado por la API
      state.value.tasks.push({
      id: addedTask.id,
      title: addedTask.title,
      assigned: addedTask.assigned,
      due: addedTask.due,
      status: addedTask.status || [], // Puedes inicializar con un array vacío si es necesario
    });
    console.log('Nuevo proyecto agregado:', addedTask);

    // Limpiar los campos del nuevo proyecto después de guardarlo
    state.value.newTask.title = '';
    state.value.newTask.assigned = '';
    state.value.newTask.due = '';
    // Cerrar el diálogo de agregar proyecto
    reloadTasks();
    visible.value = false;
  } catch (error) {
    console.error('Error al agregar el proyecto:', error);
    alert('Hubo un error al agregar el proyecto. Por favor, revisa la consola para más detalles.');
  }
};

// Cargar las tareas una vez que el componente se monte
onMounted(() => {
  fetchTasks(); // Llamar a fetchTasks al montar el componente
});

// Función para recargar las tareas manualmente
const reloadTasks = () => {

  fetchTasks(); // Volver a cargar las tareas
};

// Función para agregar una nueva tarea
const addsTask = () => {
  console.log('Adding a new task...');
  visible.value = true; // Mostrar el diálogo al hacer clic en "Add New Task"
};
</script>

<template>

  <div class="project-card">
    <Card class="p-card vista" :style="{ backgroundColor:cambiarColor(props.taskColumn) }">
      <template #title>
        <h3 style="text-align: center; font-weight: lighter;">{{ props.taskColumn }}</h3>
      </template>
      <template #content>
        <div class="overflow">
          <Task v-for="(task, index) in state.tasks" :key="index" :title="task.title" :assigned="task.assigned" :due="task.due" />
        </div>
      </template>
      <template #footer>
        <Divider class="p-divider"></Divider>
        <br>
        <Button class="add-task" @click="addsTask">+ Add New Task</Button>
      </template>
    </Card>

    <!-- Diálogo para agregar una nueva tarea -->
    <Dialog  modal="true" class="p-dialog" v-model:visible="visible" :closeOnOutsideClick="true">
      <div style="padding: 2rem">
        <h2 class="p-dialog-title block font-semibold mb-5">Add your Task</h2>
        <span class="p-text-secondary block mb-5">Add your Task info.</span>

        <!-- Campos para ingresar información del nuevo proyecto -->
        <div class="flex align-items-center gap-3 mb-2">
          <label for="title" class="font-semibold w-6rem">Task Title</label>
          <InputText id="title" class="flex-auto" autocomplete="off" v-model="state.newTask.title" />
        </div>

        <div class="flex align-items-center gap-3 mb-2">
          <label for="assigned" class="font-semibold w-6rem">Employee Assigned</label>
          <InputText id="assigned" class="flex-auto" autocomplete="off" v-model="state.newTask.assigned" />
        </div>

        <div class="flex align-items-center gap-3 mb-2">
          <label for="calendar" class="font-semibold w-6rem">Due date</label>
          <Calendar id="due" v-model="state.newTask.due" :minDate="new Date()" :manualInput="false" />

        </div>



        <!-- Botón para agregar el nuevo proyecto -->
        <div class="flex justify-content-end gap-2">
          <Button label="Add" @click="createTask" style="background-color: #02513D;" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.p-card {
  width: 25rem;
  margin: 1rem;
  padding: 1rem;
  height: 100%;
}
.add-task {
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  color: #02513D;
  justify-content: center;
  padding: 0.5rem;
}
.overflow {
  overflow-y: auto;
  height: 46vh;
}


::-webkit-scrollbar-thumb {

  border-radius: 10px;
  opacity: 1;
  box-shadow: none;

}

::-webkit-scrollbar-thumb:hover {
  box-shadow:none;
  border-radius: 10px;
  opacity:1;
}
::-webkit-scrollbar-track {
  background-color: rgba(0, 138, 102, 0);
  box-shadow:none;
  opacity: 1;
  border-radius: 10px;

}
::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 138, 102, 0);
  opacity: 1;
  box-shadow:none;
  border-radius: 10px;

}
::-webkit-scrollbar {
  width: 0.2rem;
  opacity:1;
  box-shadow:none;
  border-radius: 10px;

}

.p-dialog{
  width: 20rem ;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #f0f0f0;
  color: #02513D;
}

</style>
