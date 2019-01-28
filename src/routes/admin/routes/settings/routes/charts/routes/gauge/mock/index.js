const MOCK_INVERTER_COUNT = 15;

const createMockDatas = () => {
  let mockData = [];
  Array.from({ length: MOCK_INVERTER_COUNT }).forEach((_, i) => {
    mockData.push({
      id: i + 1,
      name: `Panel-${i + 1}`,
      value: Math.floor(Math.random() * 1000),
      unit: "kW",
      range: [0, 1000]
    });
  });
  return mockData;
};

export default createMockDatas;
