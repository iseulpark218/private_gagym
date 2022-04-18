import reservationReducer, {
  addReservation,
  removeReservation,
  modifyReservation,
  initialReservationItem,
  initialReservation,
  initialCompleted,
  initialPagedReservation,
  initialNextReservation,
  ReservationList,
  ReservationPage
} from "../../provider/modules/reservation";

import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  call,
  put,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  ReservationItemResponse,
  ReservationItemRequest,
  ReservationPagingReponse
} from "../../api/reservation";
import { AxiosResponse } from "axios";
import { endProgress, startProgress } from "../../provider/modules/progress";
import { addAlert } from "../../provider/modules/alert";

/* ========= saga action Payload 타입 =============== */
export interface PageRequest {
  page: number;
  size: number;
}

/* ========= saga action을 생성하는 부분 =============== */
export const requestAddReservation = createAction<ReservationList>(
  `${reservationReducer.name}/requestAddReservation`
);
// // 더보기 페이징에서 추가할 때
export const requestAddReservationNext = createAction<ReservationList>(
  `${reservationReducer.name}/requestAddReservationNext`
);

// reservation을 가져오는 action
export const requestFetchReservation = createAction(
  `${reservationReducer.name}/requestFetchReservtaion`
);

// reservation을 페이징으로 가져오는 action
export const requestFetchPagingReservation = createAction<PageRequest>(
  `${reservationReducer.name}/requestFetchPagingReservation`
);

// 다음 페이지 reservation을 가져오는 action
export const requestFetchNextReservation = createAction<PageRequest>(
  `${reservationReducer.name}/requestFetchNextReservation`
);

// // 1건의 reservation을 가져오는 action
export const requestFetchReservationItem = createAction<number>(
  `${reservationReducer.name}/requestFetchReservationItem`
);

// reservation을 삭제하는 action
export const requestRemoveReservation = createAction<number>(
  `${reservationReducer.name}/requestRemoveReservation`
);

// photo를 삭제하는 action(더보기페이징일때)
export const requestRemoveReservationNext = createAction<number>(
  `${reservationReducer.name}/requestRemoveReservation`
);

// reservation을 수정하는 action
export const requestModifyReservation = createAction<ReservationList>(
  `${reservationReducer.name}/requestModifyReservation`
);

/* ========= saga action을 처리하는 부분 =============== */

