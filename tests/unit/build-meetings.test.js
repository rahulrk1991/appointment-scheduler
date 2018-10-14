const { meetingData, buildMeetings } = require("../../javascript/index.js");

let meetingDataAfterBuilding = [
  {
    id: "Meeting 1",
    start: 0,
    end: 30,
    room: 0,
    size: 1
  },
  {
    id: "Meeting 2",
    start: 60,
    end: 90,
    room: 0,
    size: 2
  },
  {
    id: "Meeting 3",
    start: 60,
    end: 120,
    room: 1,
    size: 2
  },
  {
    id: "Meeting 4",
    start: 150,
    end: 180,
    room: 0,
    size: 1
  }
];

describe("Building the meeting objects", () => {
  it("Build initial meetings", () => {
    let meetingDataReturned = buildMeetings(meetingData);
    let numberOfMeetings = meetingDataReturned.length;
    for (i = 0; i < numberOfMeetings; i++) {
      expect(meetingDataReturned[i].id).toBe(meetingDataAfterBuilding[i].id);
      expect(meetingDataReturned[i].room).toBe(meetingDataAfterBuilding[i].room);
      expect(meetingDataReturned[i].size).toBe(meetingDataAfterBuilding[i].size);
    }
  });
});
