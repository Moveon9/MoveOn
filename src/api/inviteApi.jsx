// src/api/inviteApi.js
import axiosInstance from './axiosInstance';

// api/inviteApi.js
import { apiClient } from './apiClient'; // 기존 API 클라이언트

export const acceptInvite = async (inviteId) => {
  try {
    const response = await apiClient.post(`/accept-invite/${inviteId}`);
    return response.data;
  } catch (error) {
    console.error('초대 수락 API 오류:', error);
    throw error;
  }
};

export const declineInvite = async (inviteId) => {
  try {
    const response = await apiClient.post(`/decline-invite/${inviteId}`);
    return response.data;
  } catch (error) {
    console.error('초대 거절 API 오류:', error);
    throw error;
  }
};

