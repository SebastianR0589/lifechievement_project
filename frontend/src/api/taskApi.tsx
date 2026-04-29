import axios from "axios";
import type { Task } from "../types/Task";

const API_URL = "http://localhost:8080/api/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await axios.put(`${API_URL}/${task.id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getArchivedTasks = () => {
 return axios.get(`${API_URL}/archived`);
 
};

export const deleteArchivedTask = async (id: number) => {
  await axios.delete(`${API_URL}/archived/${id}`);
};

export const unarchiveTask = async (id: number) => {
  const res = await axios.patch(`${API_URL}/${id}/unarchive`);
   return res.data;
};