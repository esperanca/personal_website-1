module.exports = function w3cDate(value) {
  if (value == null || value === '') return '';
  const dateObject = new Date(value);
  if (Number.isNaN(dateObject.getTime())) return '';
  return dateObject.toISOString();
};
