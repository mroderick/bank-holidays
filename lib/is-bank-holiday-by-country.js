const DATASET = require("../commons/data/by-country/data.json");
const supportedYears = DATASET.supportedYears;
const getDate = require("./get-date");
const verifyDateSupported = require("./verify-date-supported");
const isWeekendDay = require("./is-weekend-day");

/**
 * Determines if date is a bank holiday by country.
 *
 * @param      {<type>}         countryCode  The country code
 * @param      {(Date|string)}  date         The date
 * @return     {boolean}        True if bank holiday by country, False otherwise.
 */
function isBankHolidayByCountry(countryCode, date) {
  const targetDate = getDate(date);
  const isoDate = targetDate.toISOString().substr(0, 10);

  verifyDateSupported(supportedYears, targetDate);
  verifyCountrySupported(countryCode);

  if (isWeekendDay(targetDate)) {
    return true;
  }

  return DATASET[countryCode].holidays.includes(date);
}

function verifyCountrySupported(countryCode) {
  if (typeof DATASET[countryCode] === "undefined") {
    throw new Error(
      `The supplied countryCode ${countryCode} is not included in the dataset`,
    );
  }
}

module.exports = isBankHolidayByCountry;
