Config = require('./lib/Config');

let sdkClient;
// Testing "Test flag 2", which is ON and has percentage 50% (based on user hash).

// Testing userId "5555" => Flag is On
(async () => {
  sdkClient = await new Config('12345', "http://localhost:5000").connect();
  sdkClient.addContext({ userId: "5555" });
  if (sdkClient.evaluateFlag("Test flag 2")) {
    console.log("Flag is on");
  } else {
    console.log("Flag is off");
  }
})();

// Testing userId "abcde" => Flag is Off
(async () => {
  sdkClient = await new Config('12345', "http://localhost:5000").connect();
  sdkClient.addContext({ userId: "abcde" });
  if (sdkClient.evaluateFlag("Test flag 2")) {
    console.log("Flag is on");
  } else {
    console.log("Flag is off");
  }
})();
