export const convertToShortDiffByMinute = min => {
  debugger;
  const day = Math.floor(min / 1440);
  const remainingMinute = min % 1440;
  const hour = Math.floor(remainingMinute / 60);
  const minute = remainingMinute % 60;

  return {
    day,
    hour,
    minute
  };

  // return (day > 0
  //   ? `${day}${intl.formatMessage({ id: "fields.date.day.short" })} `
  //   : ""
  // )
  //   .concat(
  //     hour > 0
  //       ? `${hour}${intl.formatMessage({ id: "fields.date.hour.short" })} `
  //       : ""
  //   )
  //   .concat(
  //     minute > 0
  //       ? `${minute}${intl.formatMessage({ id: "fields.date.minute.short" })}`
  //       : ""
  //   );
};
