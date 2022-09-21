import { findDates } from "./utilities/parsingDates.js";
import { getNotes, getCategories, BASE_URL } from "./utilities/fetchingData.js";

const notesBody = document.getElementById("activeNotesBody");
const statisticsBody = document.getElementById("statisticsBody");

const handleClickArchiveNoteButton = (e) => {
  let noteToArchive = e.target.parentElement.getAttribute("key");
  axios
    .patch(`${BASE_URL}/notes/${noteToArchive}`, { isArchived: true })
    .then((response) => console.log(response.data))
    .catch((err) => alert(err));
};

const handleClickDeleteNoteButton = (e) => {
  let noteToDelete = e.target.parentElement.getAttribute("key");
  axios
    .delete(`${BASE_URL}/notes/${noteToDelete}`)
    .then((response) => console.log(response.data))
    .catch((err) => alert(err));
};

const addArchiveNoteListeners = () => {
  const archiveNoteButton = document.getElementsByName("archiveNote");
  archiveNoteButton.forEach((b) =>
    b.addEventListener("click", handleClickArchiveNoteButton)
  );
};

const addDeleteNoteListeners = () => {
  const deleteNoteButton = document.getElementsByName("deleteNote");
  deleteNoteButton.forEach((b) =>
    b.addEventListener("click", handleClickDeleteNoteButton)
  );
};

const showActiveNotes = (notesArr, categories) => {
  // notesBody.innerHTML = "";
  let newRow = "";

  notesArr
    .filter((n) => !n.isArchived)
    .map((note) => {
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
  ${findDates(note.noteContent) ? findDates(note.noteContent).join(",") : ""}
  </td>
  <td><button
  class="tableButton"
  type="button"
  name="editNote"
  title="Edit this Note"
  key=${note.id}
  onClick="">
  <img class="tableHeaderIcon" src="src/img/icons8-edit-90(1).png"></button></td>
  <td><button
  class="tableButton"
  type="button"
  name="archiveNote"
  title="Archive this Note"
  onclick="handleClickArchiveNoteButton()"
  key=${
    note.id
  }><img class="tableHeaderIcon" src="src/img/icons8-archive-96(1).png"></td>
  <td><button
  class="tableButton"
  type="button"
  name="deleteNote"
  title="Delete this Note"
  onclick="handleClickDeleteNoteButton()"
  key=${
    note.id
  }><img class="tableHeaderIcon" src="src/img/icons8-delete-90(1).png"></td>
</tr>`;
      notesBody.innerHTML += newRow;
    });

  addArchiveNoteListeners();
  addDeleteNoteListeners();
};

const showStatistics = (notesArr, categories) => {
  let newRow = "";
  categories.map((category) => {
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

const main = async () => {
  showActiveNotes(await getNotes(), await getCategories());

  showStatistics(await getNotes(), await getCategories());
};

main();

const handleClickCreateNoteButton = () => {
  window.open(
    "./createNote.html",
    "popUpWindow",
    "height=300,width=600,left=200,top=200,resizable=yes,scrollbars=yes,toolbar=yes,status=yes"
  );

  // axios
  //   .post(`${BASE_URL}/NOTES`, {
  //     id: 8,
  //     noteName: "Currency Rate",
  //     // creationDate: new Date(),
  //     // category: 1,
  //     // noteContent:
  //     //   "It's quite a funny things to predict currency rate in Ukraine",
  //     // isArchived: false,
  //     // categoryName: "Srask",
  //     // categoryIcon: "src/img/icons8-task-90.png",
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
};

const handleClickArchiveAllButton = () => {
  NOTES.filter((n) => !n.isArchived).forEach((n) => (n.isArchived = true));
  showActiveNotes(NOTES);
  showStatistics(CATEGORY);
};

const handleClickDeleteAllButton = () => {
  NOTES.length = 0;
  showActiveNotes(NOTES);
  showStatistics(CATEGORY);
};

const createNoteButton = document.getElementById("createNoteButton");
const archiveAllButton = document.getElementById("archiveAll");
const deleteAllButton = document.getElementById("deleteAll");

createNoteButton.addEventListener("click", handleClickCreateNoteButton);
archiveAllButton.addEventListener("click", handleClickArchiveAllButton);
deleteAllButton.addEventListener("click", handleClickDeleteAllButton);
