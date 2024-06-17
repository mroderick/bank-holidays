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

module.exports = isWeekendDay;
