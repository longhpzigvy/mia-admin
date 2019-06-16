import axios from 'axios';

export const getUserProfile = id => axios
  .get(`users/profile/${id}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const updateUserProfile = (id, data) => axios
  .put(`users/profile/${id}`, { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const addAddress = data => axios
  .post('users/address', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const setDefaultAddress = data => axios
  .put('users/address/set-default', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const editAddress = data => axios
  .put('users/address/edit', { data })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const deleteAddress = index => axios
  .delete(`users/address/${index}`)
  .then(response => ({ response }))
  .catch(error => ({ error }));
