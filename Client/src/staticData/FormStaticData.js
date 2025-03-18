/** @format */

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const Years = [];

for (let i = currentYear; i >= currentYear - 70; i--) {
  Years.push(i);
}

const options = [
  "Full Time",
  "Part Time",
  "Self Employed",
  "Freelance",
  "Contract",
  "Internship",
  "Apprenticeship",
  "Seasonal",
];

const descriptionPlaceholder =
  "List your major duties and successess, highlighting specific projects";

const locationTypes = ["Remote", "On-site", "Hybrid"];
export { Months, Years, options, locationTypes, descriptionPlaceholder };
