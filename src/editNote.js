import { BASE_URL, getCategories } from "./utilities/fetchingData.js";

const noteToEditId = location.search.split("key=")[1];

const categoryMenu = document.querySelector("select");
const form = document.querySelector("form");
const name = document.getElementById("newNoteName");
const submitButton = document.getElementById("submitButton");

const populateForm = async () => {
  let CATEGORY = await getCategories();

  CATEGORY.map((cat) => {
    let name = cat.categoryName;
    categoryMenu.innerHTML += `<option key=${cat.id} value="${name}" text="${name}">${name}</option>`;
  });

  const response = await axios.get(`${BASE_URL}/NOTES/${noteToEditId}`);
  const noteToEdit = response.data;

  const cat = document.getElementById("category");
  for (let o = 0; o < cat.options.length; o++) {
    console.log(cat.options[o].attributes.key.nodeValue);
    if (
      Number(cat.options[o].attributes.key.nodeValue) ===
      Number(noteToEdit.category)
    ) {
      cat.options[o].selected = true;
      break;
    }
  }
  const text = document.getElementById("newNoteText");

  name.value = noteToEdit.noteName;
  text.value = noteToEdit.noteContent;
};

populateForm();

const updateNote = async (updatedInfo) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/notes/${noteToEditId}`,
      updatedInfo
    );
    const updatedNote = response.data;
    form.parentElement.innerHTML = `<h3>Note has been updated!</h3>`;
    return updatedNote;
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

  const updatedNote = {
    noteName: name,
    category: categoryId,
    noteContent: text,
  };
  await updateNote(updatedNote);

  window.close();
};

form.addEventListener("submit", handleSubmit);

name.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
