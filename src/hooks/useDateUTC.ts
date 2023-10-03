

const DateUTC = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const normalDate = `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
  return normalDate;
};

export default DateUTC;
