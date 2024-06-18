<script setup>
import {ref, onMounted, watchEffect, nextTick} from 'vue';
import columnC from './column.component.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const reload = ref(false); // Propiedad reactiva para controlar la recarga de datos

// Variable reactiva para almacenar los datos del proyecto
const project = ref();

// Función para cargar los datos del proyecto
const fetchTasks = body => {
  fetch(`http://localhost:3000/projects/${props.id}`)
      .then(response => response.json(body))
      .then(data => {
        project.value = data;
        console.log('Project loaded:', project.value.tasks)
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
      });
};

const emit = defineEmits(['updAll']);

const handleUpdateAll = () => {
  emit('updAll');
  reload.value = !reload.value; // Cambiar el valor de 'reload'
  nextTick(() => {
    // Aquí, 'reload' ya debería haberse actualizado
    console.log('Reload data:', reload.value);
    fetchTasks(); // Recargar los datos después de que 'reload' se haya actualizado
  });
};


// Llamar a fetchTasks al montar el componente
onMounted(fetchTasks);

// Evento personalizado para emitir hacia el componente hijo

</script>

<template>
  <section class="flex h-full flex-column p-3 lg:p-5 lg:pb-0">
    <h1 class="title-projects text-4xl">{{ project ? project.name : '' }}</h1>
    <br>
    <h3 class="subtitle text-xl">Tasks assigned:</h3>

    <div class="column-container">
      <columnC task-column="To-Do" :id="props.id" @updAll="handleUpdateAll" :reload="reload"/>
      <columnC task-column="Doing" :id="props.id" @updAll="handleUpdateAll" :reload="reload"/>
      <columnC task-column="Done" :id="props.id" @updAll="handleUpdateAll" :reload="reload"/>
    </div>
  </section>
</template>

<style scoped>

.title-projects {
  font-family: 'Lora', serif !important;
  font-weight: 600 !important;
  letter-spacing: 1px;
  color: #02513D;
}

.title {
  font-family: 'Lora', serif;
  font-size: 6vh;
  color: #000000;
  font-weight: unset;
}

.subtitle {
  font-family: 'Lora', serif;
  color: #000000;
  font-weight: 600;
}

.column-container {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>