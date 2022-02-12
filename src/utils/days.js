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

const getPrevMonth = (currentDate) => {
  let nextMonth = null;

  if (!currentDate) currentDate = getToday();

  if (currentDate.getMonth() === 0)
    nextMonth = new Date(currentDate.getFullYear() - 1, 11, 1);
  else
    nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

  return nextMonth;
};

const getNextMonth = (currentDate) => {
  let nextMonth = null;

  if (!currentDate) currentDate = getToday();

  if (currentDate.getMonth() === 11)
    nextMonth = new Date(currentDate.getFullYear() + 1, 0, 1);
  else
    nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

  return nextMonth;
};

const formatDate = (date, forFormInput = false) => {
  let newDate = new Date(date).toLocaleDateString();
  let [day, month, year] = newDate.split(".");
  if (day.length === 1) day = "0" + day;

  if (forFormInput) return `${year}-${month}-${day}`;
  return `${day}.${month}.${year}`;
};

const formatTime = (date) => {
  let hours = new Date(date).getHours();
  if (hours < 10) hours = "0" + hours;

  let minutes = new Date(date).getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  return `${hours}:${minutes}`;
};

const formatInterval = (date1, date2, includeSecondDate = false) => {
  const start = formatTime(date1);
  const end = formatTime(date2);
  let secondDate = "";
  if (formatDate(date1) !== formatDate(date2) && includeSecondDate) {
    secondDate = formatDate(date2);
  }

  return `${start} -${` ${secondDate}`} ${end}`;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatMonthAndYear = (date) =>
  `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

export {
  getToday,
  getTomorrow,
  getPrevMonth,
  getNextMonth,
  formatDate,
  formatTime,
  formatInterval,
  formatMonthAndYear,
};
