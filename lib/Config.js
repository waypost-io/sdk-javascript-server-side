const Client = require("./Client");

class Config {
  constructor(sdkKey, providerAddress) {
    this.sdkKey = sdkKey;
    this.providerAddress = providerAddress;
  }

  async connect() {
    const client = new Client(this);
    await client.getFlagData();
    client.listenForEvents();
    return client;
  }
}

module.exports = Config;