const NAGER_SUPPORTED_YEARS =
  require("../data/nager/supported-years.json").years;
const ECB = require("../data/ecb/data.json");

/**
 * Returns true, when a date is a bank holiday for a given currency
 *
 * @param      {string}  currencyCode  Three letter ISO 4217 currency code
 * @param      {date}    date          The date to check
 */
function isBankHolidayByCurrency(currencyCode, date) {
  verifyCurrencySupported(currencyCode);
  verifyDateSupported(currencyCode, date);

  if (isWeekendDay(date)) {
    return true;
  }

  if (currencyCode === "EUR") {
    return isECBBankHoliday(date);
  }
}

function verifyCurrencySupported(currencyCode) {
  // The currencies are the ones currently supported in Hades
  // Verifying the accuracy of the dataset against more currencies will be a time
  // consuming task and is left for future iterations
  // FIXME
  // Move supported currencies to an external file, which can be used during compilation
  // of dataset files and can be used by Kotlin client
  const SUPPORTED_CURRENCIES = ["DKK", "EUR", "NOK", "GBP", "SEK"];

  if (!SUPPORTED_CURRENCIES.includes(currencyCode)) {
    throw new Error(
      `The supplied currencyCode "${currencyCode}" is not included in the list of supported currencies: ${SUPPORTED_CURRENCIES}`,
    );
  }
}

function verifyDateSupported(currencyCode, date) {
  const year = date.getFullYear();

  if (currencyCode === "EUR" && !ECB.supportedYears.includes(year)) {
    throw new Error(
      `The supplied date ${date} is not supported in the ECB (EUR) dataset. Supported years are: ${ECB.supportedYears}`,
    );
  }

  if (!NAGER_SUPPORTED_YEARS.includes(year)) {
    throw new Error(
      `The supplied date ${date} is outside the supported range: ${NAGER_SUPPORTED_YEARS}`,
    );
  }
}

/**
 * Returns true, when the supplied date is a Sunday (0) or a Saturday (6)
 *
 * @param      {date}   date    The date
 * @return     {boolean}  True if the specified date is weekend day, False otherwise.
 */
function isWeekendDay(date) {
  const day = date.getDay();

  return day === 0 || day === 6;
}

function isECBBankHoliday(date) {
  const ISO_DATE = date.toIsoString().substr(0, 10);

  return ECB.holidays.includes(ISO_DATE);
}

module.exports = isBankHolidayByCurrency;
