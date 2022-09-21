export let NOTES = [
  {
    noteId: 1,
    noteName: "Arsenal Season Start",
    creationDate: "2022-08-22T19:10:00Z",
    category: 1,
    noteContent:
      "It should be good idea to get another middlefield because of high risk of new Thomas Party injury",
    isArchived: false,
  },
  {
    noteId: 2,
    noteName: "Main principle behind 4 houses of Hogwarts ",
    creationDate: "2022-01-11T06:23:09Z",
    category: 1,
    noteContent:
      "It seems to me that 4 types of temperament is the main idea behind four different houses of Hogwarts",
    isArchived: false,
  },
  {
    noteId: 3,
    noteName: "Winter Tyres",
    creationDate: "2022-09-05T16:10:00Z",
    category: 2,
    noteContent: "Don't forget to buy new winter Bridgestone Tyres",
    isArchived: true,
  },
  {
    noteId: 4,
    noteName: "Rescheduling of my visit to dentist",
    creationDate: "2022-07-12T18:02:00Z",
    category: 2,
    noteContent:
      "Need to plan three next visits to my dentist for 19/7/2022, 2/8/2022 та 28/11/2022",
    isArchived: false,
  },
  {
    noteId: 5,
    noteName: "Make Donate for Pritula Foundation",
    creationDate: "2022-02-25T12:02:00Z",
    category: 2,
    noteContent: "Russian Warship go fuck yourself",
    isArchived: true,
  },
  {
    noteId: 6,
    noteName: "Surf Thought 1",
    creationDate: "2022-01-01T12:00:00Z",
    category: 3,
    noteContent:
      "Ocean surf is good metaphore for usual life: you had to paddle 98% of time to have 2% enjoinhg of riding the wave",
    isArchived: false,
  },
  {
    noteId: 7,
    noteName: "Croissant Rates",
    creationDate: "2022-09-02T10:30:00Z",
    category: 3,
    noteContent: "1) Zavertailo; 2) Etre Sophie",
    isArchived: false,
  },
];

export const CATEGORY = {
  1: {
    categoryName: "Idea",
    categoryIcon: "src/img/icons8-idea-96.png",
  },
  2: {
    categoryName: "Task",
    categoryIcon: "src/img/icons8-task-90.png",
  },
  3: {
    categoryName: "Random Thought",
    categoryIcon: "src/img/icons8-thinking-male-90.png",
  },
};

// console.log(
//   NOTES.filter((note) => note.category <= 3 && !note.isArchived).length
// );

let q = NOTES.filter((a) => a.noteId <= 2);
//(n) => {
//   console.log(n.noteName);
//   n.noteName === "Arsenal Season Start";
// });
console.log(q);
