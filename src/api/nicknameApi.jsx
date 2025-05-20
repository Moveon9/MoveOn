// src/api/NickNameChecked.js
import axiosInstance from './axiosInstance';

export const checkNicknameQuery = async (nickname) => {
  console.log('🔍 API 호출 시작', nickname);
  try {
    const response = await axiosInstance.get(`/nickname/${encodeURIComponent(nickname)}`, {
      params: { user_nickname: nickname }
    });
    console.log('✅ API 응답 성공', response.data);
    return response.data.result;
  } catch (error) {
    console.error('❌ 닉네임 중복 확인 실패:', error.message);
    throw error;
  }
};
