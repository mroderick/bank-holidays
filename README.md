# Hols

A library for containing all known bank/public holidays per country.

The intended use of the library, is to be able to figure out if a given day is considered bank holiday, i.e. will banks process transactions or not.

## TODO and notes

A "Public" holiday in the Nager dataset is only considered a bank holiday, when it is a "global" bank holiday. Otherwise, we assume that the central bank is open for business.

- [] Prepare one JSON file (`by-currency.json`) listing all _supported_ currencies, including EUR, like `ECB/data.json`, where there are holidays and supported years
- [] Prepare one JSON file (`by-country.json`) with all supported countries, like `ECB/data.json`, where there are holidays per country and supported years
- [] Tests of the JavaScript implementation, maybe https://node-tap.org or Mocha? Fast-check?

## Data

The country specific data in `data/` is scraped from the public website of [Nager.Date][0] (an [MIT licensed open source project][1]).

The `supported-countries.json` and `supported-years.json` are used for determining which CSV files to download from [Nager.Date][0], and should be updated maybe once a year.

The data for ECB (EUR) comes from https://www.ecb.europa.eu/ecb/contacts/working-hours/html/index.en.html, chosing the dates marked with `*` (TARGET closing day).

## Usage

### Updating datasets

```sh
node lib/download-data.js
```

[0]: https://date.nager.at/
[1]: https://github.com/nager/Nager.Date
