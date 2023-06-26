export const THUMB_CATEGORY = Object.freeze([
  { value: 28, text: "통신", name: "communication" }, //communication
  {
    value: 29, //membership
    text: "멤버십",
    name: "Membership"
  },
  {
    value: 33, //Benefits
    text: "혜택 구성",
    name: "Benefits"
  }
]);

export const BANNER_CATEGORY = Object.freeze([
  {
    value: 34, // Home
    text: "메인",
    name: "Home"
  },
  {
    value: 28, //communication
    text: "통신",
    name: "communication"
  },
  {
    value: 31, // telephone
    text: "전화",
    name: "telephone"
  },
  {
    value: 35, // None
    text: "없음 구성",
    name: "None"
  }
]);

export const DEFAULT_EVENT = Object.freeze({
  ccategory: "",
  title: "",
  thmbImg: "",
  showYn: "Y",
  startDate: null,
  endDate: null,
  content: "",
  cbCategory: "",
  url: "",
  bannerImg: ""
});

export const DEFAULT_NOTICE = Object.freeze({
  ncategory: "",
  nstartdate: null,
  nenddate: null,
  ncontents: "",
  nregdate: null,
  nregid: "",
  ntitle: "",
  nshowyn: "y"
});

export const ANNOUNCEMENT_CATEGORY = Object.freeze([
  {
    value: 36, //all
    text: "전체",
    name: "all"
  },
  {
    value: 29, // Membership
    text: "멤버십",
    name: "Membership"
  },
  {
    value: 28, //communication
    text: "통신 구성",
    name: "communication"
  }
]);

export const FQA_CATEGORY = Object.freeze([
  {
    value: 27, //company related
    text: "회사관련",
    name: "company related"
  },
  {
    value: 28, // communication
    text: "통신",
    name: "communication"
  },
  {
    value: 29, //Membership
    text: "멤버쉽",
    name: "Membership"
  },
  {
    value: 30, //Secret Chat
    text: "비밀채팅",
    name: "Secret Chat"
  },
  {
    value: 31, //telephone
    text: "전화",
    name: "telephone"
  },
  {
    value: 32, //Other category
    text: "기타 카테고리",
    name: "Other category"
  }
]);

export const DEFAULT_QA = Object.freeze({
  fcategory: "",
  fregdate: "",
  fmodifydate: "",
  fquestion: "",
  fshowyn: "",
  fanswer: ""
});

export const DISCLOSURE = Object.freeze([
  {
    value: "Y",
    text: "공개"
  },
  {
    value: "N",
    text: "비공개"
  }
]);

export const STATUS_QA = Object.freeze([
  {
    value: "Y",
    text: "답변완료"
  },
  {
    value: "N",
    text: "답변대기"
  }
]);

// for page 관리자 작업 이력 조회
export const SEARCH_TYPE = Object.freeze([
  {
    value: "All",
    text: "전체"
  },
  {
    value: "Name", //Name
    text: "이름"
  },
  {
    value: "ID", //id
    text: "아이디"
  },
  {
    value: "Access address", // Access address
    text: "접속 주소"
  }
]);

export const TASK_CLASSIFICATION1 = Object.freeze([
  //All (default)/Login/Inquiry/Register/Modify/Delete/Download/Unmask drop-down
  {
    value: "All",
    text: "전체"
  },
  {
    value: "Login",
    text: "로그인"
  },
  {
    value: "Inquiry",
    text: "조회"
  },
  {
    value: "Register",
    text: "등록"
  },
  {
    value: "Modify",
    text: "수정"
  },
  {
    value: "Delete",
    text: "삭제"
  },
  {
    value: "Download",
    text: "다운로드"
  },
  {
    value: "Unmask",
    text: "마스킹해제"
  }
]);

export const TASK_CLASSIFICATION2 = Object.freeze([
  //All (default)/Lookup/Register/Modify/Delete/Download/Unmask drop-down
  {
    value: "All",
    text: "전체"
  },
  {
    value: "Lookup",
    text: "조회"
  },
  {
    value: "Register",
    text: "등록"
  },
  {
    value: "Modify",
    text: "수정"
  },
  {
    value: "Delete",
    text: "삭제"
  },
  {
    value: "Download",
    text: "다운로드"
  },
  {
    value: "Unmask",
    text: "마스킹해제"
  }
]);

export const ADMIN_RIGHT = Object.freeze([
  {
    idx: 1,
    value: "Super Administrator",
    text: "최고 관리자"
  },
  {
    idx: 27,
    value: "Operations Manage",
    text: "운영 관리자"
  },
  {
    idx: 53,
    value: "Operator",
    text: "운영자"
  }
]);
