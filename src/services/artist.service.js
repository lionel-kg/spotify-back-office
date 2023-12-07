import axios from '../config/axios';

export const getArtists = async () => {
  try {
    const response = await axios.get('http://localhost:4001/artist/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArtistById = async id => {
  try {
    const response = await axios.get(`http://localhost:4001/artist/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArtist = async (id, formData) => {
  try {
    const response = await axios.put(
      `http://localhost:4001/artist/${id}`,
      formData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArtist = async id => {
  try {
    const response = await axios.delete(`http://localhost:4001/artist/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
