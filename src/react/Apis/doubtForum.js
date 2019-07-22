import axios from "axios";

const doubts = axios.create({
  baseURL: "https://bl.fliplearn.com/message/getUserMessage",
  headers: {
    loginId: "Vinay2.admin",
    platform: "web",
    sessionToken: "4umRIYL8cEmDd99VFHgqXwhXK",
    SupportedApiVersion: 1,
    profileCode: 9614084712
  }
});

export default doubts;
