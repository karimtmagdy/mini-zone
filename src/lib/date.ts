import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export const formatTimestamp = (date: string | Date, format: string) => {
  return dayjs(date).format(format);
};
export const formatRelativeTime = (date: Date): string => {
  return dayjs(date).fromNow();
};
export const formatFullDateTime = (date: string | Date) => {
  return dayjs(date).format("MMMM D, YYYY HH:mm:ss");
};
export const formatShortDate = (date: string | Date) => {
  return dayjs(date).format("MMM D, YYYY");
};
export const formatYear = (date: string | Date) => {
  return dayjs(date).format("YYYY");
};
export const formatMonthYear = (date: string | Date) => {
  return dayjs(date).format("MMMM YYYY");
};
export const formatDayMonth = (date: string | Date) => {
  return dayjs(date).format("MMMM D");
};
export const formatYearNumber = (date: string | Date) => {
  return dayjs(date).format("M/D/YYYY");
};
