export const findDates = (note) => {
  const date =
    /(0?[1-9]|[12][0-9]|3[01])(\.|\/)(0?[1-9]|1[12])(\.|\/)[12][09][0-9][0-9]/g;

  return note.match(date);
};

// const test =
//   "Need to plan three next visits to my dentist for 19.7.2022, 2/8/2022 та 28/11/2022";

// console.log(findDates(test));
