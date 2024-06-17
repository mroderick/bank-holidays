function verifyDateSupported(supportedYears, date) {
  const year = date.getFullYear();

  if (!supportedYears.includes(year)) {
    throw new Error(
      `The supplied date ${date.toISOString()} is outside the supported range: ${supportedYears}`,
    );
  }
}

module.exports = verifyDateSupported;
