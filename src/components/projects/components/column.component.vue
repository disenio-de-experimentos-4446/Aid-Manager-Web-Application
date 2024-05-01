<script>
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import Task from "./task.component.vue";

// Función para realizar una copia profunda de un objeto o array
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  props: {
    taskColumn: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Card,
    Task,
  },
  setup(props) {
    const state = ref({
      tasks: [],
      dynamicColor: "",
    });

    function cambiarColor(taskColumn) {
      switch (taskColumn) {
        case "To-Do":
          return "#FFDBDB";
        case "Doing":
          return "#FFF3DB";
        case "Done":
          return "#DBE9FF";
        default:
          return ""; // Color por defecto
      }
    }

    // Función para cargar las tareas desde la API
    function fetchTasks() {
      fetch(`http://localhost:3000/projects/${props.id}`)
          .then((response) => response.json())
          .then((data) => {
            const filteredTasks = data.tasks.filter((task) => task.status === props.taskColumn);
            state.value.tasks = deepCopy(filteredTasks); // Actualizar las tareas filtradas
            state.value.dynamicColor = cambiarColor(props.taskColumn); // Actualizar el color dinámico
          })
          .catch((error) => {
            console.error("Error al obtener datos de la API:", error);
          });
    }

    // Cargar las tareas una vez que el componente se monte
    onMounted(() => {
      fetchTasks(); // Llamar a fetchTasks al montar el componente
    });

    // Función para recargar las tareas manualmente
    function reloadTasks() {
      fetchTasks(); // Volver a cargar las tareas
    }

    return {//!!Importante para futuro, retorna el fetch para que se carge os datos
      state,
      reloadTasks,
    };
  },
};
</script>

<template>
  <div class="project-card">
    <Card class="p-card" :style="{ backgroundColor: state.dynamicColor }">
      <template #title>
        <h3 style="text-align: center; font-weight: lighter;">{{ taskColumn }}</h3>
      </template>
      <template #content>
        <Task v-for="(task, index) in state.tasks" :key="index" :title="task.title" :assigned="task.assigned" :due="task.due" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.p-card {
  width: 25rem;
  margin: 1rem;
  padding: 1rem;
  height: 69vh;
}
</style>
