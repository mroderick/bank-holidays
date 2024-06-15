const path = require("path");
const downloadFile = require("./download-file");
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

const allSupportedCountries = [
  "AD",
  "AL",
  "AM",
  "AR",
  "AT",
  "AU",
  "AX",
  "BA",
  "BB",
  "BE",
  "BG",
  "BJ",
  "BO",
  "BR",
  "BS",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CH",
  "CL",
  "CN",
  "CO",
  "CR",
  "CU",
  "CY",
  "CZ",
  "DE",
  "DK",
  "DO",
  "EC",
  "EE",
  "EG",
  "ES",
  "FI",
  "FO",
  "FR",
  "GA",
  "GB",
  "GD",
  "GE",
  "GG",
  "GI",
  "GL",
  "GM",
  "GR",
  "GT",
  "GY",
  "HK",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IM",
  "IS",
  "IT",
  "JE",
  "JM",
  "JP",
  "KR",
  "KZ",
  "LI",
  "LS",
  "LT",
  "LU",
  "LV",
  "MA",
  "MC",
  "MD",
  "ME",
  "MG",
  "MK",
  "MN",
  "MS",
  "MT",
  "MX",
  "MZ",
  "NA",
  "NE",
  "NG",
  "NI",
  "NL",
  "NO",
  "NZ",
  "PA",
  "PE",
  "PG",
  "PL",
  "PR",
  "PT",
  "PY",
  "RO",
  "RS",
  "RU",
  "SE",
  "SG",
  "SI",
  "SJ",
  "SK",
  "SM",
  "SR",
  "SV",
  "TN",
  "TR",
  "UA",
  "US",
  "UY",
  "VA",
  "VE",
  "VN",
  "ZA",
  "ZW",
];

const allSupportedYears = [
  2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029,
];

downloadData(allSupportedCountries, allSupportedYears);
