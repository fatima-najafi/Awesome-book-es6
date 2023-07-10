import { DateTime } from './luxon.js';

export default function date() {
  const dt = DateTime.local();
  const formattedDate = dt.toFormat('EEE MMM dd yyyy h:mm:ss a');
  const dateTime = document.getElementById('date');
  dateTime.innerHTML = formattedDate;
}
