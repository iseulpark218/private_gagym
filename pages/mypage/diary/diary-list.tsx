import React from "react";
import styles from "../../../styles/Diarylist.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";
import Footer from "../../../components/footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { requestFetchPagingDiary } from "../../../middleware/modules/diary";

// redux : 리덕스를 사용하면 통합적인 데이터 관리가 가능

// 날짜 처리, ex) 11/26
const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  let month = ("0" + (1 + dateTime.getMonth())).slice(-2);
  let day = ("0" + dateTime.getDate()).slice(-2);
  return month + "/" + day;
};

const DiaryList = () => {
  const diary = useSelector((state: RootState) => state.diary);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // hook사용-useEffect(페이징/로딩/에러 처리 등)
  useEffect(() => {
    // 데이터 fetch가 안되었으면 데이터를 받아옴
    if (!diary.isFetched) {
      const diaryPageSize = localStorage.getItem("diary_page_size");
      dispatch(
        requestFetchPagingDiary({
          page: 0,
          size: diaryPageSize ? +diaryPageSize : diary.pageSize,
        })
      );
    }
  }, [dispatch, diary.isFetched, diary.pageSize]);

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
// api쪽에 diary를 페이징으로 가져오는 action 설정 
      requestFetchPagingDiary({
        page: diary.page,
        size: +e.currentTarget.value,
      })
    );
  };

  return (
    <div>
      <AppBar />
      <main className={styles.main}>
        <div className={styles.div}>
          {/*>PT일지 목록*/}
          <div>
            <div className="mx-auto">
              <div className="d-flex flex-direction-column align-items-baseline mt-5">
                <p className={styles.p}>PT일지 목록</p>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    router.push("/mypage/diary/diary-create");
                  }}
                >
                  일지 작성
                </button>
              </div>
              <div className="d-flex">
                <h6 style={{ color: "rgb(3, 48, 129)" }}>
                  <b>날짜</b>
                </h6>
                <h6>를 누르시면 일지 Detail을 확인 하실 수 있습니다.</h6>
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-center">
              <select
                className="form-select form-select-sm p-1 mb-3"
                style={{ width: "55px", height: "30px" }}
                onChange={(e) => {
                  handlePageSizeChanged(e);
                }}
              >
                {[3, 5, 10, 30].map((size, index) => (
                  <option
                    value={size}
                    selected={diary.pageSize === size}
                    key={index}
                  >
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <table className="table table-hover">
            <thead className="display-flex;">
              <tr>
                <th>날짜</th>
                <th>회원명</th>
                <th>아침식단</th>
                <th>점심식단</th>
                <th>저녁식단</th>
                <th>운동내역</th>
                <th>문의사항</th>
                <th>담당 강사</th>
                <th style={{ color: "red" }}>강사 피드백</th>
              </tr>
            </thead>

            <tbody className="tbody">
              
              {diary.data.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ cursor: "pointer", color: "rgb(3, 48, 129)" }}
                    className={styles.textd}
                    onClick={() => {
                      router.push(`/mypage/diary/detail/${item.id}`);
                    }}
                    key={index}
                  >
                    <b>{getTimeString(item.diaryCreateTime)}</b>
                  </td>
                  <td className={styles.text}>{item.memberName}</td>
                  <td className={styles.text}>{item.diaryMorning}</td>
                  <td className={styles.text}>{item.diaryLunch}</td>
                  <td className={styles.text}>{item.diaryDinner}</td>
                  <td className={styles.text}>{item.diaryRoutine}</td>
                  <td className={styles.text}>{item.diaryRequest}</td>
                  <td className={styles.text}>{item.trainerName}</td>
                  <td className={styles.text} style={{ color: "red" }}>
                    {item.trainerFeedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiaryList;
