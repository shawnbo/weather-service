const moment = require('moment')

module.exports= {
  "coord": {
    "lon": 0,
    "lat": 0
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 81.99,
    "feels_like": 87.55,
    "temp_min": 81.99,
    "temp_max": 81.99,
    "pressure": 1010,
    "humidity": 75,
    "sea_level": 1010,
    "grnd_level": 1010
  },
  "visibility": 10000,
  "wind": {
    "speed": 11.77,
    "deg": 138,
    "gust": 11.63
  },
  "clouds": {
    "all": 24
  },
  "dt": 1675270672,
  "sys": {
    "sunrise": 1675231800,
    "sunset": 1675275417
  },
  "timezone": 0,
  "id": 6295630,
  "name": "Globe",
  "cod": 200,
  "alerts": [
    {
      "sender_name": "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
      "event": "Small Craft Advisory",
      "start": moment().subtract(1, 'days'),
      "end": moment().add(1, 'days'),
      "description": "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
      "tags": []
    },
    {
      "sender_name": "Fake News Network",
      "event": "This should show",
      "start": moment().subtract(20, 'days'),
      "end": moment().add(10, 'days'),
      "description": "",
      "tags": []
    }
  ]
}