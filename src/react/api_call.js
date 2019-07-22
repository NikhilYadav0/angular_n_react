import doubtForum from "./Apis/doubtForum";

var getDoubts = pageNum => {
  return doubtForum.get("", {
    params: {
      type: "#doubt_forum",
      blocked: 0,
      startDate: "",
      endDate: "",
      pageNum: pageNum,
      pageSize: 10,
      subjectId: "",
      chapterId: "",
      sortBy: "",
      myDoubt: 0,
      postForMe: 0,
      unResolved: 0,
      isGuest: true
    }
  });
};

export default { getDoubts };
