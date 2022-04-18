const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  var month = ("0" + (1 + dateTime.getMonth())).slice(-2);
  var day = ("0" + dateTime.getDate()).slice(-2);
  return month + "/" + day;
};

export default getTimeString;