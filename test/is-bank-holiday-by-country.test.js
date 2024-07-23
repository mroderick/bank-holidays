const { describe, it } = require("mocha");
const { assert } = require("@sinonjs/referee");

const {
  countries,
  supportedYears,
} = require("../commons/data/by-country/data.json");
const allCountryCodes = require("../commons/data/all-iso-3166-alpha-2");
const isBankHolidayByCountry = require("../lib/is-bank-holiday-by-country");

console.log("supportedYears", supportedYears);

describe("isBankHolidayByCountry", function () {
  const supportedCountries = new Set(Object.keys(countries));
  const isoDate = "2024-01-01";

  describe("unsupported countries", function () {
    const unsupportedCountries = Array.from(
      allCountryCodes.difference(supportedCountries),
    );

    unsupportedCountries.forEach((c) => {
      describe(`when called with ${c}`, function () {
        it("throws an error", function () {
          assert.exception(
            () => {
              isBankHolidayByCountry(c, isoDate);
            },
            {
              name: "Error",
              message: `The supplied countryCode ${c} is not included in the dataset`,
            },
          );
        });
      });
    });
  });

  describe("supported countries", function () {
    supportedCountries.forEach((c) => {
      describe(`when called with ${c}`, function () {
        it("returns a Boolean", function () {
          assert.isBoolean(isBankHolidayByCountry(c, isoDate));
        });
      });
    });
  });

  describe("unsupported years", function () {
    const supportedYearsSet = new Set(supportedYears);
    const first = supportedYears[0];
    const last = supportedYears[supportedYears.length - 1];
    const allYears = new Set(arrayRange(first - 10, last + 10, 1));
    const unsupportedYears = Array.from(allYears.difference(supportedYearsSet));
    const country = Object.keys(countries)[0];

    unsupportedYears.forEach((y) => {
      const isoDate = `${y}-12-31`;

      describe(`when called with ${isoDate}`, function () {
        it("throws an error", function () {
          assert.exception(
            () => {
              isBankHolidayByCountry(country, isoDate);
            },
            {
              name: "Error",
              message: `The supplied date ${isoDate}T00:00:00.000Z is outside the supported range: ${supportedYears.join()}`,
            },
          );
        });
      });
    });
  });

  describe("supported years", function () {
    supportedYears.forEach((y) => {
      const country = Object.keys(countries)[0];
      const isoDate = `${y}-12-31`;

      describe(`when called with ${isoDate}`, function () {
        it("returns a Boolean", function () {
          assert.isBoolean(isBankHolidayByCountry(country, isoDate));
        });
      });
    });
  });
});

function arrayRange(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );
}
