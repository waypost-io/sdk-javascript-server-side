# Waypost's Server-Side SDK for Javascript
## Setup
1. Install via `npm install waypost-sdk-js-server`
2. If using Express.js, set up a middleware before your routes that imports the `waypost-sdk-js-server` package, and configures the SDK client.
3. In the `Config` constructor, the first argument is your SDK key (get this from the Waypost feature flag manager interface). The second argument is the address of Waypost's flag provider service.
Chain the `connect()` method immediately, which sets up the connection to the Waypost flag provider service, and returns the SDK Client containing the feature flag data.
4. Assign the resulting `sdkClient` object to `req.sdkClient`.

Example:
```
app.use(async (req, res, next) => {
  const Config = require("waypost-sdk-js-server");
  const sdkClient = await new Config('1a2b3d4e', "http://localhost:5050").connect();
  req.sdkClient = sdkClient;
  next();
});
```
## Usage
Where you need to branch your code based on the feature flag status, call the `evaluateFlag()` method on `req.sdkClient`.

Example:
```
const useNewPaymentFlag = sdkClient.evaluateFlag("New Payment Feature");
if (useNewPaymentFlag) {
  newPaymentProcessor();
} else {
  oldPaymentProcessor();
}
```