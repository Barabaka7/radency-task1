import { NOTES, CATEGORY } from "./data.js";
import { findDates } from "./utilities/parsingDates.js";

const showNotes = (notesArr) => {
  let newRow = "";
  let notesBody = document.getElementById("activeNotesBody");

  notesArr.forEach((note) => {
    newRow = `<tbody id="activeNotesBody">
<tr class="regularRow">
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
  <td><img class="tableHeaderIcon" src="src/img/icons8-edit-90(1).png"></td>
  <td><img class="tableHeaderIcon" src="src/img/icons8-archive-96(1).png"></td>
  <td><img class="tableHeaderIcon" src="src/img/icons8-delete-90(1).png"></td>
</tr>`;
    notesBody.innerHTML += newRow;
  });
};

showNotes(NOTES);
