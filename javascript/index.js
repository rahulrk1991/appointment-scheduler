let meetingData = [
  {
    id: "Meeting 1",
    start: 0,
    end: 30
  },
  {
    id: "Meeting 3",
    start: 60,
    end: 120
  },
  {
    id: "Meeting 4",
    start: 150,
    end: 180
  },
  {
    id: "Meeting 2",
    start: 60,
    end: 90
  }
];

document.addEventListener("DOMContentLoaded", function() {
  setTodaysDate();
  buildTimeLine();
  renderMeetings(meetingData);
});

function getTodaysDate() {
  return new Date().toString().substring(4, 15);
}

function setTodaysDate() {
  let todaysDateDiv = document.getElementById("todaysDate");
  let todaysDate = getTodaysDate();
  console.log(`Building appointment scheduler for today : ${todaysDate}`);
  todaysDateDiv.innerHTML = `Schedule - ${todaysDate}`;
}

function buildTimeLine() {
  let timeTable = document.getElementById("timeTable");
  for (let i = 9; i <= 21; i++) {
    let tr = `<tr class="table-row"><td>${i} : 00 -</td></tr>`;
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
  while (i < meeting.length) {
    let room = [];
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
  }
  console.log("Built meetings");
  return meeting;
}

function renderMeetings(meetingData) {
  let meetings = buildMeetings(meetingData);
  let slots = document.getElementById("slots");
  slots.innerHTML = "";
  for (let i = 0; i < meetings.length; i++) {
    let meeting = meetings[i];
    let slot = `<div class="meeting" style="width:${600 /
      meeting.size}px;height:${(meeting.end - meeting.start) *
      2}px;margin-top:${meeting.start * 2}px;margin-left:${meeting.room *
      (600 / meeting.size)}px;z-index:${meeting.room}"><p class="meetingName">${
      meeting.id
    }</p></div>`;
    slots.innerHTML += slot;
  }
  console.log("Rendered Meetings");
}

function convertTimeToNumbers(time) {
  let hours = parseInt(time.substring(0, 2));
  let minutes = parseInt(time.substring(3, 5));
  return (hours - 9) * 60 + minutes;
}

function isValidForm(meeting) {
  if (meeting.id == "") {
    return "Meeting name cannot be empty";
  }
  if (!meeting.id.match(/^[\w\-\s]+$/)) {
    return "Name can consist of only letters, numbers,underscore and hyphen";
  }
  if (isNaN(meeting.start) || isNaN(meeting.end)) {
    return "Start time and end time cannot be empty";
  }
  if (meeting.start > meeting.end) {
    return "End time can't be before start time";
  }
  if (meeting.start < 0 || meeting.start > 700) {
    return "Start time can't be before 9:00am or after 9:50pm";
  }
  if (meeting.end < 10 || meeting.end > 720) {
    return "End time can't be before 9:10am or after 10:00pm";
  }
  if (meeting.start + 10 > meeting.end) {
    return "Duration should be minimum of 10 minutes";
  }
  return "";
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
  let errorLabel = document.getElementById("errorLabel");
  errorLabel.innerHTML = isValidForm(newMeeting);
  if (errorLabel.innerHTML != "") {
    return;
  }
  meetingData.push(newMeeting);
  renderMeetings(meetingData);
  //Clear values from form after submit
  for (let i = 0; i < form.elements.length; i++) {
    form.elements[i].value = "";
  }
}

module.exports.meetingData = meetingData;
module.exports.compareStartTimes = compareStartTimes;
module.exports.convertTimeToNumbers = convertTimeToNumbers;
module.exports.getTodaysDate = getTodaysDate;
module.exports.buildMeetings = buildMeetings;
module.exports.isValidForm = isValidForm;
