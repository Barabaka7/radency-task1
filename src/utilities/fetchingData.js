export const BASE_URL = "http://localhost:3000";

export const getNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/NOTES`);
    const NOTES = response.data;
    return NOTES;
  } catch (errors) {
    console.error(errors);
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/CATEGORY`);
    const CATEGORIES = response.data;
    return CATEGORIES;
  } catch (errors) {
    console.error(errors);
  }
};
