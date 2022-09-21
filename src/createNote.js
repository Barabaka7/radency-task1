import { BASE_URL, getCategories } from "./utilities/fetchingData.js";

const categoryMenu = document.querySelector("select");
const form = document.querySelector("form");

let CATEGORY = await getCategories();

CATEGORY.map((cat) => {
  let name = cat.categoryName;
  categoryMenu.innerHTML += `<option key=${cat.id} value="${name}" text="${name}">${name}</option>`;
});

const addNewNote = async (note) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, note);
    const newTodoItem = response.data;

    form.parentElement.innerHTML = `<h3>Added a new Note!</h3>`;
    return newTodoItem;
  } catch (errors) {
    console.error(errors);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("newNoteName");
  const text = formData.get("newNoteText");

  const categoryId =
    categoryMenu.options[categoryMenu.selectedIndex].getAttribute("key");

  const newNote = {
    noteName: name,
    creationDate: new Date(),
    category: categoryId,
    noteContent: text,
    isArchived: false,
  };
  await addNewNote(newNote);

  window.close();
};

form.addEventListener("submit", handleSubmit);
