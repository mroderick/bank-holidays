const path = require("path");
const downloadFile = require("./download-file");
const supportedCountries = require("../data/supported-countries.json").countries;
const supportedYears = require("../data/supported-years").years;

// eslint-disable-next-line no-undef -- `__dirname` is allowed in CommonJS
const currentFolder = __dirname;

function downloadData(countries, years) {
  countries.forEach(function (country) {
    years.forEach(async function (year) {
      const url = csvUrl(country, year);
      const folder = path.normalize(`${currentFolder}/../data`);
      const filename = `${country}-${year}.csv`;

      console.log(`downloading: ${filename}`);
      await downloadFile(url, folder, filename);
      await sleep(1000);
    });
  });
}

function csvUrl(country, year) {
  const BASE_URL = "https://date.nager.at/PublicHoliday/Country";

  return `${BASE_URL}/${country}/${year}/CSV`;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

downloadData(supportedCountries, supportedYears);
