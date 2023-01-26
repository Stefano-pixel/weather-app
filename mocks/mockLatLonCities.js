const mockCitiesCoordinates = {
  BARI: {
    latitude: "41.11815159724322",
    longitude: "16.8701130981935",
    weatherInfoExpected: {
      cod: "200",
      message: 0,
      cnd: 40,
      list: [{ temperature: 20 }, { temperature: 25 }],
      city: {
        name: "Bari",
      },
    },
    businessInfoExpected: {
      businesses: [
        { name: "Pizzeria di Cosimo", review_count: 6 },
        { name: "La baresana", review_count: 8 },
      ],
    },
  },
  FOGGIA: {
    latitude: "41.46216852463386",
    longitude: "15.544255591759205",
    weatherInfoExpected: {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [{ temperature: 30 }, { temperature: 31 }],
      city: {
        name: "Foggia",
      },
    },
    businessInfoExpected: {
      businesses: [
        { name: "Croccantino", review_count: 9 },
        { name: "rosticceria-d-aloia-foggia", review_count: 4 },
        { name: "da-pompeo-foggia", review_count: 3 },
      ],
    },
  },
  LECCE: {
    latitude: "40.35137823335784",
    longitude: "18.1730924060912",
    weatherInfoExpected: {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [{ temperature: 32 }, { temperature: 32 }],
      city: {
        name: "Lecce",
      },
    },
    businessInfoExpected: {
      businesses: [{ name: "Mamma Elvira", review_count: 14 }],
    },
  },
  TORINO: {
    latitude: "45.07225506384781",
    longitude: "7.68693446410401",
    weatherInfoExpected: {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [{ temperature: 20 }, { temperature: 20 }],
      city: {
        name: "Torino",
      },
    },
    businessInfoExpected: {
      businesses: [
        { name: "Museo Nazionale del Cinema", review_count: 14 },
        { name: "Museo Egizio", review_count: 63 },
      ],
    },
  },
  TRAPANI: {
    latitude: "38.017667335383145",
    longitude: "12.5360271019136",
    weatherInfoExpected: {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [{ temperature: 35 }, { temperature: 36 }],
      city: {
        name: "Trapani",
      },
    },
    businessInfoExpected: {
      businesses: [{ name: "Calvino", review_count: 13 }],
    },
  },
};

export default mockCitiesCoordinates;
