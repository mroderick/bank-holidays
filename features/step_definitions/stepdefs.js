const assert = require('assert');
const { defineParameterType, Given, When, Then } = require('@cucumber/cucumber');

const isBankHolidayByCountry = require("../../lib/is-bank-holiday-by-country");

defineParameterType({
  name: "boolean",
  regexp: /true|false/,
  transformer: (s) => s === "true" ? true : false
});

Given('country code is {string}', function (countryCode) {
  this.countryCode = countryCode;
});

Given("date is {string}", function(date) {
  this.date = date
});

When("I ask whether it's a bank holiday", function () {
  this.actual = isBankHolidayByCountry(this.countryCode, this.date);
});

Then('I should be told {boolean}', function (expected) {
  assert.strictEqual(this.actual, expected);
});
