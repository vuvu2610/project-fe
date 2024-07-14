import { store } from "../redux/store";

export const nameTruncated = (
  name: string | null | undefined,
  truncatedLength: number
): string => {
  if (name && name.length > truncatedLength) {
    const length = truncatedLength === 15 ? 12 : truncatedLength;
    return `${name.substring(0, length)}...`;
  }
  return name ?? "";
};

export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();
  return `${hours}:${minutesStr} ${ampm}`;
}

export function convertLocalDateTimeToDate(updated: [number, number, number, number, number, number, number]): Date {
  const [year, month, day, hours, minutes, seconds, milliseconds] = updated;
  // Month in JavaScript Date object is 0-based, so subtract 1 from month
  return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

export const getDispatch = () => store.dispatch;
