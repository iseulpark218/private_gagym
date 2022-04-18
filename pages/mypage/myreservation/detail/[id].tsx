import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../../provider";
import {
  requestFetchReservationItem,
  requestFetchReservation,
  requestRemoveReservation,
} from "../../../../middleware/modules/reservation";
import Layout from "../../../../components/layout";
import styles from "../../../../styles/RsvCreate.module.css";
const ReservationDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const id = router.query.id as string;
  
  const reservation = useSelector((state: RootState) => state.reservation);
  let reservationItem = useSelector((state: RootState) =>
    state.reservation.data.find((item) => item.id === +id)
  );

  useEffect(() => {
    if (!reservation.isFetched) {
      dispatch(requestFetchReservation());
    }
  }, [dispatch, reservation.isFetched]);

  if (id) {
    // redux에 데이터가 없으면
    if (!reservationItem) {
      // 1건에 데이터를 가져와 store에 추가함
      dispatch(requestFetchReservationItem(+id));
    }
  }

  // 삭제 여부 감지 및 가져오기
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.reservation.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/mypage/mypage");
  }, [isRemoveCompleted, router]);

  const handDeleteClick = () => {
    // saga action으로 대체
    dispatch(requestRemoveReservation(+id)); // 전체 조회일 때
    // dispatch(requestRemovePhotoPaging(+id)); // 숫자 페이징일 때
    // dispatch(requestRemoveReservationNext(+id)); // 더보기 페이징일 때
  };
  return(
    <div>
    <Layout>
 <div style={{ width: "60vw" }} className="mx-auto">
 <div className="my-5 d-flex justify-content-center">
    <h2>예약 상세</h2></div>
    <div className="my-5 d-flex justify-content-center">
    <table>
    <tbody>
    <tr><th>예약번호</th><td>{reservationItem?.id}</td></tr>
    <tr><th>헬스장명</th><td>{reservationItem?.gymName}</td></tr>
    <tr><th>강사</th><td >{reservationItem?.trainerName}</td></tr>
    <tr><th>이용권</th><td >{reservationItem?.boughtService}</td></tr>
    <tr><th>예약자 명</th><td>{reservationItem?.memberName}</td></tr>
    <tr><th>예약자 연락처</th><td>{reservationItem?.memberPhone}</td></tr>
    <tr><th>문의사항</th><td>{reservationItem?.memberRequest}</td></tr>
    </tbody>
    </table>
    </div>
    <div className="d-flex justify-content-center">
      <div className="mx-1"><button className={styles.btnrsv}
      onClick={() => {
        router.push(`/mypage/myreservation/edit/${id}`);
      }}>수정</button></div>
      <div className="mx-1"><button className={styles.btnrsv} onClick={() => {
                handDeleteClick();
              }} >예약취소</button></div>
              </div>
    </div>
    </Layout>
    </div>
  )
}
export default ReservationDetail;