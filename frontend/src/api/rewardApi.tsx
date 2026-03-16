import axios from "axios";

const API_URL = "http://localhost:8080/api/rewards";

export const getArchivedRewards = () => {
  return axios.get(`${API_URL}/archived`);
};

export const deleteArchivedReward = (id: number) => {
  return axios.delete(`${API_URL}/archived/${id}`);
};

export const unarchiveReward = (id: number) => {
  return axios.patch(`${API_URL}/${id}/unarchive`);
};