const fs = require("node:fs");
const { parse } = require("csv-parse");
const { finished } = require("stream/promises");

/**
 * Reads and parses a Nager.Date CSV
 *
 * @param      {string}   filename  The filename
 * @return     {Promise}  { An array of object literals }
 */
async function processNagerDataFile(filename) {
  const records = [];
  const parser = fs.createReadStream(filename).pipe(
    parse({
      columns: true,
    }),
  );
  parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
      // Work with each record
      records.push(record);
    }
  });
  await finished(parser);
  return records;
}

async function readAndParse(countries, years) {
  const data = {
    supportedYears: years,
  };

  const promises = [];

  countries.forEach(async function (country) {
    years.forEach(async function (year) {
      const filename = `./data/nager/${country}-${year}.csv`;

      promises.push(processNagerDataFile(filename));
    });
  });

  const files = await Promise.all(promises);

  files.forEach(function (file) {
    const countryCode = file[0].CountryCode;

    if (!data[countryCode]) {
      data[countryCode] = {
        holidays: [],
      };
    }

    const dates = file
      .filter(function (holiday) {
        return (
          holiday.Global === "True" &&
          (holiday.Type.includes("Public") || holiday.Type.includes("Bank"))
        );
      })
      .map(function (holiday) {
        return holiday.Date;
      });

    data[countryCode].holidays.push(...dates);

    fs.writeFileSync("./data/by-country/data.json", JSON.stringify(data, 1, 2));
  });
}

readAndParse(["DK", "SE"], [2024, 2025]);
