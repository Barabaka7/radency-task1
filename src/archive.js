import { getNotes, getCategories, BASE_URL } from "./utilities/fetchingData.js";
import { findDates } from "./utilities/parsingDates.js";

//******** Here is a block of handling the manipulations with distinct note */

const handleClickUnarchiveNoteButton = (e) => {
  let noteToUnarchive = e.target.parentElement.getAttribute("key");
  axios
    .patch(`${BASE_URL}/notes/${noteToUnarchive}`, { isArchived: false })
    .then((response) => {
      console.log(response.data);
      document.body.dispatchEvent(new CustomEvent("notes-updated"));
    })
    .catch((err) => alert(err));
};

const handleClickDeleteNoteButton = (e) => {
  let noteToDelete = e.target.parentElement.getAttribute("key");
  axios
    .delete(`${BASE_URL}/notes/${noteToDelete}`)
    .then((response) => {
      console.log(response.data);
      document.body.dispatchEvent(new CustomEvent("notes-updated"));
    })
    .catch((err) => alert(err));
};

const addUnarchiveNoteListeners = () => {
  const unarchiveNoteButton = document.getElementsByName("unarchiveNote");
  unarchiveNoteButton.forEach((b) =>
    b.addEventListener("click", handleClickUnarchiveNoteButton)
  );
};

const addDeleteNoteListeners = () => {
  const deleteNoteButton = document.getElementsByName("deleteNote");
  deleteNoteButton.forEach((b) =>
    b.addEventListener("click", handleClickDeleteNoteButton)
  );
};

//******** **************** */

const showArchiveNotes = (notesArr, categories) => {
  let newRow = "";
  let notesBody = document.getElementById("archivedNotesBody");
  notesBody.innerHTML = "";

  notesArr
    .filter((n) => n.isArchived)
    .forEach((note) => {
      const findedDates = findDates(note.noteContent);
      newRow = `<tr class="regularRow">
  <td><img class="categoryIcon" src="${
    categories.filter((c) => c.id === Number(note.category))[0].categoryIcon
  }"></td>
  <td>${note.noteName}</td>
  <td>${new Date(note.creationDate).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}</td>
  <td>${
    categories.filter((c) => c.id === Number(note.category))[0].categoryName
  }</td>
  <td>${note.noteContent}</td>
  <td>
  ${findedDates ? findedDates.join(", ") : ""}
  </td>
  <td>
  <button
  class="tableButton"
  type="button"
  name="unarchiveNote"
  title="Unarchive this Note"
  key=${note.id}>
  <img class="tableHeaderIcon" src="src/img/icons8-unarchive-48.png">
  </button></td>
  <td>
  <button
  class="tableButton"
  type="button"
  name="deleteNote"
  title="Delete this Note"
  key=${note.id}>
  <img class="tableHeaderIcon" src="src/img/icons8-delete-90(1).png">
  </button></td>
</tr>`;
      notesBody.innerHTML += newRow;
    });

  addUnarchiveNoteListeners();
  addDeleteNoteListeners();
};

const renderArchive = async () => {
  const notes = await getNotes();
  const categories = await getCategories();
  showArchiveNotes(notes, categories);
};

const main = async () => {
  document.body.addEventListener("notes-updated", () => renderArchive());
  return renderArchive();
};

main();

const handleClicUnarchiveAllButton = async () => {
  const response = await axios.get(`${BASE_URL}/NOTES?isArchived=true`);
  const NOTES_TO_UNARCHIVE = response.data;

  NOTES_TO_UNARCHIVE.forEach((n) => {
    axios
      .patch(`${BASE_URL}/notes/${n.id}`, { isArchived: false })
      .then((response) => console.log(response.data))
      .catch((err) => alert(err));
  });
};

const handleClickDeleteAllButton = async () => {
  const response = await axios.get(`${BASE_URL}/NOTES?isArchived=true`);
  const NOTES_TO_DELETE = response.data;
  NOTES_TO_DELETE.forEach((n) => {
    axios
      .delete(`${BASE_URL}/notes/${n.id}`)
      .then((response) => console.log(response.data))
      .catch((err) => alert(err));
  });
};

const unarchiveAllButton = document.getElementById("unarchiveAll");
const deleteAllButton = document.getElementById("deleteAllArchive");

unarchiveAllButton.addEventListener("click", handleClicUnarchiveAllButton);
deleteAllButton.addEventListener("click", handleClickDeleteAllButton);
