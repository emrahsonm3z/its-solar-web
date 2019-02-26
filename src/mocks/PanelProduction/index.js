import moment from "moment";
const LOCATİONS = [
  "SALİHLİ",
  "POLATLI",
  "ATKARACALAR",
  "KURŞUNLU",
  "SİVRİHİSAR",
  "KULU"
];

const MAX_CENTRAL = 5;
const MIN_CENTRAL = 2;
const MAX_INVERTER = 6;
const MIN_INVERTER = 2;
const MAX_HOURLY = 100; // hourly production
const START_HOUR = 8;
const FINISH_HOUR = 18;
const MAX_STRINGS_COUNT = 14;
let STRINGS = [];

Array.from({ length: MAX_STRINGS_COUNT }).forEach((_, i) => {
  STRINGS.push({ id: `StringPower${i + 1}`, name: `${i + 1}.String Power` });
});

const getRandomArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createMockData = () => {
  let mockDatas = [];
  let centralCount = 0;
  let inverterCount = 0;
  let id = 1;
  let lastOneHour = 0;
  let lastTwoHour = 0;
  let workingHour = 0;
  let forToday = 0;
  let yesterdayProduction = 0; // yesterday's production quantity
  let montly = 0;
  let lastUpdated = "";
  let status = 2; // 2-running 1-slow 0-stopped
  let unit = "kWh";
  let invStrings = [];
  Array.from(LOCATİONS).forEach((loc, locIndex) => {
    centralCount = getRandomArbitrary(MIN_CENTRAL, MAX_CENTRAL);

    Array.from({ length: centralCount }).forEach((_, cenIndex) => {
      inverterCount = getRandomArbitrary(MIN_INVERTER, MAX_INVERTER);
      Array.from({ length: inverterCount }).forEach((_, invIndex) => {
        lastOneHour = // Create stopped inverter
          cenIndex === invIndex
            ? 0
            : moment().hour() > START_HOUR
              ? getRandomArbitrary(0, MAX_HOURLY)
              : 0;
        lastTwoHour =
          cenIndex === invIndex
            ? 0
            : lastOneHour +
              (moment().hour() > START_HOUR + 1
                ? getRandomArbitrary(0, MAX_HOURLY)
                : 0);

        workingHour = moment().hour() - START_HOUR;
        forToday =
          workingHour === 0
            ? 0
            : workingHour === 1
              ? lastOneHour
              : lastTwoHour +
                getRandomArbitrary(0, MAX_HOURLY) * workingHour -
                2;
        yesterdayProduction =
          getRandomArbitrary(0, MAX_HOURLY) * (FINISH_HOUR - START_HOUR);
        montly = getRandomArbitrary(
          MAX_HOURLY * (FINISH_HOUR - START_HOUR) * 15,
          MAX_HOURLY * (FINISH_HOUR - START_HOUR) * 30
        );
        status = lastTwoHour === 0 ? 0 : lastTwoHour < 100 ? 1 : 2; // 2-running 1-slow 0-stopped
        lastUpdated = moment(moment().set("m", 0)).fromNow();

        invStrings = Object.values(STRINGS).reduce((acc, curr) => {
          const stringValue = Math.random() * 3;

          acc.push({
            ...curr,
            value:
              lastTwoHour === 0
                ? 0
                : stringValue > 1
                  ? stringValue.toFixed(6)
                  : 0
          });

          return acc;
        }, []);

        mockDatas.push({
          id: id++,
          location: loc,
          centralNo: cenIndex + 1,
          inverterNo: invIndex + 1,
          progress: {
            stringsCount: invStrings.length,
            workedStrings: invStrings.filter(x => x.value > 0).length,
            strings: invStrings
          },
          status,
          lastOneHour,
          lastTwoHour,
          workingHour,
          forToday,
          yesterdayProduction,
          montly
        });
      });
    });
  });

  // console.log(JSON.stringify(mockDatas, null, 4));

  return { mockDatas, lastUpdated, unit };
};

export default createMockData;
