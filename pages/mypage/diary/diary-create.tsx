import { MutableRefObject } from "react";
import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";
import Footer from "../../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { useEffect, useRef } from "react";
import { DiaryItem } from "../../../provider/modules/diary";
import { requestAddDiary } from "../../../middleware/modules/diary";
import styles from "../../../styles/Diarycreate.module.css";

const DiaryCreate = () => {
  const memberName = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryMorning = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryLunch = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryDinner = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRoutine = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRequest = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerName = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerFeedback = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryCreateTime = useRef() as MutableRefObject<HTMLInputElement>;
  // 다이어리 데이터 배열 가져오기
  const diaryData = useSelector((state: RootState) => state.diary.data);
  // 추가 완료 여부
  // 1. state 변경감지 및 값 가져오기
  const isAddCompleted = useSelector(
    (state: RootState) => state.diary.isAddCompleted
  );

  // dispatch 함수 만들기
  const dispatch = useDispatch<AppDispatch>();

  // router 객체 가져오기
  const router = useRouter();

  // isAddCompleted값이 변경되면 처리(처음 렌더링되는 시점에도 처리됨)
  // 2. state가 변경되면 처리되는 함수
  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);
    // true이면 화면이동
    isAddCompleted && router.push("/mypage/diary/diary-list");
  }, [isAddCompleted, router, dispatch]);

  const handleSaveClick = () => {
    // 추가할 객체 생성
    const item: DiaryItem = {
      // 기존데이터의 id 중에서 가장 큰 것 + 1
      id: diaryData.length > 0 ? diaryData[0].id + 1 : 1,
      memberName: memberName.current?.value,
      diaryMorning: diaryMorning.current?.value,
      diaryLunch: diaryLunch.current?.value,
      diaryDinner: diaryDinner.current?.value,
      diaryRoutine: diaryRoutine.current?.value,
      diaryRequest: diaryRequest.current?.value,
      trainerName: trainerName.current?.value,
      trainerFeedback: trainerFeedback.current?.value,
      // 시스템 값(작성일시, 수정일시, 수정한사람....)
      diaryCreateTime: new Date().getTime(),
    };

    // state에 데이터 추가
    // 1. addPhoto함수에서 Action 객체를 생성함
    //    -> {type:"photo/addPhoto", payload:item}
    // 2. Action 객체를 Dispatcher에 전달함
    // 3. Dispatcher에서 Action.type에 맞는 리듀서 함수를 실행
    //    -> 기존 state와 action객체를 매개변수를 넣어주고 실행

    /* ----- 기존 redux action ----- */
    // dispatch(addPhoto(item));

    /* ----- saga action으로 대체 ----- */
    // dispatch(requestAddPhoto(item)); // 전체조회
    // dispatch(requestAddPhotoPaging(item)); // 넘버 페이징
    dispatch(requestAddDiary(item)); // 더보기 페이징
    // dispatch(addDiary(item));
    router.push("/mypage/diary/diary-list");
  };
  const dateTime = new Date();

  return (
    <div className={styles.div1}>
      <AppBar />
      <div className={styles.div2}>
        <div className={styles.div3}>
          <h2 className={styles.h2}>일지 작성</h2>
        </div>
        <form className="mx-auto">
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th className={styles.th}>회원명</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="회원명을 작성 해 주세요"
                    ref={memberName}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>아침식단</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="아침식단을 작성 해 주세요"
                    ref={diaryMorning}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>점심식단</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="점심식단을 작성 해 주세요"
                    ref={diaryLunch}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>저녁식단</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="저녁식단을 작성 해 주세요"
                    ref={diaryDinner}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>운동내역</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="운동내역을 작성 해 주세요"
                    ref={diaryRoutine}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>문의사항</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="문의사항을 작성 해 주세요"
                    ref={diaryRequest}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>담당강사</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="담당강사를 작성 해 주세요"
                    ref={trainerName}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <div className={styles.btndiv}>
          <button
            className={styles.btn1}
            onClick={() => {
              router.push("/mypage/diary/diary-list");
            }}
          >
            목록
          </button>
          <button
            className={styles.btn2}
            onClick={() => {
              handleSaveClick();
            }}
          >
            저장
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiaryCreate;
