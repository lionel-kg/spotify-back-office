import axios from '../config/axios';

export const getArtists = async () => {
  try {
    const response = await axios.get('/artist/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArtistById = async id => {
  try {
    const response = await axios.get(`/artist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArtist = async (id, formData) => {
  try {
    const response = await axios.put(`/artist/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArtist = async id => {
  try {
    const response = await axios.delete(`/artist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
