import { NOTES, CATEGORY } from "./data.js";

let categoryMenu = document.querySelector("select");

Object.keys(CATEGORY).map((cat) => {
  let name = CATEGORY[cat].categoryName;
  categoryMenu.innerHTML += `<option id=${Number(
    cat
  )} value="${name}" text="${name}">${name}</option>`;
});
