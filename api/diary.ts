import axios from "axios";
// 백엔드와 프론트엔드랑 통신을 쉽게 하기 위해 사용하는 라이브러리

export interface DiaryPagingResponse {
  content: DiaryItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface DiaryItemResponse {
  id: number;
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  diaryCreateTime: number;
}

export interface DiaryItemRequest {
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  diaryCreateTime: number;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
// ec2 인스턴스 : 클라우드의 가상 서버(컴퓨터 한 대의 개념)
const diaryApi = {
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  get: (id: number) =>
    axios.get<DiaryItemResponse[]>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/${id}`
      ),

    // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (diaryItem: DiaryItemRequest) =>
    axios.post<DiaryItemResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary`,
      diaryItem
    ),
  
  fetch: () =>
  axios.get<DiaryItemResponse[]>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary`),

  
  fetchPaging: (page: number, size: number) =>
    axios.get<DiaryPagingResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/paging?page=${page}&size=${size}`
    ),
  
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/${id}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, diaryItem: DiaryItemRequest) =>
    axios.put<DiaryItemResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/${id}`,
      diaryItem
    )
};

export default diaryApi;