<script setup>
import TieredMenu from "primevue/tieredmenu";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {ref} from "vue";
import {deleteTask, editTask} from "@/services/projects-api.services.js";
import {TaskEntity} from "@/models/task.entity.js";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  assigned: {
    type: String,
    required: true,
  },
  due: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});
const toggle = (event) => {
  menu.value.toggle(event);
};

const emits = defineEmits(['taskDel']);


const taskDel = (projectId, id) => {
  console.log(`Deleted task in project ${projectId} with id: ${id}`);
  deleteTask(projectId, id).then(() => {
    emits('taskDel');
  }).then();
  // Aquí puedes agregar la lógica para eliminar la tarea
};

const editFunc = (projectId, taskId, taskData) => {
  if (!thisTask.value.title || !thisTask.value.due || !thisTask.value.assigned) {
    alert('Por favor, ingrese el título, el asignado y la fecha.');
  } else {
    console.log(projectId, taskId, taskData);
    editTask(projectId, taskId, taskData).then(() => {
      visible.value = false;
    }).then(() => {
      emits('taskDel')
    });
  }


};

const resetTask = () => {
  thisTask.value = new TaskEntity(props.id, props.title, props.assigned, props.due, props.state);
  console.log(thisTask.value, 'se reinicio');
};

const edit = async () => {
  visible.value = true;
  // Aquí puedes agregar la lógica para editar la tarea
};


const handleMove = (destination, data) => {
  console.log(`Moved to: ${destination}`);
  data.value.status = destination
  editFunc(props.projectId, props.id, data.value)
};


const menu = ref();
const visible = ref(false);
const thisTask = ref(new TaskEntity(props.id, props.title, props.assigned, props.due, props.state));


const items = ref([{
  label: 'Delete',
  icon: 'pi pi-trash',
  command() {

    taskDel(props.projectId, props.id);
  }
},
  {
    label: 'Edit',
    icon: 'pi pi-pen-to-square',
    command() {
      console.log(thisTask.value)
      edit();
    }
  },

  {
    separator: true
  },
  {
    label: 'Move',
    icon: 'pi pi-arrow-right-arrow-left',
    items: [
      {
        label: 'To Do',
        icon: 'pi pi-clock',
        command() {
          handleMove('To-Do', thisTask)
        }
      },
      {
        label: 'Doing',
        icon: 'pi pi-wrench',
        command() {
          handleMove('Doing', thisTask)
        }
      },
      {
        label: 'Done',
        icon: 'pi pi-check',
        command() {
          handleMove('Done', thisTask)
        }
      }
    ]
  }
]);


</script>

<template>

  <div class="task-card">
    <div class="title">

      <div>
        <h3 style=" font-weight:normal;">{{ title }}</h3>
        <p>Assigned to: {{ assigned }}</p>
        <p>Due: {{ due }}</p>
      </div>
      <div class="p-button-icon">
        <Button icon="pi pi-ellipsis-h" aria-label="edit" text @click="toggle"></Button>
        <TieredMenu class="tier" ref="menu" id="overlay_tmenu" :model="items" popup/>
      </div>
    </div>

  </div>

  <Dialog modal:true class="p-dialog" v-model:visible="visible" :closeOnOutsideClick="true">
    <div style="padding: 2rem">
      <h2 class="p-dialog-title block font-semibold mb-5">Edit your Task</h2>
      <span class="p-text-secondary block mb-5">Edit your Task info.</span>

      <!-- Campos para ingresar información del nuevo proyecto -->
      <div class=" align-items-center gap-3 mb-2">
        <label for="title" class="font-semibold w-6rem">Task Title</label>
        <InputText id="title" class="flex flex-auto" placeholder="{{thisTask.title}}" autocomplete="off"
                   v-model="thisTask.title"/>
      </div>

      <div class=" align-items-center gap-3 mb-2">
        <label for="assigned" class="font-semibold w-6rem">Employee Assigned</label>
        <InputText id="assigned" class="flex flex-auto" placeholder="{{thisTask.assigned}}" autocomplete="off"
                   v-model="thisTask.assigned"/>
      </div>

      <div class=" align-items-center gap-3 mb-2">
        <label for="calendar" class="font-semibold w-6rem">Due date</label>
        <Calendar class="flex flex-auto" id="due" placeholder="{{due}}" v-model="thisTask.due" :minDate="new Date()"
                  :manualInput="false"/>

      </div>


      <!-- Botón para agregar el nuevo proyecto -->
      <div class=" justify-content-end gap-2">
        <Button label="edit" @click="editFunc(props.projectId, props.id, thisTask)" style="background-color: #02513D;"/>
      </div>
    </div>
  </Dialog>


</template>

<style scoped>
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.p-button-icon {
  padding: 1rem 0;
  margin: 1rem;
}

.task-card {
  width: 100%;
  align-items: center;
  transition: 0.3s;
}

.p-dialog {
  width: 80%;

}

</style>