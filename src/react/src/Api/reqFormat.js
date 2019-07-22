const axios = require("axios");

const inst = axios.create({
  baseURL: "https://bl.fliplearn.com",
  headers: {
    loginId: "Vinay2.admin",
    sessionToken: "4umRIYL8cEmDd99VFHgqXwhXK",
    SupportedApiVersion: 1,
    profileCode: 9614084712
  }
});
export default inst;

// params:{
//     type:'%23fliplearn',
//     blocked:0,
//     startDate:null,
//     endDate:null,
//     pageNum:2,
//     pageSize:10
// }
