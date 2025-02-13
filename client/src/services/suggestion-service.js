import axios from "axios";

const baseUrl = "/api/suggestions";

export const getAll = async (searchParams) => {
  searchParams = searchParams || {};
  try {
    const response = await axios.get(baseUrl, {
      params: searchParams,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const post = async (suggestion) => {
  const response = await axios.post(baseUrl, suggestion);
  return response.data;
};

export const update = async (suggestion) => {
  const response = await axios.put(`${baseUrl}/${suggestion.id}`, suggestion);
  return response.data;
};
