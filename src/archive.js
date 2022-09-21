import { getNotes, getCategories } from "./utilities/fetchingData.js";
import { findDates } from "./utilities/parsingDates.js";

const showArchiveNotes = (notesArr, categories) => {
  let newRow = "";
  let notesBody = document.getElementById("archivedNotesBody");

  notesArr
    .filter((n) => n.isArchived)
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
  <td><img class="tableHeaderIcon" src="src/img/icons8-unarchive-48.png"></td>
  <td><img class="tableHeaderIcon" src="src/img/icons8-delete-90(1).png"></td>
</tr>`;
      notesBody.innerHTML += newRow;
    });
};

const archive = async () =>
  showArchiveNotes(await getNotes(), await getCategories());

archive();
