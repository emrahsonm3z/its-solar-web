/* eslint no-nested-ternary: "off" */
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
const STRINGS = [];

Array.from({ length: MAX_STRINGS_COUNT }).forEach((_, i) => {
  STRINGS.push({ id: `StringPower${i + 1}`, name: `${i + 1}.String Power` });
});

const getRandomArbitrary = (min, max) => {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
};

const createMockData = () => {
  const mockDatas = [];
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
  const unit = "kWh";
  let invStrings = [];
  Array.from(LOCATİONS).forEach(loc => {
    centralCount = getRandomArbitrary(MIN_CENTRAL, MAX_CENTRAL);

    Array.from({ length: centralCount }).forEach((a, cenIndex) => {
      inverterCount = getRandomArbitrary(MIN_INVERTER, MAX_INVERTER);
      Array.from({ length: inverterCount }).forEach((b, invIndex) => {
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

        id += 1;
        mockDatas.push({
          id,
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

const createInverters = () => {
  const Inverters = [];
  let centralCount = 0;
  let inverterCount = 0;
  let id = 1;
  let invStrings = [];
  Array.from(LOCATİONS).forEach(loc => {
    centralCount = getRandomArbitrary(MIN_CENTRAL, MAX_CENTRAL);

    Array.from({ length: centralCount }).forEach((a, cenIndex) => {
      inverterCount = getRandomArbitrary(MIN_INVERTER, MAX_INVERTER);

      Array.from({ length: inverterCount }).forEach((b, invIndex) => {
        invStrings = Object.values(STRINGS).reduce((acc, curr) => {
          const stringValue = (Math.random() * 3) / 2;

          acc.push({
            ...curr,
            value: stringValue > 0.5 ? stringValue.toFixed(6) : 0
          });

          return acc;
        }, []);

        id += 1;
        Inverters.push({
          id,
          location: loc,
          centralNo: cenIndex + 1,
          inverterNo: invIndex + 1,
          progress: {
            stringsCount: invStrings.length,
            workedStrings: invStrings.filter(x => x.value > 0).length,
            strings: invStrings
          },
          production: []
        });
      });
    });
  });

  return Inverters;
};

const createInverterProduction = date => {
  const currentHour = date.hour();
  let production = 0;

  if (START_HOUR < currentHour && currentHour < 12) {
    production = getRandomArbitrary(0, MAX_HOURLY - 20);
  } else if (currentHour >= 12 && currentHour < 15) {
    production = getRandomArbitrary(MAX_HOURLY - 20, MAX_HOURLY);
  } else if (currentHour >= 15 && currentHour <= FINISH_HOUR) {
    production = getRandomArbitrary(0, MAX_HOURLY - 20);
  }

  const inverterProduction = {
    production,
    createdon: date
  };

  return inverterProduction;
};

// Production until yesterday
const createProductionUntilYesterday = () => {
  let production = {};
  let productionDate;
  let productionList = [];

  for (let day = 1; day < moment().date(); day += 1) {
    for (let hour = START_HOUR + 1; hour <= FINISH_HOUR; hour += 1) {
      productionDate = moment()
        .date(day)
        .hour(hour)
        .minute(0)
        .second(0);
      production = createInverterProduction(productionDate);

      productionList.push(production);
    }
  }

  return productionList;
};

const summary = inverters => {
  // console.log(JSON.stringify(inverters[0], null, 2));
  // status,
  // lastOneHour,
  // lastTwoHour,
  // workingHour,
  // forToday,
  // yesterdayProduction,
  // montly
  let invertersSummary = [];
  inverters.reduce((acc, curr, index) => {
    // if (index === 0) debugger;
    const { production, ...args } = curr;
    let summary = args;

    const maxDate = moment.max(production.map(prod => prod.createdon));

    console.log(maxDate.toString());

    const lastOneHourRecord = production.filter(
      prod => maxDate.diff(prod.createdon, "hours") === 0
    );
    summary.lastOneHour =
      lastOneHourRecord.length > 0 ? lastOneHourRecord[0].production : 0;

    const lastTwoHourRecord = production.filter(
      prod => maxDate.diff(prod.createdon, "hours") === 1
    );
    summary.lastTwoHour =
      (lastTwoHourRecord.length > 0 ? lastTwoHourRecord[0].production : 0) +
      summary.lastOneHour;

    summary.status =
      summary.lastTwoHour === 0 ? 0 : summary.lastTwoHour < 100 ? 1 : 2;

    summary.workingHour = maxDate.hour() - START_HOUR;

    const forToday = production.filter(prod =>
      prod.createdon.isSame(moment(), "day")
    );

    summary.forToday = forToday.reduce((acc, curr) => {
      return acc + curr.production;
    }, 0);

    const yesterdayRecord = production.filter(
      prod => maxDate.diff(prod.createdon, "days") === 1
    );

    summary.yesterdayProduction = yesterdayRecord.reduce((acc, curr) => {
      return acc + curr.production;
    }, 0);

    const montly = production.filter(prod =>
      prod.createdon.isSame(moment(), "month")
    );

    summary.montly = montly.reduce((acc, curr) => {
      return acc + curr.production;
    }, 0);
    acc.push(summary);

    return acc;
  }, invertersSummary);

  // console.log(
  //   invertersSummary[0].workingHour,
  //   invertersSummary[0].lastOneHour,
  //   invertersSummary[0].lastTwoHour,
  //   invertersSummary[0].forToday,
  //   invertersSummary[0].montly,
  //   invertersSummary[0].yesterdayProduction
  // );

  // console.log("workingHour1: ", invertersSummary[1].workingHour);
  // console.log("lastOneHour1: ", invertersSummary[1].lastOneHour);
  // console.log("lastTwoHourRecord1: ", invertersSummary[1].lastTwoHour);

  // console.log(invertersSummary);

  return invertersSummary;
};

export const allData = () => {
  debugger;

  let inverters = createInverters();

  inverters.forEach(inv => {
    Object.assign(inv.production, createProductionUntilYesterday());
  });
  debugger;

  const delay = 2000;
  let date = moment()
    .hour(START_HOUR + 1)
    .minute(0)
    .second(0);

  const refreshIntervalId = setInterval(() => {
    console.log(date.hour());
    inverters.forEach((inv, index) => {
      const newDate = moment(date);
      const prod = createInverterProduction(newDate);
      // if (index === 0) console.log(prod);
      inv.production.push(prod);
    });

    summary(inverters);
    // console.log(inverters[0].production.length);
    // console.log(inverters);
    // console.log(inverters[0].production);

    date.add(1, "h");
  }, delay);

  setTimeout(() => {
    clearInterval(refreshIntervalId);
    console.log(inverters);
    console.log("stopped");
  }, (FINISH_HOUR - START_HOUR) * delay);

  // clearInterval(timerId);
  // console.log(JSON.stringify(invertersSummary, null, 2));
  // inverters.reduce((acc, curr) => {
  //   curr.production = createInverterProduction();
  // }, []);

  // setInterval(() => {
  //   createInverterProduction();
  // }, 10000);
};

export default createMockData;
