import React from "react";
import Image from "next/image";
import styles from "../../../styles/Gymdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";
import { useRouter } from "next/router";
import Footer from "../../../components/footer";

import { GetServerSideProps } from "next";
import axios from "axios";

interface GymDetails {
  albumId: number;
  id: number;
  gymName: string;
  gymCoNum: string;
  gymLocateSi: string;
  gymLocateGunGu: string;
  gymAddress: string;
  gymPhoneNum: string;
  gymTime: string;
  gymService: string;
  gymPhoto: string;
  fileName: string;
  fileType: string;
  gym1DayPrice: string;
  gym3DayPrice: string;
  gym7DayPrice: string;
  gymMonthPrice: string;
  gym3MonthPrice: string;
  gym6MonthPrice: string;
  gymYearPrice: string;
}

interface Trainers {
  albumId: number;
  id: number;
  gymCode: string;
  trainerName: string;
  trainerIntro: string;
  trainerPhotoUrl: string;
  pt1TimePrice: string;
  pt10TimePrice: string;
  pt30TimePrice: string;
  yoga1TimePrice: string;
  yoga10TimePrice: string;
  yoga30TimePrice: string;
  pilates1TimePrice: string;
  pilates10TimePrice: string;
  pilates30TimePrice: string;
}

interface GymDetailProp {
  gymDetail: GymDetails;
  trainers: Trainers[];
}

