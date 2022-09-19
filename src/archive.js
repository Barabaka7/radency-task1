import { NOTES, CATEGORY } from "./data.js";
import { findDates } from "./utilities/parsingDates.js";

const showArchiveNotes = (notesArr) => {
  let newRow = "";
  let notesBody = document.getElementById("archivedNotesBody");

  notesArr
    .filter((n) => n.isArchived)
    .forEach((note) => {
      newRow = `<tr class="regularRow">
  <td><img class="categoryIcon" src="${
    CATEGORY[note.category].categoryIcon
  }"></td>
  <td>${note.noteName}</td>
  <td>${new Date(note.creationDate).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}</td>
  <td>${CATEGORY[note.category].categoryName}</td>
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

showArchiveNotes(NOTES);
