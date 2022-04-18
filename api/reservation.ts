import axios from "axios";

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface ReservationItemResponse {
  id : number
  gymName:string,
  trainerName:string,
  boughtService:string,
  memberName : string
  memberPhone : string;
  memberRequest : string,
}

export interface ReservationItemRequest {
  gymName:string,
  trainerName:string,
  boughtService:string,
  memberName : string
  memberPhone : string;
  memberRequest : string,
}

export interface ReservationPagingReponse {
  content: ReservationItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const reservationApi = {
  get: (id: number) =>
    axios.get<ReservationItemResponse>(
      // `${process.env.NEXT_PUBLIC_API_BASE}/reservation/{id}`
      `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/reservation/${id}`
    ),
  // axios.get<응답데이터의타입>(요청URL);
  fetch: () =>
    axios.get<ReservationItemResponse[]>(
      // `${process.env.NEXT_PUBLIC_API_BASE}/reservation`
      `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/reservation`
    ),

  fetchPaging: (page: number, size: number) =>
    axios.get<ReservationPagingReponse>(
      // `${process.env.NEXT_PUBLIC_API_BASE}/reservation/paging?page=${page}&size=${size}`
      `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/reservation/paging?page=${page}&size=${size}`
    ),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (reservationItem: ReservationItemRequest) =>
    axios.post<ReservationItemResponse>(
      // `${process.env.NEXT_PUBLIC_API_BASE}/addreservation`,
      `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/reservation`,
      reservationItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(
      // `${process.env.NEXT_PUBLIC_API_BASE}/mypage/myreservation/detail/${id}`
      `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/reservation/${id}`
      ),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, reservationItem: ReservationItemRequest) =>
    axios.put<ReservationItemResponse>(
      // `${process.env.NEXT_PUBLIC_API_BASE}/mypage/myreservation/edit/${id}`,
      `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/reservation/${id}`,
      reservationItem
    ),
};

export default reservationApi;