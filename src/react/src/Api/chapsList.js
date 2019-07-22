const axios = require("axios");

const inst = axios.create({
  baseURL: "https://ptoc.fliplearn.com/v1/",
  headers: {
    loginId: "Vinay2.admin",
    platform: "web",
    sessionToken: "4umRIYL8cEmDd99VFHgqXwhXK",
    SupportedApiVersion: 1,
    profileCode: 9614084712
  }
});
export default inst;
