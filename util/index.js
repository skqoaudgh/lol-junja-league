exports.isNumber = (num) => {
  const regex = /^[0-9]$/g;
  if (regex.test(num)) {
    num = num.replace(/,/g, '');
    return isNaN(num) ? false : true;
  } else {
    return false;
  }
};
