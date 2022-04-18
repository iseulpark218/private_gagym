import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DiaryItem {
  id: number;
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  diaryCreateTime : number;
  isEdit?: boolean;
}

export interface DiaryPage {
  data: DiaryItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}
// 백엔드 연동 고려해서 state 구조를 설계
interface diaryState {
  data: DiaryItem[]; // 다이어리 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아왔는지에 대한 여부
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}
// diary state를 목록 -> array
const initialState: diaryState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 5,
  totalPages: 0,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    // PayloadAction<payload타입>
    // payload로 item객체를 받음
    addDiary: (state, action: PayloadAction<DiaryItem>) => {
      const diary = action.payload;
      console.log("--in reducer function--");
      console.log(diary);
      state.data.unshift(diary);
      state.isAddCompleted = true;  // 추가가 되었음으로 표시
    },
    // payload 없는 reducer
    // completed 관련된 속성을 삭제함(undefined 상태)
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    // payload로 id값을 받음
    // action: PayloadAction<number>
    // reducer 넘어오는 action은 payload있는 액션인데,
    // payload의 타입이 number이다.
    removeDiary: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyDiary: (state, action: PayloadAction<DiaryItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const diaryItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (diaryItem) {
        diaryItem.memberName = modifyItem.memberName;
        diaryItem.diaryMorning = modifyItem.diaryMorning;
        diaryItem.diaryLunch = modifyItem.diaryLunch;
        diaryItem.diaryDinner = modifyItem.diaryDinner;
        diaryItem.diaryRoutine = modifyItem.diaryRoutine;
        diaryItem.diaryRequest = modifyItem.diaryRequest;
        diaryItem.trainerName = modifyItem.trainerName;
        diaryItem.trainerFeedback = modifyItem.trainerFeedback;
        diaryItem.diaryCreateTime = modifyItem.diaryCreateTime;
      }
           state.isModifyCompleted = true; // 변경 되었음을 표시
    },
   initialDiaryItem: (state, action: PayloadAction<DiaryItem>) => {
      const diary = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = [{ ... diary }];
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialDiary: (state, action: PayloadAction<DiaryItem[]>) => {
      const diary = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = diary;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
        addTotalpages: (state) => {
      state.totalPages++;
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialPagedDiary: (state, action: PayloadAction<DiaryPage>) => {
      // 백엔드에서 받아온 데이터
      // 컨텐트
      state.data = action.payload.data;
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
        initialNextDiary: (state, action: PayloadAction<DiaryPage>) => {
      // 백엔드에서 받아온 데이터를 기존데이터 뒤로 합침
      // 컨텐트
      state.data = state.data.concat(action.payload.data);
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});

// action creator 내보내기: action creator는 action객체를 반환하는 함수
export const { 
  addDiary, 
  removeDiary, 
  modifyDiary,
  initialDiaryItem,
  initialDiary,
  initialCompleted,
  initialPagedDiary,
  initialNextDiary,
} = diarySlice.actions;


export default diarySlice.reducer;