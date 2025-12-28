import api from './api';

// Get all fish
export const getFish = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.availability) params.append('availability', filters.availability);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = `/fish${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch fish' };
  }
};

// Get single fish by ID
export const getFishById = async (id) => {
  try {
    const response = await api.get(`/fish/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch fish' };
  }
};

// Create fish (admin only)
export const createFish = async (fishData) => {
  try {
    const response = await api.post('/fish', fishData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create fish' };
  }
};

// Update fish (admin only)
export const updateFish = async (id, fishData) => {
  try {
    const response = await api.put(`/fish/${id}`, fishData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update fish' };
  }
};

// Delete fish (admin only)
export const deleteFish = async (id) => {
  try {
    const response = await api.delete(`/fish/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete fish' };
  }
};