// 서버에 POST로 데이터를 보내 추가하고, redux state를 변경
function* addData(action: PayloadAction<ReservationList>) {
  yield console.log("--addData--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const reservationItemPayload = action.payload;

    // spinner 보여주기
    yield put(startProgress());

    // rest api로 보낼 요청객체
    const reservationItemRequest: ReservationItemRequest = {
      gymName: reservationItemPayload.gymName,
      trainerName:reservationItemPayload.trainerName,
      boughtService:reservationItemPayload.boughtService,
      memberName: reservationItemPayload.memberName,
      memberPhone: reservationItemPayload.memberPhone,
      memberRequest: reservationItemPayload.memberRequest,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(photoItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<ReservationItemResponse> = yield call(
      api.add,
      reservationItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const reservationItem: ReservationList = {
      id: result.data.id,
      gymName: result.data.gymName,
      trainerName: result.data.trainerName,
      boughtService: result.data.boughtService,
      memberName: result.data.memberName,
      memberPhone: result.data.memberPhone,
      memberRequest: result.data.memberRequest,
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addReservation(reservationItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

function* addDataNext(action: PayloadAction<ReservationList>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const reservationItemPayload = action.payload;

    // spinner 보여주기
    yield put(startProgress());

    // rest api로 보낼 요청객체
    const reservationItemRequest: ReservationItemRequest = {
      gymName: reservationItemPayload.gymName,
      boughtService: reservationItemPayload.boughtService,
      trainerName: reservationItemPayload.trainerName,
      memberName: reservationItemPayload.memberName,
      memberPhone: reservationItemPayload.memberPhone,
      memberRequest: reservationItemPayload.memberRequest,
    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함

    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(photoItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<ReservationItemResponse> = yield call(
      api.add,
      reservationItemRequest
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
    const reservationItem: ReservationList = {
      id: result.data.id,
      gymName: result.data.gymName,
      boughtService: result.data.boughtService,
      trainerName: result.data.trainerName,
      memberName: result.data.memberName,
      memberPhone: result.data.memberPhone,
      memberRequest: result.data.memberRequest,
    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addReservation(reservationItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
    );
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

// Redux 사이드 이펙트
// 1. api 연동
// 2. 파일처리
// 3. 처리중 메시지 보여주기/감추기
// 4. 에러메시지 띄우기
// 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
function* fetchData() {
  yield console.log("--fetchData--");

  // spinner 보여주기
  yield put(startProgress());

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<ReservationItemResponse[]> = yield call(api.fetch);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 응답데이터배열을 액션페이로드배열로 변환
  // PhotoItemReponse[] => PhotoItem[]
  const reservation = result.data.map(
    (item) =>
      ({
        id: item.id,
        gymName: item.gymName,
        trainerName: item.trainerName,
        boughtService: item.boughtService,
        memberName: item.memberName,
        memberPhone: item.memberPhone,
        memberRequest: item.memberRequest
      } as ReservationList)
  );

  // state 초기화 reducer 실행
  yield put(initialReservation(reservation));
}

// 더보기 목록 조회
// function* fetchNextData(action: PayloadAction<PageRequest>) {
//   yield console.log("--fetchNextData--");

//   const page = action.payload.page;
//   const size = action.payload.size;

//   // spinner 보여주기
//   yield put(startProgress());

//   try {
//     // 백엔드에서 데이터 받아오기
//     const result: AxiosResponse<ReservationPagingReponse> = yield call(
//       api.fetchPaging,
//       page,
//       size
//     );

//     // spinner 사라지게 하기
//     yield put(endProgress());

//     // 받아온 페이지 데이터를 Payload 변수로 변환
//     const reservationPage: ReservationPage = {
//       // 응답데이터배열을 액션페이로드배열로 변환
//       // PhotoItemReponse[] => PhotoItem[]
//       data: result.data.content.map(
//         (item) =>
//           ({
//             id: item.id,
//             gymName: item.gymName,
//             trainerName: item.trainerName,
//             boughtService: item.boughtService,
//             price:item.price,
//             memberName: item.memberName,
//             memberPhone: item.memberPhone,
//             memberRequest: item.memberRequest
//            } as ReservationList)
//       ),
//       totalElements: result.data.totalElements,
//       totalPages: result.data.totalPages,
//       page: result.data.number,
//       pageSize: result.data.size,
//       isLast: result.data.last,
//     };

//     // state 초기화 reducer 실행
//     yield put(initialNextReservation(reservationPage));
//   } catch (e: any) {
//     // 에러발생
//     // spinner 사라지게 하기
//     yield put(endProgress());
//     // alert박스를 추가해줌
//     yield put(
//       addAlert({ id: nanoid(), variant: "danger", message: e.message })
//     );
//   }
// }
// 1건의 데이터만 조회
function* fetchDataItem(action: PayloadAction<number>) {
  yield console.log("--fetchDataItem--");

  const id = action.payload;

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<ReservationItemResponse> = yield call(
    api.get, id);

  const reservation = result.data;
  if (reservation) {
    // state 초기화 reducer 실행
    yield put(initialReservationItem(reservation));
  }
}

// 더보기 목록 조회
function* fetchNextData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchNextData--");

  const page = action.payload.page;
  const size = action.payload.size;

  // spinner 보여주기
  yield put(startProgress());

  try {
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<ReservationPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    // spinner 사라지게 하기
    yield put(endProgress());

    // 받아온 페이지 데이터를 Payload 변수로 변환
    const reservationPage: ReservationPage = {
      // 응답데이터배열을 액션페이로드배열로 변환
      // PhotoItemReponse[] => PhotoItem[]
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            gymName: item.gymName,
            boughtService: item.boughtService,
            trainerName: item.trainerName,
            memberName: item.memberName,
            memberPhone: item.memberPhone,
            memberRequest: item.memberRequest,
          } as ReservationList)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    // state 초기화 reducer 실행
    yield put(initialNextReservation(reservationPage));
  } catch (e: any) {
    // 에러발생
    // spinner 사라지게 하기
    yield put(endProgress());
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

// 삭제처리
function* removeData(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  // id값
  const id = action.payload;

  // spinner 보여주기
  yield put(startProgress());

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeReservation(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());
}

// 수정처리
function* modifyData(action: PayloadAction<ReservationList>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const reservationItemPayload = action.payload;

  // // spinner 보여주기
  yield put(startProgress());

  // rest api로 보낼 요청객체
  const reservationItemRequest: ReservationItemRequest = {
    gymName: reservationItemPayload.gymName,
    trainerName:reservationItemPayload.trainerName,
    boughtService:reservationItemPayload.boughtService,
    memberName: reservationItemPayload.memberName,
    memberPhone: reservationItemPayload.memberPhone,
    memberRequest: reservationItemPayload.memberRequest,
  };

  const result: AxiosResponse<ReservationItemResponse> = yield call(
    api.modify,
    reservationItemPayload.id,
    reservationItemRequest
  );

  // // spinner 사라지게 하기
  yield put(endProgress());

  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
  const reservationItem: ReservationList = {
    id: result.data.id,
    gymName:result.data.gymName,
    trainerName:result.data.trainerName,
    boughtService:result.data.boughtService,
    memberName: result.data.memberName,
    memberPhone: result.data.memberPhone,
    memberRequest: result.data.memberRequest,
  };

  // state 변경
  yield put(modifyReservation(reservationItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

/* ========= saga action을 감지(take)하는 부분 =============== */
// reservation redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 generator 함수로 작성
export default function* reservationSaga() {
  // takeEvery(처리할액션, 액션을처리할함수)
  // 동일한 타입의 액션은 모두 처리함
  yield takeEvery(requestAddReservation, addData);
  yield takeEvery(requestAddReservationNext, addDataNext);
  yield takeLatest(requestFetchReservation, fetchData);
  yield takeEvery(requestFetchReservationItem, fetchDataItem);
  yield takeLatest(requestFetchNextReservation, fetchNextData);
  yield takeEvery(requestRemoveReservation, removeData);
  yield takeEvery(requestRemoveReservationNext, removeData);
  yield takeEvery(requestModifyReservation, modifyData);
}