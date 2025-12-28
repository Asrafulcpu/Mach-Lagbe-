import api from './api';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create order' };
  }
};

// Get orders (for admin / user)
export const getOrders = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `/orders${query ? `?${query}` : ''}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch orders' };
  }
};

// Delete orders (clear history)
export const deleteOrders = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `/orders${query ? `?${query}` : ''}`;
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete orders' };
  }
};

// Admin: update a single order (e.g., status)
export const updateOrder = async (id, data) => {
  try {
    const response = await api.put(`/orders/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update order' };
  }
};

// Admin: delete a single order
export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete order' };
  }
};

// Optionally export more helpers in future
