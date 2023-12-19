import axios from '../config/axios';

export const getStat = async () => {
  const response = await axios.get('/stat');
  return response.data;
};
