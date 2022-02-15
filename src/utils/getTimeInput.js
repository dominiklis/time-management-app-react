export const getTimeInput = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}${hours === 0 ? "0" : ""}:${minutes}${
    minutes === 0 ? "0" : ""
  }`;
};
