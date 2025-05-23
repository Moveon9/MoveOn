import axios from 'axios';

const API_URL = 'url'; 

export const saveRunRecord = async ({
  date,
  steps,
  distance,
  run_time,
  memo,
  userId,
  calorie,
  hrate,
}) => {
  try {
    const response = await axios.post(API_URL, {
      date,
      steps,
      distance,
      run_time,
      memo,
      userId,
      calorie,
      hrate,
    });

    return response.data; // 성공 시 서버 응답 데이터 반환
  } catch (error) {
    const message =
      error.response?.data?.message || '서버 오류가 발생했습니다.';
    throw new Error(message);
  }
};
