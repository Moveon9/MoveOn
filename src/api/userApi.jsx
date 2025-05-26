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


export const getUserByNickname = async (nickname) => {
  try {
    const response = await axiosInstance.get(`/challnege/search/${nickname}`);
    console.log('🔍 닉네임 검색 결과:', response.data); // 추가
    return response.data.result;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn('존재하지 않는 닉네임입니다.');
    } else {
      console.error('❌ 닉네임 검색 실패:', error.response?.data || error.message);
    }
    return null;
  }
};