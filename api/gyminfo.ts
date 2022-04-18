import axios from "axios";

export interface GymInfoResponse {
id: number;
gymName:string;
gymCoNum : string;
gymAddress : string;
gymTime : string;
gymService :string;
gymPhoto:string;
}
export interface GymInfoRequest {
gymName:string;
gymCoNum:string;
gymAddress : string;
gymTime : string;
gymPhoto:string;
}

const gymInfoApi = {
  get: (id: number) =>
    axios.get<GymInfoResponse[]>(`http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo/${id}`),
  fetch: () =>
  axios.get<GymInfoResponse[]>(`http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo`),
};

export default gymInfoApi;