# Hols

A library for containing all known bank/public holidays per country.

The intended use of the data herein, is to be able to figure out if banks will process transactions on a given date.

## Usage

### Populating the `data` folder

The data is scraped from the public website of [Nager.Date][0] (an [MIT licensed open source project][1]), and is stored locally in the `data` folder.

```sh
node lib/download-data.js
```

[0]: https://date.nager.at/
[1]: https://github.com/nager/Nager.Date
