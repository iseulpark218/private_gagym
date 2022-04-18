import axios from "axios";

export interface GymPagingResponse {
  content: GymItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface GymItemResponse {
id: number;
gymName:string;
gymCoNum : string;
gymLocateSi : string;
gymLocateGunGu : string;
gymAddress : string;
gymPhoneNum : string;
gymTime : string;
gymService :string;
gymPhoto?:string;
fileName:string;
fileType:string;
gym1DayPrice : string;
gym3DayPrice : string;
gym7DayPrice : string;
gymMonthPrice : string;
gym3MonthPrice : string;
gym6MonthPrice : string;
gymYearPrice : string;

}
export interface GymItemRequest {
gymName:string;
gymCoNum : string;
gymLocateSi : string;
gymLocateGunGu : string;
gymAddress : string;
gymPhoneNum : string;
gymTime : string;
gymService :string;
gymPhoto?:string;
fileName:string;
fileType:string;
gym1DayPrice : string;
gym3DayPrice : string;
gym7DayPrice : string;
gymMonthPrice : string;
gym3MonthPrice : string;
gym6MonthPrice : string;
gymYearPrice : string;
}

const gymApi = {
  get: (id: number) =>
    axios.get<GymItemResponse[]>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gym`),


  fetch: () =>
  axios.get<GymItemResponse[]>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gym`),

  fetchPaging: (page: number, size: number) =>
    axios.get<GymPagingResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gym/paging?page=${page}&size=${size}`
    ),

  add: (gymItem: GymItemRequest) =>
    axios.post<GymItemResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gym`,
      gymItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gym/${id}`),


  modify: (id: number, gymItem: GymItemRequest) =>
    axios.put<GymItemResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gym/${id}`,
      gymItem
    )
};

export default gymApi;