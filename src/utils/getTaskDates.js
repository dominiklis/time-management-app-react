import { validateDateString } from "./validateDateString";

export const getTaskDates = (startDate, endDate, startTime, endTime) => {
  const result = {
    startDate: null,
    endDate: null,
    startTime: false,
    endTime: false,
  };

  if (validateDateString(startDate)) {
    const [sd, st] = startDate.split("T");
    startDate = sd;
    startTime = st;
  }

  if (validateDateString(endDate)) {
    const [ed, et] = startDate.split("T");
    endDate = ed;
    endTime = et;
  }

  if (startDate || startTime) {
    result.startTime = !!startTime;
    if (!startDate) {
      startDate = new Date().toISOString().split("T")[0];
    }
    if (!startTime) startTime = "00:00";

    result.startDate = new Date(`${startDate} ${startTime}`).toISOString();
    startDate = result.startDate.split("T")[0];

    if (result.startTime && endTime && endTime !== startTime) {
      if (!endDate) {
        if (endTime > startTime) endDate = startDate;
        else {
          endDate = new Date(startDate);
          endDate.setDate(endDate.getDate() + 1);
          endDate = endDate.toISOString().split("T")[0];
        }
      }

      if (!(endDate <= startDate && startTime > endTime)) {
        result.endDate = new Date(`${endDate} ${endTime}`).toISOString();
        result.endTime = true;
      }
    }
  }

  return result;
};
