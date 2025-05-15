<script setup>
import {ref, onMounted, watch, watchEffect} from 'vue';
import Card from 'primevue/card';
import Task from './task.component.vue';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import {addTask, fetchTaskData} from '@/services/projects-api.services.js';
import {TaskEntity} from '@/models/task.entity.js';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from "primevue/calendar";


// Variables reactivas
const state = ref({
  tasks: [],
  totalTasks: 0,
  newTask: ref(new TaskEntity()),
  reload: false,
  // Inicializar con una nueva instancia de TaskEntity
});

const visible = ref(false); // Variable reactiva para controlar la visibilidad del diálogo

const emits = defineEmits(['updAll']);


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  taskColumn: {
    type: String,
    required: true,
  },
  reload: {
    type: Boolean,
    required: true,
  },
});


// Función para cambiar el color dinámico
function cambiarColor(taskColumn) {
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
        if(data && data.length > 0) {
          state.value.totalTasks = data.length;

          state.value.tasks = data.filter((task) => task.state === props.taskColumn);
          console.log(state.value.tasks)
        }

      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });
};

const createTask = async () => {
  if (!state.value.newTask.title || !state.value.newTask.assignedID || !state.value.newTask.due) {
    alert('Por favor, ingrese el título, la descripción y la URL de la imagen para el nuevo proyecto.');
    return;
  }

  try {
    const TaskData = {
      title: state.value.newTask.title,
      description: state.value.newTask.description,
      assigned: state.value.newTask.assignedID,
      due: state.value.newTask.due.toISOString().split('T')[0],
      state: props.taskColumn, // Puedes inicializar con un array vacío si es necesario
    };
    await addTask(props.id, TaskData).then(fetchTasks); // Llama a la función del servicio

    // Agrega el nuevo proyecto a la lista local 'projects' con el ID generado por la API


    // Limpiar los campos del nuevo proyecto después de guardarlo
    state.value.newTask.title = '';
    state.value.newTask.assigned = 0;
    state.value.newTask.due = '';
    // Cerrar el diálogo de agregar proyecto
    reloadTasks();
    visible.value = false;
  } catch (error) {
    console.error('Error al agregar el proyecto:', error.response.data);
    alert('error al agregar el proyecto:' + error.response.data);
  }
};

// Cargar las tareas una vez que el componente se monte
onMounted(() => {
  fetchTasks();

// Llamar a fetchTasks al montar el componente
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

watch(() => props.reload, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    fetchTasks();
  }
});
// Manejar el evento emitido por columnC
const taskDel = () => {
  emits('updAll');
  console.log('Sends the update ALL');
  fetchTasks();

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
          <Task v-for="(task, index) in state.tasks" :key="index" :title="task.title" :description="task.description" :assigned="task.assigneeName" :assignedID="task.assigneeId"
                :due="task.dueDate" :id="task.id" :projectId="props.id" @taskDel="taskDel" :state="props.taskColumn"/>
        </div>
      </template>
      <template #footer>
        <Divider class="p-divider"></Divider>
        <br>
        <Button class="add-task" @click="addsTask">+ Add New Task</Button>
      </template>
    </Card>

    <!-- Diálogo para agregar una nueva tarea -->
    <Dialog modal:true class="p-dialog" v-model:visible="visible" :closeOnOutsideClick="true">
      <div style="padding: 2rem; display:flex; flex-direction:column; align-items:flex-start; justify-content:center">
        <h2 class="p-dialog-title block font-semibold ">Add your Task</h2>
        <span class="p-text-secondary block ">Add your Task info.</span>

        <!-- Campos para ingresar información del nuevo proyecto -->
        <div class=" justify-content-around">
          <label for="title" class="font-semibold w-6rem mb-2">Task Title</label>
          <InputText id="title" class="flex flex-auto" autocomplete="off" v-model="state.newTask.title"/>
        </div>

        <div class=" justify-content-around">
          <label for="description" class="font-semibold w-6rem mb-2">Task Description</label>
          <InputText id="description" class="flex flex-auto" autocomplete="off" v-model="state.newTask.description"/>
        </div>

        <div class="  justify-content-around ">
          <label for="assigned" class="font-semibold w-6rem mb-2">Employee Assigned</label>
          <InputNumber id="assigned" class="flex flex-auto" autocomplete="off" v-model="state.newTask.assignedID"/>
        </div>

        <div class="  justify-content-around mb-2 ">
          <label for="calendar" class="flex font-semibold w-6rem">Due date</label>
          <Calendar id="due" v-model="state.newTask.due" :minDate="new Date()" :manualInput="false"/>

        </div>


        <!-- Botón para agregar el nuevo proyecto -->
        <div class=" justify-content-end gap-2">
          <Button label="Add" @click="createTask" style="background-color: #02513D;"/>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.p-card {
  width: 100%;
  padding: 1rem;
  height: 100%;
}

.add-task {
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  color: #02513D;
  justify-content: center;
}

.overflow {
  overflow-y: auto;
  height: 46vh;
}

.p-dialog {
  width: 80%;
}

.project-card {
  width: 30%;
}


@media (max-width: 1028px) {


  .project-card {
    width: 100%;
    height: auto;
  }

}

::-webkit-scrollbar-thumb {

  border-radius: 10px;
  opacity: 1;
  box-shadow: none;

}

::-webkit-scrollbar-thumb:hover {
  box-shadow: none;
  border-radius: 10px;
  opacity: 1;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 138, 102, 0);
  box-shadow: none;
  opacity: 1;
  border-radius: 10px;

}

::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 138, 102, 0);
  opacity: 1;
  box-shadow: none;
  border-radius: 10px;

}

::-webkit-scrollbar {
  width: 0.2rem;
  opacity: 1;
  box-shadow: none;
  border-radius: 10px;

}

.p-dialog {
  width: 20rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #f0f0f0;
  color: #02513D;
}

</style>