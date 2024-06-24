function getDate(date) {
  if (date instanceof Date) {
    return date;
  }

  const targetDate = new Date(Date.parse(date));

  if (targetDate.toString() === "Invalid Date") {
    throw new TypeError("The date argument is invalid");
  }

  return targetDate;
}

module.exports = getDate;
