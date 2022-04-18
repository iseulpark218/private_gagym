import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../../provider";
import { requestFetchReservation, requestModifyReservation } from "../../../../middleware/modules/reservation";
import { ReservationList } from "../../../../provider/modules/reservation";
// import reservationApi, {ReservationItemResponse} from "../../../../api/reservation";

import Layout from "../../../../components/layout";
import styles from "../../../../styles/RsvCreate.module.css";

const ReservationEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const id = router.query.id as string;
  const reservation = useSelector((state: RootState) => state.reservation);
  const reservationItem = useSelector((state: RootState) =>
    state.reservation.data.find((item) => item.id === +id)
  );

  useEffect(() => {
    if (!reservation.isFetched) {
      dispatch(requestFetchReservation());
    }
  }, [dispatch, reservation.isFetched]);

  const isModifyCompleted = useSelector(
    (state: RootState) => state.reservation.isModifyCompleted
  );

  const nameEdit = useRef() as MutableRefObject<HTMLInputElement>;
  const telEdit = useRef() as MutableRefObject<HTMLInputElement>;
  const requestEdit = useRef() as MutableRefObject<HTMLTextAreaElement>;


  useEffect(() => {
    isModifyCompleted && router.push(`/mypage/mypage`);
  }, [isModifyCompleted, router]);

  // ------ 이벤트에 대해서 처리하는 부분 --------
  const handleSave = () => {
    if (reservationItem) {
      const item = {...reservationItem};
      item.memberName = nameEdit.current ? nameEdit.current.value : "";
      item.memberPhone = telEdit.current? telEdit.current.value : "";
      item.memberRequest = requestEdit.current? requestEdit.current.value : "";

      // reducer로 state 수정 및 목록으로 이동
      saveItem(item);
    }
  };

  const saveItem = (item: ReservationList) => {
    dispatch(requestModifyReservation(item)); // saga action으로 대체
  };
  return(
    <Layout>
  <div style={{ width: "60vw" }} className="mx-auto">
    <div className="d-flex justify-content-center my-5">
    <h2>예약자 정보 수정</h2></div>
    <div className="my-2 d-flex justify-content-center">
    <table>
    <tr><th>예약번호</th><td>{reservationItem?.id}</td></tr>
    <tr><th>헬스장명</th><td>{reservationItem?.gymName}</td></tr>
    <tr><th>강사</th><td >{reservationItem?.trainerName}</td></tr>
    <tr><th>이용권</th><td >{reservationItem?.boughtService}</td></tr>
    <tr><th>예약자 명</th><td><input className="form-control" type="text" defaultValue={reservationItem?.memberName} ref={nameEdit}/></td></tr>
    <tr><th>예약자 연락처</th><td><input className="form-control" type="text" defaultValue={reservationItem?.memberPhone} ref={telEdit} /></td></tr>
    <tr><th>문의사항</th><td><textarea style={{height:"20vh"}}className="form-control" defaultValue={reservationItem?.memberRequest} ref={requestEdit}/></td></tr>
    </table>
    </div>
    <div className="d-flex justify-content-center">
    <div className="mx-1">
      <button className={styles.btnrsv} onClick={() => {
                  router.push(`/mypage/mypage`);
                }} >목록</button></div>
                <div className="mx-1"><button
            className={styles.btnrsv}
            onClick={() => {handleSave();}}>
            <i className="bi bi-check" />
            저장
          </button></div>
                </div>
    </div>
    </Layout>
  )
}
export default ReservationEdit;