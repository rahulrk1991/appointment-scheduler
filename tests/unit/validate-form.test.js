const { isValidForm } = require("../../javascript/index.js");

describe("Form validations", () => {
  it("Start time can't be before 9:00am", () => {
    let meetingObject = { id: "Meeting_1", start: -20, end: 60 };
    expect(isValidForm(meetingObject)).toBe(
      "Start time can't be before 9:00am or after 9:50pm"
    );
  });

  it("Start time can't be after 9:50pm", () => {
    let meetingObject = { id: "Meeting_1", start: 711, end: 721 };
    expect(isValidForm(meetingObject)).toBe(
      "Start time can't be before 9:00am or after 9:50pm"
    );
  });

  it("End time can't be before 9:10am", () => {
    let meetingObject = { id: "Meeting_1", start: 0, end: 9 };
    expect(isValidForm(meetingObject)).toBe(
      "End time can't be before 9:10am or after 10:00pm"
    );
  });

  it("End time can't be after 10:00pm", () => {
    let meetingObject = { id: "Meeting_1", start: 700, end: 721 };
    expect(isValidForm(meetingObject)).toBe(
      "End time can't be before 9:10am or after 10:00pm"
    );
  });

  it("End time can't be before start time", () => {
    let meetingObject = { id: "Meeting_1", start: 60, end: 59 };
    expect(isValidForm(meetingObject)).toBe(
      "End time can't be before start time"
    );
  });

  it("Duration should be minimum of 10 minutes", () => {
    let meetingObject = { id: "Meeting_1", start: 60, end: 69 };
    expect(isValidForm(meetingObject)).toBe(
      "Duration should be minimum of 10 minutes"
    );
  });

  it("Duration should be minimum of 10 minutes", () => {
    let meetingObject = { id: "Meeting_1", start: 60, end: 61 };
    expect(isValidForm(meetingObject)).toBe(
      "Duration should be minimum of 10 minutes"
    );
  });

  it("Duration should be minimum of 10 minutes", () => {
    let meetingObject = { id: "Meeting_1", start: 700, end: 705 };
    expect(isValidForm(meetingObject)).toBe(
      "Duration should be minimum of 10 minutes"
    );
  });

  it("Meeting name should not have special characters", () => {
    let meetingObject = { id: "Meeting 1*", start: 0, end: 60 };
    expect(isValidForm(meetingObject)).toBe(
      "Name can consist of only letters, numbers,underscore and hyphen"
    );
  });

  it("Meeting name can have spaces", () => {
    let meetingObject = { id: "Meeting 1", start: 0, end: 60 };
    expect(isValidForm(meetingObject)).toBe("");
  });

  it("Meeting name can have spaces", () => {
    let meetingObject = { id: "Meeting 1", start: 0, end: 60 };
    expect(isValidForm(meetingObject)).toBe("");
  });

  it("Meeting name can have hyphen", () => {
    let meetingObject = { id: "Meeting-1", start: 0, end: 60 };
    expect(isValidForm(meetingObject)).toBe("");
  });

  it("Meeting name can have underscore", () => {
    let meetingObject = { id: "Meeting_1", start: 0, end: 60 };
    expect(isValidForm(meetingObject)).toBe("");
  });
});
