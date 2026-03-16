import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export const getArchivedTasks = () => {
  return axios.get(`${API_URL}/archived`);
};

export const deleteArchivedTask = (id: number) => {
  return axios.delete(`${API_URL}/archived/${id}`);
};

export const unarchiveTask = (id: number) => {
  return axios.patch(`${API_URL}/${id}/unarchive`);
};