// src/api/record.js
import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_URL = 'http://54.79.175.116/api/steps';

export const saveRunRecord = async ({recordInfo, imageUri}) => {
    const formData = new FormData();
     // 1. userStepInfo JSON을 문자열로 변환 후 append
    formData.append('userStepInfo', JSON.stringify(recordInfo));

    // 2. imagefile을 multipart 형식으로 append
    formData.append('imagefile', {
        uri: imageUri, // ex: 'file:///path/to/image.png'
        name: 'map.png',
        type: 'image/png',
    });
    try {
        const response = await axiosInstance.post('/api/steps', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        return response.data;
      } catch (err) {
        const message =
          err.response?.data?.message || '서버 오류가 발생했습니다.';
        throw new Error(message);
      }
};

export const fetchRunRecords = async ({ date, userId }) => {
  try {
    const response = await axiosInstance.get('/api/steps/list', {
      params: {
        date,
        userId,
      },
    });
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || '기록 불러오기 실패';
    throw new Error(message);
  }
};