const GymDetail = ({ gymDetail, trainers }: GymDetailProp) => {
  // router 객체 가져오기
  const router = useRouter();
  // /diary/detail/[id]
  const id = router.query.id as string;

  return (
    <div className={styles.container}>
      <AppBar />
      <main className={styles.main} key={`${gymDetail.id}`}>
        <div className={styles.div1}>
          {/* 1. 헬스장 사진 + 내용 + 예약버튼 */}
          <div className="d-flex mt-5">
            <div style={{ cursor: "pointer" }} className={styles.src}>
              <Image
                src={gymDetail.gymPhoto}
                className="card-img-top"
                alt={gymDetail.gymName}
                layout="responsive"
                objectFit="cover" //써야됨 or none
                width={300}
                height={300}
              />
            </div>

            {/* 내용 */}
            <div className={styles.div0}>
              {/* 헬스장명 */}
              <h3 className={styles.h3}>{gymDetail.gymName}</h3>
              {/* 헬스장주소 */}
              <h6>{gymDetail.gymAddress}</h6>
              {/* 헬스장 전화번호 */}
              <h6>{gymDetail.gymPhoneNum}</h6>
              {/* 헬스장 운영시간 */}
              <p className={styles.p}>
                <b>[운영시간]</b>
                <br />
                {/* [평 일] 06:00 ~ 21:30
                <br />
                [토요일] 08:00 ~ 18:00
                <br />
                [휴관일] 공휴일 */}
                {gymDetail.gymTime}
              </p>
              {/* 예약버튼 */}
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className={styles.btnrsv}
                  style={{ width: "350px" }}
                  onClick={() => {
                    router.push(`../../mypage/myreservation/create/${id}`);
                  }}
                >
                  예약하러 가기
                </button>
              </div>
            </div>
          </div>
          {/*--------------2. 강사소개/이용권/헬스장사진/부가서비스 시작 --------------*/}
          {/* 강사소개 */}
          <h4 className={styles.h4}>강사 소개 및 이용권</h4>
          {/*강사소개+이용권*/}
          {trainers.map((item, index) => (
            <div className={styles.divtrainer} key={index}>
              {/*(왼쪽)강사소개*/}
              <div className={styles.imgtrainer}>
                <img src={item.trainerPhotoUrl} className={styles.imgd} />
                <div className={styles.divsp}>
                  <span className={styles.divsptr}>{item.trainerName}</span>
                  <br />
                  <span>{item.trainerIntro}</span>
                  <br />
                </div>
              </div>
              {/*(오른쪽)이용권*/}
              <div className={styles.divprice}>
                <table className={styles.table1}>
                  <tr>
                    <th className={styles.th1}></th>
                    <th className={styles.th1}>1회</th>
                    <th className={styles.th1}>10회</th>
                    <th className={styles.th1}>30회</th>
                  </tr>
                  <tr>
                    <td className={styles.td1c}>P.T</td>
                    <td className={styles.td1}>{item.pt1TimePrice}원</td>

                    <td className={styles.td1}>{item.pt10TimePrice}원</td>
                    <td className={styles.td1}>{item.pt30TimePrice}원</td>
                  </tr>
                  <tr>
                    <td className={styles.td1c}>필라테스</td>
                    <td className={styles.td1}>{item.pilates1TimePrice}원</td>
                    <td className={styles.td1}>{item.pilates10TimePrice}원</td>
                    <td className={styles.td1}>{item.pilates30TimePrice}원</td>
                  </tr>
                  <tr>
                    <td className={styles.td1c}>요가</td>
                    <td className={styles.td1}>{item.yoga1TimePrice}원</td>
                    <td className={styles.td1}>{item.yoga10TimePrice}원</td>
                    <td className={styles.td1}>{item.yoga30TimePrice}원</td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
          {/* 헬스장 이용권 */}
          <h4 className={styles.h4}>헬스장 이용권</h4>
          <div className="d-flex">
            <div className={styles.divspan}>
              <span className={styles.span1}>1일권</span>
              <span className={styles.span2}>{gymDetail.gym1DayPrice}원</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span1}>3일권</span>
              <span className={styles.span2}>{gymDetail.gym3DayPrice}원</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span1}>7일권</span>
              <span className={styles.span2}>{gymDetail.gym7DayPrice}원</span>
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.divspan}>
              <span className={styles.span3}>1개월</span>
              <span className={styles.span4}>{gymDetail.gymMonthPrice}원</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span3}>3개월</span>
              <span className={styles.span4}>{gymDetail.gym3MonthPrice}원</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span3}>6개월</span>
              <span className={styles.span4}>{gymDetail.gym6MonthPrice}원</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span3}>12개월</span>
              <span className={styles.span4}>{gymDetail.gymYearPrice}원</span>
            </div>
          </div>
          {/* 부가서비스 */}
          <h4 className={styles.h4}>부가서비스</h4>
          <div className="mb-2">{gymDetail.gymService}</div>{" "}
          <div className={styles.divser1}>
            <div className={styles.divser11}>
              <img src={"/gymservice/inbody.png"} style={{ width: "100px" }} />
              <span className={styles.divser111}>인바디 측정</span>
            </div>
            <div className={styles.divser11}>
              <img src={"/gymservice/locker.png"} style={{ width: "100px" }} />
              <span className={styles.divser111}>라커룸</span>
            </div>
            <div className={styles.divser11}>
              <img src={"/gymservice/shower.png"} style={{ width: "100px" }} />
              <span className={styles.divser111}>샤워시설</span>
            </div>
            <div className={styles.divser11}>
              <img
                src={"/gymservice/wifi.png"}
                style={{ width: "100px" }}
                // className={styles.imgd}
              />
              <span className={styles.divser111}>와이파이</span>
            </div>
          </div>
          {/*강사소개/이용권/헬스장사진/부가서비스/공지사항 끝*/}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// getServerSideProps 함수에서 데이터를 조회하고 반환함
export const getServerSideProps: GetServerSideProps = async (context) => {
  // SSR일 때 매개변수를 받는 방법

  const id = context.params?.id as string; // as string

  // Fetch data from external API

  //axios처리 {gymDetail}
  const res = await axios.get<GymDetails[]>(
    `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gagym/detail/{id}`
  );

  // ==============방법1
  const gymDetail = res.data.find((item) => item.id === +id);

  //axios처리 {trainer}
  const trainer = await axios.get<Trainers[]>(
    `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gagym/detail/trainer`
  );

  const trainers = trainer.data.filter(
    (item) => item.gymCode == gymDetail.gymCoNum
  );

  // ==============방법2-백엔드 연동 전 임시
  // const diary = res.data;
  // const diary = {
  //   id: 1,
  //   url: "...",
  // };
  return { props: { gymDetail, trainers } };
};

export default GymDetail;
