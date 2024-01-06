import axios from '../config/axios';

export const getAlbums = async () => {
  try {
    const response = await axios.get('/album/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAlbumById = async id => {
  try {
    const response = await axios.get(`/album/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAlbum = async (id, formData) => {
  try {
    const response = await axios.put(`/album/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAlbum = async id => {
  try {
    const response = await axios.delete(`/album/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAlbumPagination = async page => {
  try {
    const response = await axios.get('/album/pagination?page=' + page);
    return response.data;
  } catch (error) {
    console.error('Error getting', error);
    throw error;
  }
};
