//import { NOTES, CATEGORY } from "./data.js";

const categoryMenu = document.querySelector("select");
const form = document.querySelector("form");
import { BASE_URL } from "./index.js";

let CATEGORY = await fetch(`${BASE_URL}/category`)
  .then((response) => response.json())
  .then((data) => data);

console.log(CATEGORY);

CATEGORY.map((cat) => {
  let name = CATEGORY[cat].categoryName;
  categoryMenu.innerHTML += `<option key=${Number(
    cat
  )} value="${name}" text="${name}">${name}</option>`;
});

const addNewNote = async (note) => {
  try {
    const response = await axios.post(`${BASE_URL}/notes`, note);
    const newTodoItem = response.data;
    console.log(`Added a new Note!`, note);
    return newTodoItem;
  } catch (errors) {
    console.error(errors);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("newNoteName");
  const category = formData.get("category");
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

  const submitNote = await addNewNote(newNote);
};

form.addEventListener("submit", handleSubmit);
