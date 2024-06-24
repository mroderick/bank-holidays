const isBankHolidayByCountry = require("./lib/is-bank-holiday-by-country");
const isBankHolidayByCurrency = require("./lib/is-bank-holiday-by-country");

const isHolsByCountry = isBankHolidayByCountry("DK", "2024-12-24");
const isHolsByCurrency = isBankHolidayByCurrency("DKK", "2024-12-24");

console.log(isHolsByCountry, isHolsByCurrency);
