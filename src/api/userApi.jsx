// src/api/userApi.js
import axiosInstance from './axiosInstance';

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/signin', null, {
      params: {
        nickname: userData.nickname,
        password: userData.password,
        weight: userData.weight,
        preferredTime: userData.preferredTime,
        gender: userData.gender,
      },
    });

    console.log('✅ 회원가입 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 회원가입 실패:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.get('/login', {
      params: {
        nickname: userData.nickname,
        password: userData.password,
      },
    });

    console.log('✅ 로그인 연결:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 로그인 실패:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchUserInfo = async (userId) => {
  try {
    const response = await axiosInstance.get('/user/${userId}');
    return response.data.result;
  } catch(error) {
    console.error('유저 정보 불러오기 실패:', error.message);
    throw error;
  }
}