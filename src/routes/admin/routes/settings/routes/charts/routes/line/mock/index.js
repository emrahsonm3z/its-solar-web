import moment from "moment";

const MOCK_DATA_COUNT = 500;

const START_DATE = moment()
  .set("minute", moment().minute() < 30 ? 30 : 60)
  .add(MOCK_DATA_COUNT * -30, "m");

const add_minutes = (dt, minutes) => {
  return new Date(dt + minutes * 60000);
};

const createMockDatas = () => {
  let mockData = [];
  let date;
  let value = 0;
  let hour = 0;
  Array.from({ length: MOCK_DATA_COUNT }).forEach((_, i) => {
    date = add_minutes(START_DATE, 30 * i);
    hour = date.getHours();

    if (hour >= 8 && hour <= 12) {
      value = Math.floor((Math.random() + 1) * 100 * (hour - 7));
    } else if (hour > 12 && hour <= 18) {
      value = Math.floor((Math.random() + 1) * 100 * (24 - (hour + 6)));
    }

    mockData.push({
      date: moment(date).format("DD/MM HH:mm"),
      today: value,
      yesterday: i > 47 ? mockData[i - 48].today : 0,
      unit: "kW"
    });
  });

  return mockData;
};

export default createMockDatas;
