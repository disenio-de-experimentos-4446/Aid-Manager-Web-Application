<script>
import Button from "primevue/button";
import TieredMenu from 'primevue/tieredmenu';
import { ref } from "vue";



export default {
  components: {
    TieredMenu,
    Button,
  },
  props: {
    title: {
      type: String,
      required: true,
    },assigned: {
      type: String,
      required: false,
    },
    due:{
      type: String,
      required: false,
    },
  },



};


</script>

<script setup>

const toggle = (event) => {
  menu.value.toggle(event);
};

const deleteTask = (id) => {
  console.log(`Deleted task with id: ${id}`);
  // Aquí puedes agregar la lógica para eliminar la tarea
};

const edit = (id) =>
{
  console.log(`Edit task with id: ${id}`);
  // Aquí puedes agregar la lógica para editar la tarea
};


const handleMove = (destination) => {
  console.log(`Moved to: ${destination}`);
  // Aquí puedes agregar la lógica para mover el card a la sección seleccionada
};
const menu = ref();

const items = ref([{
  label: 'Delete',
  icon: 'pi pi-trash',
  command ()  {
    deleteTask('this.task.id');
  }
},
  {
    label: 'Edit',
    icon: 'pi pi-pen-to-square',
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
        command(){
          handleMove('To Do')
        }
      },
      {
        label: 'Doing',
        icon: 'pi pi-wrench',
        command(){
          handleMove('Doing')
        }
      },
      {
        label: 'Done',
        icon: 'pi pi-check',
        command(){
          handleMove('Done')
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
        <p>Assigned to: {{assigned}}</p>
        <p>Due: {{due}}</p>
      </div>
      <div class="p-button-icon">
        <Button icon = "pi pi-ellipsis-h" aria-label="edit" text @click="toggle"></Button>
        <TieredMenu class="tier" ref="menu" id="overlay_tmenu" :model="items" popup/>
      </div>
    </div>

  </div>

</template>

<style scoped>
.title{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.p-button-icon{
  padding:1rem 0;
  margin: 1rem;
}

</style>