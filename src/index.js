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

const showStatistics = (categoryObj) => {
  let newRow = "";
  let statisiticsBody = document.getElementById("statisticsBody");

  Object.keys(categoryObj).forEach((category) => {
    console.log(typeof category);
    newRow = `<tr class="regularRow">
  <td><img class="categoryIcon" src="${CATEGORY[category].categoryIcon}"></td>
  <td>${CATEGORY[category].categoryName}</td>
  <td>
      ${
        NOTES.filter(
          (note) => note.category === Number(category) && !note.isArchived
        ).length
      }
  </td>
  <td>${
    NOTES.filter(
      (note) => note.category === Number(category) && note.isArchived
    ).length
  }</td>
</tr>`;
    statisiticsBody.innerHTML += newRow;
  });
};

showNotes(NOTES);

showStatistics(CATEGORY);
