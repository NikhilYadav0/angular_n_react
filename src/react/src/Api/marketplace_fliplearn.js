const axios = require("axios");

const inst = axios.create({
  baseURL: "https://marketplace.fliplearn.com/rest/api/v1",
  headers: {
    loginId: "Vinay2.admin",
    sessionToken: "4umRIYL8cEmDd99VFHgqXwhXK",
    SupportedApiVersion: 1,
    profileCode: 9614084712,
    requestCode: "vmc"
  }
});
export default inst;
