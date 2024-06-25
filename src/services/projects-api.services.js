import axios from 'axios';
import {environment} from "@/environment/environment.js";
const BaseUrl = environment.baseUrl + '/projects';
// Función para obtener la lista de proyectos desde la API
export async function fetchProjects(companyId) {
    try {

        const response = await axios.get(BaseUrl+`/${companyId}`);
        console.log("Datos obtenidos de la API:", response.data);
        return response.data; // Devuelve la lista de proyectos obtenidos de la API
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error; // Lanza una excepción si ocurre algún problema al obtener datos de la API
    }
}

export const addProject = async (projectData) => {
    try {
        console.log("ProjectData", projectData);
        const response = await axios.post(BaseUrl, projectData, {
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
        const response = await axios.get(BaseUrl+`/${projectId}/task-items`);

        console.log("Datos obtenidos de la API para TASKS:", response.data);
        return response.data; // Devuelve la lista de proyectos obtenidos de la API
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error; // Lanza una excepción si ocurre algún problema al obtener datos de la API
    }



}

export async function addTask(projectId, newTask) {
    try {
        // Agregar a tasks la nueva tarea
        const response = await axios.post(BaseUrl+`/${projectId}/task-items`, newTask);
        return response.data; // Devuelve los datos actualizados del proyecto
    } catch (error) {
        console.error('Error al agregar la tarea al proyecto:', error);
        throw error;
    }
}

export async function deleteTask(projectId, taskID){
    try{
        const response = await axios.delete(BaseUrl+`/${projectId}/task-items/${taskID}`);
        console.log("Task eliminada", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al Eliminar la tarea al proyecto:', error);
        throw error;
    }
}

export async function editTask(projectId, taskData){

    console.log(taskData);

    try{
        const response = await axios.put(BaseUrl+`/${projectId}/task-items`, taskData);
        console.log("Task editada", response.data);
        return response.data;
    } catch (error) {
        console.error('Error al Editar la tarea', error);
        throw error;
    }
}