const DATASET = require("../data/by-country/data.json");
const supportedYears = DATASET.supportedYears;
const verifyDateSupported = require("./verify-date-supported");
const isWeekendDay = require("./is-weekend-day");

function isBankHolidayByCountry(countryCode, isoDate) {
  const date = new Date(Date.parse(isoDate));

  verifyDateSupported(supportedYears, date);
  verifyCountrySupported(countryCode);

  if (isWeekendDay(date)) {
    return true;
  }

  return DATASET[countryCode].holidays.includes(isoDate);
}

function verifyCountrySupported(countryCode) {
  if (typeof DATASET[countryCode] === "undefined") {
    throw new Error(
      `The supplied countryCode ${countryCode} is not included in the dataset`,
    );
  }
}

module.exports = isBankHolidayByCountry;
