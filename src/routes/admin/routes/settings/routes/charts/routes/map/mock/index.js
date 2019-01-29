const LOCATİONS = [
  "SALİHLİ",
  "POLATLI",
  "ATKARACALAR",
  "KURŞUNLU",
  "SİVRİHİSAR",
  "KULU"
];

const createMockDatas = () => {
  let mockData = [];
  Array.from(LOCATİONS).forEach(item => {
    mockData.push({
      name: item,
      daily: Math.floor(Math.random() * 200 + 200),
      weekly: Math.floor(Math.random() * 500 + 1400),
      monthly: Math.floor(Math.random() * 1000 + 6000),
      unit: "kW"
    });
  });
  return mockData;
};

export default createMockDatas;
