const axios = require("axios");

export default axios.create({
  baseURL: "https://bl.fliplearn.com/message",
  headers: {
    loginId: "Vinay2.admin",
    sessionToken: "4umRIYL8cEmDd99VFHgqXwhXK",
    SupportedApiVersion: 1,
    profileCode: 9614084712
  }
});

// comment: {comment: "hello", uuid: "101004608030", messageCode: "20865421"}
