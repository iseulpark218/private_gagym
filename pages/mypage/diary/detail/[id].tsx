import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../provider";
import {
  requestFetchDiary,
  requestFetchDiaryItem,
  requestRemoveDiary,
} from "../../../../middleware/modules/diary";
import AppBar from "../../../../components/appbar";
import Footer from "../../../../components/footer";
import getTimeString from "../../../../provider/modules/getTimeString";
import styles from "../../../../styles/Diarydetail.module.css";

const DiaryDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);

  const diary = useSelector((state: RootState) => state.diary);

  let diaryItem = useSelector((state: RootState) =>
    state.diary.data.find((item) => item.id === +id)
  );

  useEffect(() => {
    if (!diary.isFetched) {
      dispatch(requestFetchDiary());
    }
  }, [dispatch, diary.isFetched]);

  if (id) {
    if (!diaryItem) {
      dispatch(requestFetchDiaryItem(+id));
    }
  }

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.diary.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/mypage/diary/diary-list");
  }, [isRemoveCompleted, router]);

  const handleDeleteClick = () => {
    // saga action으로 대체
    // dispatch(requestRemoveDiary(+id)); // 전체 조회일 때
    // dispatch(requestRemoveDiaryPaging(+id)); // 숫자 페이징일 때
    dispatch(requestRemoveDiary(+id));
    // dispatch(removeDiary(+id)); // id값만 넣어서 삭제
    // history.push("/diarys"); // 목록화면으로 이동
    router.push("/mypage/diary/diary-list");
  };

  return (
    <div className={styles.div1}>
      <AppBar />
      <div className={styles.div2}>
        <div className={styles.div3}>
          <h2 className={styles.h2}>일지 상세</h2>
        </div>
        <form className="mx-auto">
          {diaryItem && (
            <table className={styles.table}>
              <tbody>
                <tr className={styles.tr}>
                  <th className={styles.th}>날짜</th>
                  <td className={styles.td}>
                    {getTimeString(diaryItem.diaryCreateTime)}
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>회원명</th>
                  <td className={styles.td}>{diaryItem.memberName}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>아침식단</th>
                  <td className={styles.td}>{diaryItem.diaryMorning}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>점심식단</th>
                  <td className={styles.td}>{diaryItem.diaryLunch}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>저녁식단</th>
                  <td className={styles.td}>{diaryItem.diaryDinner}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>운동내역</th>
                  <td className={styles.td}>{diaryItem.diaryRoutine}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>문의사항</th>
                  <td className={styles.td}>{diaryItem.diaryRequest}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>담당 강사</th>
                  <td className={styles.td}>{diaryItem.trainerName}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>강사 피드백</th>
                  <td className={styles.td}>{diaryItem.trainerFeedback}</td>
                </tr>
              </tbody>
            </table>
          )}
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
          <div>
            <button
              className={styles.btn2}
              onClick={() => {
                router.push(`/mypage/diary/edit/${id}`);
              }}
            >
              수정
            </button>
            <button
              className={styles.btn3}
              onClick={() => {
                handleDeleteClick();
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiaryDetail;
