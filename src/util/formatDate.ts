import moment from "moment-timezone";

export const getFileNameFromCurrentNewYorkDateTime = () => {
  let timeStamp = moment.tz(moment(), "America/New_York").format();
  return `${timeStamp.substring(0, timeStamp.length - 6)}.mp3`;
};
