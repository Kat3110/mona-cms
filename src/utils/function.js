// get Time start of today and end of today
export const getTimeToDay = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return [start, end];
};

export const getTimeYesterday = () => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const start = new Date();
  start.setDate(end.getDate() - 1);
  start.setHours(0, 0, 0, 0);

  return [start, end];
};

// from date-7 to date
export const getTimeOfWeek = (date = new Date()) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const start = new Date(date);
  start.setDate(start.getDate() - 7);
  start.setHours(0, 0, 0, 0);

  return [start, end];
};

// from date-30 to date
export const getTimeOfMonth = (date = new Date()) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const start = new Date(date);
  start.setDate(start.getDate() - 30);
  start.setHours(0, 0, 0, 0);

  return [start, end];
};

// from date-30*3 to date
export const getTimeOf3Month = (date = new Date()) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const start = new Date(date);
  start.setDate(end.getDate() - 30 * 3);
  start.setHours(0, 0, 0, 0);

  return [start, end];
};
