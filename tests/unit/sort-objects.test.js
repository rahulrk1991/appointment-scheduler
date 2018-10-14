const { meetingData, compareStartTimes } = require("../../javascript/index.js");

let meetingDataAfterSorting = [
  {
    id: "Meeting 1",
    start: 0,
    end: 30
  },
  {
    id: "Meeting 2",
    start: 60,
    end: 90
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
  }
];

describe("Sorting the meeting objects", () => {
  it("Sort initial meetings", () => {
    meetingData.sort(compareStartTimes);
    let numberOfMeetings = meetingData.length;
    for (i = 0; i < numberOfMeetings; i++) {
      expect(meetingData[i].id).toBe(meetingDataAfterSorting[i].id);
    }
  });
});
