import axios from '../config/axios';

const uploadAudio = async formData => {
  try {
    const response = await axios.post('/audio/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading audio file:', error);
    throw error;
  }
};

export const getAudiosPagination = async page => {
  try {
    const response = await axios.get('/audio/pagination?page=' + page);
    return response.data;
  } catch (error) {
    console.error('Error getting', error);
    throw error;
  }
};

export default {
  uploadAudio,
};
