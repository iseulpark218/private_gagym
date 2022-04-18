import { useDispatch, useSelector } from "react-redux";
import React, { MutableRefObject, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../../provider";
import Layout from "../../../../components/layout";
import { ReservationList } from "../../../../provider/modules/reservation";
import { requestAddReservation } from "../../../../middleware/modules/reservation";
import Image from "next/image";
import { GetServerSideProps } from "next";
import axios from "axios";
import styles from "../../../../styles/RsvCreate.module.css";

import AppBar from "../../../../components/appbar";
import Footer from "../../../../components/footer";

interface GymInfo {
  id: number;
  gymName: string;
  gymAddress: string;
  gymCoNum: string;
  gymTime: string;
  gymPhoto: string;
}

interface Trainers {
  id: number;
  gymCode: string;
  trainerName: string;
}

interface IndexProp {
  gymInfo: GymInfo;
  trainers: Trainers[];
}

const ReservationCreate = ({ gymInfo, trainers }: IndexProp) => {
  const reservationData = useSelector(
    (state: RootState) => state.reservation.data
  );
  const router = useRouter();
  const id = router.query.id as string;

  // 추가 완료 여부
  // 1. state 변경감지 및 값 가져오기
  const isAddCompleted = useSelector(
    (state: RootState) => state.reservation.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const gymName = useRef() as MutableRefObject<HTMLHeadingElement>;
  const ptName = useRef() as MutableRefObject<HTMLSelectElement>;
  const service = useRef() as MutableRefObject<HTMLSelectElement>;
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const tel = useRef() as MutableRefObject<HTMLInputElement>;
  const request = useRef() as MutableRefObject<HTMLTextAreaElement>;

  // isAddCompleted값이 변경되면 처리(처음 렌더링되는 시점에도 처리됨)
  // 2. state가 변경되면 처리되는 함수
  useEffect(() => {
    isAddCompleted && router.push("/mypage/mypage");
  }, [isAddCompleted, router, dispatch]);

  function handleSaveClick(): void {
    // 추가할 객체 생성
    const reservation: ReservationList = {
      // 기존데이터의 id 중에서 가장 큰 것 + 1
      id: reservationData.length ? reservationData[0].id + 1 : 1,
      gymName: gymName.current?.innerText,
      trainerName: ptName.current.value,
      boughtService: service.current.value,
      // 입력 정보
      memberName: name.current?.value,
      memberPhone: tel.current?.value,
      memberRequest: request.current?.value,
    };

    dispatch(requestAddReservation(reservation)); // 전체조회

    // dispatch(requestAddReservationNext(item)); // 더보기페이징
    router.push("/mypage/mypage");
  }

  return (
    <div>
      <AppBar />

      {/* <Layout> */}
      <div style={{ width: "60vw" }} className="mx-auto mt-5">
        <div>
          <div className="d-flex justify-content-center" key={gymInfo.id}>
            <div style={{ width: "20vw" }}>
              <Image
                src={gymInfo.gymPhoto}
                alt={gymInfo.gymName}
                layout="responsive"
                objectFit="cover" //써야됨 or none
                width={150}
                height={150}
              />
            </div>
            {/* 희망이용권+희망강사 선택 버튼 */}
            <div
              className="d-flex justify-content-center mt-5 ms-3"
              style={{ width: "30vw", height: "150px" }}
            >
              <div className="ms-3">
                <h4 className="d-flex justify-content-center mt-5 my-3">
                  PT 이용권
                </h4>
                <div className="d-flex justify-content-center my-1">
                  <select ref={service}>
                    <option defaultValue="PT 1회권"> PT 1회권</option>
                    <option defaultValue="PT 10회권"> PT 10회권</option>
                    <option defaultValue="PT 30회권"> PT 30회권</option>
                    <option defaultValue="요가 1회권"> 요가 1회권</option>
                    <option defaultValue="요가 10회권"> 요가 10회권</option>
                    <option defaultValue="요가 30회권"> 요가 30회권</option>
                    <option defaultValue="필라테스 1회권">
                      {" "}
                      필라테스 1회권
                    </option>
                    <option defaultValue="필라테스 10회권">
                      {" "}
                      필라테스 10회권
                    </option>
                    <option defaultValue="필라테스 30회권">
                      {" "}
                      필라테스 30회권
                    </option>
                  </select>
                </div>
              </div>
              <div className="ms-3"> 
                <h4 className="d-flex justify-content-center mt-5 my-3">
                  강사
                </h4>
                <div className="d-flex justify-content-center my-1">
                  <select name="강사정보" ref={ptName}>
                    {trainers.map((item, index) => (
                      <option
                        defaultValue={item.trainerName}
                        key={`reservation-item-${index}`}
                      >
                        {item.trainerName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-center mt-4 ps-3">
              <div style={{ width: "30vw" }} className="ms-3">
                <h4 className="mb-3">헬스장명</h4>
                <h6 ref={gymName} className="mx-3">
                  {gymInfo.gymName}
                </h6>
                <h4 className="my-3">주소</h4>
                <h6 className="mx-3">{gymInfo.gymAddress}</h6>
                <h4 className="my-3">운영시간</h4>
                <h6 className="mx-3">{gymInfo.gymTime}</h6>
              </div>
              <div className="pe-5 me-5" >
                <h4 className="text-center ">
                  예약자 정보 입력
                </h4>
                <table>
                  <tbody>
                    <tr>
                      <th className="me-5">이름</th>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="상담 예약자 이름"
                          ref={name}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="me-5">연락처</th>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="ex) 010-1234-5678"
                          ref={tel}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="me-5" style={{ width: "60px" }}>
                        문의사항
                      </th>
                      <td>
                        <textarea
                          className="form-control"
                          placeholder="상담 예약자 문의사항"
                          ref={request}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td className="float-end">
                        <button
                          className={styles.btnrsv}
                          onClick={() => {
                            handleSaveClick();
                          }}
                          type="button"
                        >
                          예약등록
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Layout> */}
      <Footer />
    </div>
  );
};

// 여기 함수부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  // export async function getServerSideProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await axios.get<GymInfo[]>(
    `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo`
  );

  // const gymInfo = gymInfos.find((item) => item.id === +id);
  const gymInfo = res.data.find((item) => item.id === +id);

  const trainer = await axios.get<Trainers[]>(
    `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/trainer`
  );

  const trainers = trainer.data.filter(
    (item) => item.gymCode == gymInfo.gymCoNum
  );

  return { props: { gymInfo, trainers } };
};

export default ReservationCreate;
