import axios from 'axios';
// Función para obtener la lista de proyectos desde la API
export async function fetchProjects() {
    try {
        const response = await axios.get("http://localhost:3000/projects");

        console.log("Datos obtenidos de la API:", response.data);
        return response.data; // Devuelve la lista de proyectos obtenidos de la API
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error; // Lanza una excepción si ocurre algún problema al obtener datos de la API
    }
}

export const addProject = async (projectData) => {
    try {
        const response = await axios.post('http://localhost:3000/projects', projectData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Retorna los datos del nuevo proyecto creado
    } catch (error) {
        console.error('Error al agregar el proyecto:', error);
        throw error;
    }
};




// src/services/project-api-service.js

// Función para obtener los datos de tareas de un proyecto específico desde la API
export async function fetchTaskData(projectId) {
    try {
        const response = await axios.get(`http://localhost:3000/projects/${projectId}`);

        console.log("Datos obtenidos de la API para TASKS:", response.data);
        return response.data; // Devuelve la lista de proyectos obtenidos de la API
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error; // Lanza una excepción si ocurre algún problema al obtener datos de la API
    }



}

export async function addTask(projectId, newTask) {
    try {
        // Obtener el proyecto actual (incluyendo el arreglo de tareas)
        const project = await fetchTaskData(projectId);

        // Agregar la nueva tarea al arreglo existente de tareas del proyecto
        console.log("Project", newTask);
        project.tasks.push(newTask);

        // Actualizar el proyecto en la API con el nuevo arreglo de tareas
        const response = await axios.put(`http://localhost:3000/projects/${projectId}`, project);
        return response.data; // Devuelve los datos actualizados del proyecto
    } catch (error) {
        console.error('Error al agregar la tarea al proyecto:', error);
        throw error;
    }
}
