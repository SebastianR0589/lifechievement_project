import axios from "axios";
import type { Reward } from "../types/Reward";

const API_URL = "http://localhost:8080/api/rewards";

export const getRewards = async (): Promise<Reward[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createReward = async (reward: Omit<Reward, "id">): Promise<Reward> => {
  const res = await axios.post(API_URL, reward);
  return res.data;
};

export const updateReward = async (reward: Reward): Promise<Reward> => {
  const res = await axios.put(`${API_URL}/${reward.id}`, reward);
  return res.data;
};

export const deleteReward = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getArchivedRewards = () => {
 return axios.get(`${API_URL}/archived`);
 
};

export const deleteArchivedReward = async (id: number) => {
  await axios.delete(`${API_URL}/archived/${id}`);
};

export const unarchiveReward = async (id: number) => {
  const res = await axios.patch(`${API_URL}/${id}/unarchive`);
  return res.data;
};