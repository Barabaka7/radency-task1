import { findDates } from "./utilities/parsingDates.js";
import { getNotes, getCategories, BASE_URL } from "./utilities/fetchingData.js";

const notesBody = document.getElementById("activeNotesBody");
const statisticsBody = document.getElementById("statisticsBody");

//******** Here is a block of handling the manipulations with distinct note */

const handleClickArchiveNoteButton = (e) => {
  let noteToArchive = e.target.parentElement.getAttribute("key");
  axios
    .patch(`${BASE_URL}/notes/${noteToArchive}`, { isArchived: true })
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

const handleClickEditNoteButton = (e) => {
  let noteToEdit = e.target.parentElement.getAttribute("key");

  window.open(
    `./editNote?key=${noteToEdit}`,
    "popUpWindow",
    "height=300,width=600,left=200,top=200,resizable=yes,scrollbars=yes,toolbar=yes,status=yes"
  );
};

const addArchiveNoteListeners = () => {
  const archiveNoteButton = document.getElementsByName("archiveNote");
  archiveNoteButton.forEach((b) =>
    b.addEventListener("click", handleClickArchiveNoteButton)
  );
};

const addEditNoteListeners = () => {
  const editNoteButton = document.getElementsByName("editNote");
  editNoteButton.forEach((b) =>
    b.addEventListener("click", handleClickEditNoteButton)
  );
};

const addDeleteNoteListeners = () => {
  const deleteNoteButton = document.getElementsByName("deleteNote");
  deleteNoteButton.forEach((b) =>
    b.addEventListener("click", handleClickDeleteNoteButton)
  );
};

const handleClickCreateNoteButton = () => {
  window.open(
    "./createNote",
    "popUpWindow",
    "height=300,width=600,left=200,top=200,resizable=yes,scrollbars=yes,toolbar=yes,status=yes"
  );
};

const createNoteButton = document.getElementById("createNoteButton");
const archiveAllButton = document.getElementById("archiveAll");
const deleteAllButton = document.getElementById("deleteAll");

//******** **************** */

const showActiveNotes = (notesArr, categories) => {
  notesBody.innerHTML = "";
  let newRow = "";

  notesArr
    .filter((n) => !n.isArchived)
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
  <td><button
  class="tableButton"
  type="button"
  name="editNote"
  title="Edit this Note"
  key=${note.id}>
  <img class="tableHeaderIcon" src="src/img/icons8-edit-90(1).png"></button></td>
  <td><button
  class="tableButton"
  type="button"
  name="archiveNote"
  title="Archive this Note"
  key=${
    note.id
  }><img class="tableHeaderIcon" src="src/img/icons8-archive-96(1).png"></td>
  <td><button
  class="tableButton"
  type="button"
  name="deleteNote"
  title="Delete this Note"
  key=${
    note.id
  }><img class="tableHeaderIcon" src="src/img/icons8-delete-90(1).png"></td>
</tr>`;
      notesBody.innerHTML += newRow;
    });

  addArchiveNoteListeners();
  addDeleteNoteListeners();
  addEditNoteListeners();
};

const showStatistics = (notesArr, categories) => {
  statisticsBody.innerHTML = "";
  let newRow = "";
  categories.forEach((category) => {
    newRow = `<tr class="regularRow">
  <td><img class="categoryIcon" src="${category.categoryIcon}"></td>
  <td>${category.categoryName}</td>
  <td>
      ${
        notesArr.filter(
          (note) =>
            Number(note.category) === Number(category.id) && !note.isArchived
        ).length
      }
  </td>
  <td>${
    notesArr.filter(
      (note) => Number(note.category) === Number(category.id) && note.isArchived
    ).length
  }</td>
</tr>`;
    statisticsBody.innerHTML += newRow;
  });
};

const render = async () => {
  const notes = await getNotes();
  const categories = await getCategories();
  showActiveNotes(notes, categories);
  showStatistics(notes, categories);
};

const main = async () => {
  document.body.addEventListener("notes-updated", () => render());
  return render();
};

main();

//******** Here is a block of handling the general manipulations with notes */

const handleClickArchiveAllButton = async () => {
  const response = await axios.get(`${BASE_URL}/NOTES?isArchived=false`);
  const NOTES_TO_ARCHIVE = response.data;

  NOTES_TO_ARCHIVE.forEach((n) => {
    axios
      .patch(`${BASE_URL}/notes/${n.id}`, { isArchived: true })
      .then((response) => {
        console.log(response.data);
        document.body.dispatchEvent(new CustomEvent("notes-updated"));
      })
      .catch((err) => alert(err));
  });
};

const handleClickDeleteAllButton = async () => {
  const response = await axios.get(`${BASE_URL}/NOTES?isArchived=false`);
  const NOTES_TO_DELETE = response.data;
  NOTES_TO_DELETE.forEach((n) => {
    axios
      .delete(`${BASE_URL}/notes/${n.id}`)
      .then((response) => {
        console.log(response.data);
        document.body.dispatchEvent(new CustomEvent("notes-updated"));
      })
      .catch((err) => alert(err));
  });
};

createNoteButton.addEventListener("click", handleClickCreateNoteButton);
archiveAllButton.addEventListener("click", handleClickArchiveAllButton);
deleteAllButton.addEventListener("click", handleClickDeleteAllButton);

// ******************
