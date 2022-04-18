import React from "react";
import styles from "../../styles/Select.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLogo from "../../components/homelogo";

const Select = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeLogo />
        <span className={styles.span}>헬스장 찾기</span>
        <div className={styles.select}>
          <select
            className="form-select mt-5"
            // size={3}
            aria-label="Default select example"
            style={{ width: "80%" }}
          >
            <option value="Sido">시/도 선택</option>
            <option value="서울">서울특별시</option>
            <option value="부산">부산광역시</option>
            <option value="대구">대구광역시</option>
            <option value="인천">인천광역시</option>
            <option value="광주">광주광역시</option>
            <option value="대전">대전광역시</option>
            <option value="울산">울산광역시</option>
            <option value="세종">세종특별자치시</option>
            <option value="경기">경기도</option>
            <option value="강원">강원도</option>
            <option value="충북">충청북도</option>
            <option value="충남">충청남도</option>
            <option value="전북">전라북도</option>
            <option value="전남">전라남도</option>
            <option value="경북">경상북도</option>
            <option value="경남">경상남도</option>
            <option value="제주">제주도</option>
          </select>
          <select
            className="form-select mt-3 size-4"
            aria-label="Default select example"
            style={{ width: "80%" }}
          >
            <option value="Gungu">군/구 선택</option>
            <option value="">강남구</option>
            <option value="">강동구</option>
            <option value="">강북구</option>
            <option value="">강서구</option>
            <option value="">관악구</option>
            <option value="">광진구</option>
            <option value="">구로구</option>
            <option value="">금천구</option>
            <option value="">노원구</option>
            <option value="">도봉구</option>
            <option value="">동대문구</option>
            <option value="">동작구</option>
            <option value="">마포구</option>
            <option value="">서대문구</option>
            <option value="">서초구</option>
            <option value="">성동구</option>
            <option value="">성북구</option>
            <option value="">송파구</option>
            <option value="">양천구</option>
            <option value="">영등포구</option>
            <option value="">용산구</option>
            <option value="">은평구</option>
            <option value="">종로구</option>
            <option value="">중구</option>
            <option value="">중랑구</option>
          </select>
          <br />
          <button
            type="button"
            className="btn btn-outline-dark btn-sm mt-2"
            onClick={() => {
              router.push("/gagym/gym-list");
            }}
          >
            선택
          </button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Select;
