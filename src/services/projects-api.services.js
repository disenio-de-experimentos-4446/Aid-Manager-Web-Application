import axios from 'axios';
import {environment} from "@/environment/environment.js";
import {UserService} from "@/services/user.service.js";
// Función para obtener la lista de proyectos desde la API
export async function fetchProjects(companyId) {
    try {
        const userService = new UserService();
        const headers = userService.getHeadersAuthorization();
        const response = await axios.get(`${environment.baseUrl}/projects/${companyId}`, { headers });

        console.log("Datos obtenidos de la API:", response.data);
        return response.data; // Devuelve la lista de proyectos obtenidos de la API
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error; // Lanza una excepción si ocurre algún problema al obtener datos de la API
    }
}

export const addProject = async (projectData) => {
    try {
        const userService = new UserService();
        const headers = userService.getHeadersAuthorization();
        const response = await axios.post(`${environment.baseUrl}/projects`, projectData, { headers });
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
        const userService = new UserService();
        const headers = userService.getHeadersAuthorization();
        const response = await axios.get(`${environment.baseUrl}/projects/${projectId}/task-items`, { headers });

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
        console.log("task", newTask);
        if(project.tasks)
            project.tasks.push(newTask);

        const newTaskData = {
            "title": newTask.title,
            "description": "",
            "dueDate": newTask.due,
            "state": newTask.status,
            "userId": "0"
        }


        const userService = new UserService();
        const headers = userService.getHeadersAuthorization();
        // Actualizar el proyecto en la API con el nuevo arreglo de tareas
        const response = await axios.post(`${environment.baseUrl}/projects/${projectId}/task-items`, newTaskData, { headers });
        return response.data; // Devuelve los datos actualizados del proyecto
    } catch (error) {
        console.error('Error al agregar la tarea al proyecto:', error);
        throw error;
    }
}

export async function deleteTask(projectID, taskID){
    try{
        console.log("Task a eliminar" , taskID);
        //project.tasks = project.tasks.filter(task => task.id !== taskID);

        const userService = new UserService();
        const headers = userService.getHeadersAuthorization();
        const response = await axios.delete(`${environment.baseUrl}/projects/${projectID}/task-items/${taskID}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al Eliminar la tarea al proyecto:', error);
        throw error;
    }
}

export async function editTask(projectID, taskID, taskData){
    try{
        const taskBody = {
            id: taskData.id,
            title: taskData.title,
            description: "",
            dueDate: taskData.due,
            state: taskData.status,
            userId: "0"
        }

        const userService = new UserService();
        const headers = userService.getHeadersAuthorization();
        const response = await axios.put(`${environment.baseUrl}/projects/${projectID}/task-items`, taskBody, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al Editar la tarea al proyecto:', error);
        throw error;
    }
}