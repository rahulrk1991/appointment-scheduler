let meetingData = [
  { id: "Meeting 1", start: 60, end: 120 },
  { id: "Meeting 2", start: 140, end: 180 },
  { id: "Meeting 3", start: 60, end: 80 },
  { id: "Meeting 4", start: 90, end: 110 },
  { id: "Meeting 5", start: 80, end: 90 }
];

document.addEventListener("DOMContentLoaded", function() {
  setTodaysDate();
  initializeTimeLine();
  buildMeetings(meetingData);
});

function setTodaysDate() {
  let todaysDate = document.getElementById("todaysDate");
  console.log(new Date());
  todaysDate.innerHTML = new Date().toString().substring(4, 15);
}

function initializeTimeLine() {
  let timeTable = document.getElementById("time-table");
  for (let i = 9; i <= 21; i++) {
    let tr = `<tr class="table-row"><td>${i} -</td></tr>`;
    timeTable.innerHTML += tr;
  }
  console.log("Loaded Timeline");
}

function compareStartTimes(a, b) {
  if (a.start < b.start) return -1;
  else if (a.start > b.start) return 1;
  else if (a.end < b.end) return -1;
  else return 1;
}

function buildMeetings(meeting) {
  meeting.sort(compareStartTimes);
  let i = 0;
  console.log(meeting);
  // return;
  while (i < meeting.length) {
    let room = [];
    console.log(i);
    room.push(meeting[i].end);
    meeting[i].room = room.length - 1;
    let max = meeting[i].end;
    let j = i;
    while (j < meeting.length - 1 && Math.max(...room) > meeting[j + 1].start) {
      let gotRoom = false;
      for (let k = 0; k < room.length; k++) {
        if (room[k] <= meeting[j + 1].start) {
          meeting[j + 1].room = k;
          room[k] = meeting[j + 1].end;
          gotRoom = true;
        }
      }
      if (!gotRoom) {
        room.push(meeting[j + 1].end);
        meeting[j + 1].room = room.length - 1;
      }
      j++;
    }
    for (let k = i; k <= j; k++) {
      meeting[k].size = room.length;
    }
    i = j + 1;

    console.log(j,room);
  }
  console.log(meeting);
  renderMeetings(meeting);
}

function renderMeetings(meetings) {
  let slots = document.getElementById("slots");
  slots.innerHTML = "";
  for (let i = 0; i < meetings.length; i++) {
    let meeting = meetings[i];
    let slot = `<div class="meeting" style="width:${600 /
      meeting.size}px;height:${(meeting.end - meeting.start) *
      2}px;margin-top:${meeting.start * 2}px;margin-left:${meeting.room *
      (600 / meeting.size)}px">${meeting.id}</div>`;
    slots.innerHTML += slot;
  }
}

function onClickAddMeeting() {
  let addFormDiv = document.getElementById("add-form");
  if (
    addFormDiv.style.visibility == "hidden" ||
    addFormDiv.style.visibility == ""
  ) {
    addFormDiv.style.visibility = "visible";
  } else {
    addFormDiv.style.visibility = "hidden";
  }
}

function convertTimeToNumbers(time) {
  let hours = parseInt(time.substring(0, 2));
  let minutes = parseInt(time.substring(3, 5));
  return (hours - 9) * 60 + minutes;
}

function submitForm() {
  let form = document.getElementById("addMeetingForm");
  let newMeeting = new Object();
  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];
    if (element.name == "start" || element.name == "end") {
      newMeeting[element.name] = convertTimeToNumbers(element.value);
    } else {
      newMeeting[element.name] = element.value;
    }
  }
  console.log(newMeeting);
  meetingData.push(newMeeting);
  buildMeetings(meetingData);
}

module.exports = convertTimeToNumbers;