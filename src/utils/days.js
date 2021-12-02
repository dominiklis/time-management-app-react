const getToday = () => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
};

const getTomorrow = () => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  const tomorrow = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};

const formatDate = (date) => {
  let newDate = new Date(date).toLocaleDateString();
  let [day, month, year] = newDate.split(".");
  if (day.length === 1) day = "0" + day;
  return `${day}.${month}.${year}`;
};

const formatTime = (date) => {
  let hours = new Date(date).getHours();
  if (hours < 9) hours = "0" + hours;

  let minutes = new Date(date).getMinutes();
  if (minutes < 9) minutes = "0" + minutes;

  return `${hours}:${minutes}`;
};

const formatInterval = (date1, date2) => {
  const start = formatTime(date1);
  const end = formatTime(date2);

  return `${start} - ${end}`;
};

export { getToday, getTomorrow, formatDate, formatTime, formatInterval };
