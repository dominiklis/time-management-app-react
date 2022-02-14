export const sortByTime =
  (desc = false) =>
  (a, b) => {
    const aDate = new Date(a.startDate);
    const bDate = new Date(b.startDate);

    if (desc) return bDate - aDate;

    return aDate - bDate;
  };

export const sortCompletionDate = (a, b) =>
  new Date(b.completedAt) - new Date(a.completedAt);
