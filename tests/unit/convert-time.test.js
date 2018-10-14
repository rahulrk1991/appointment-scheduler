const {convertTimeToNumbers} = require('../../javascript/index.js');

describe("Converting time to number of minutes from 9:00am", () => {
  it('converts times before 9:00am to 0', () => {
    let time = convertTimeToNumbers('08:00');
    expect(time).toBeDefined();
    expect(convertTimeToNumbers('08:00')).toBe(0);
  })

  it('converts 9:00am to 0', () => {
    let time = convertTimeToNumbers('09:00');
    expect(time).toBeDefined();
    expect(convertTimeToNumbers('09:00')).toBe(0);
  })

  it('converts 10:20am to 80', () => {
    let time = convertTimeToNumbers('10:20');
    expect(time).toBeDefined();
    expect(convertTimeToNumbers('10:20')).toBe(80);
  })

  it('converts 21:00pm to 720', () => {
    let time = convertTimeToNumbers('21:00');
    expect(time).toBeDefined();
    expect(convertTimeToNumbers('21:00')).toBe(720);
  })

  it('converts times after 9:00pm to 720', () => {
    let time = convertTimeToNumbers('22:00');
    expect(time).toBeDefined();
    expect(convertTimeToNumbers('22:00')).toBe(720);
  })
})
