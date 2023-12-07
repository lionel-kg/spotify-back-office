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
    const response = await axios.put(
      `http://localhost:4001/album/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAlbum = async id => {
  try {
    const response = await axios.delete(`http://localhost:4001/album/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
