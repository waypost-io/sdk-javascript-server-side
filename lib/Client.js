const axios = require('axios');
const userInRollout = require('./userIdHash');

class Client {
  constructor(config) {
    this.config = config;
    this.context = undefined;
    this.featureFlags = {};
  }

  // Developer must specify a userId key in their argument object
  addContext(contextObj) {
    if (!contextObj || !contextObj.userId) {
      throw new TypeError("Function must take an object containing a userId property");
    }
    this.context = contextObj;
  }

  setFeatureFlags(data) {
    this.featureFlags = {};
    data.forEach(flag => {
      this.featureFlags[flag.name] = flag;
    });
  }

  async getFlagData() {
    const res = await axios.get(`${this.config.api_address}/api/flags?sdk_key=${this.config.sdkKey}`);
    this.setFeatureFlags(res.data);
  }

  // defaultVal is a boolean
  evaluateFlag(featureName, defaultVal) {
    const featureData = this.featureFlags[featureName];

    if (featureData === undefined) {
      if (!defaultVal) {
        throw new TypeError("Must supply a default value argument");
      }
      return defaultVal;
    }

    if (this.context === undefined || featureData.status === false) {
      return featureData.status;
    }

    return userInRollout(this.context.userId, featureData['percentage_split'], featureData['hash_offset']);
  }
}

module.exports = Client;
