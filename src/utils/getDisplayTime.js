import moment from "moment";

export default function getDisplayTime(input) {
  const now = moment();
  const then = moment(input);
  const diff = moment.duration(now.diff(then)).asDays();
  if (diff < 1) {
    return then.format("H:mm");
  } else if (diff <= 7) {
    return then.format("ddd");
  }
  return then.format("MMM Mo");
}
