import React from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLogo from "../../components/homelogo";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const M = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeLogo />
        <button type="button" className="btn btn-dark mt-3">
          회원
        </button>
        <div className="mt-4 row-vh d-flex flex-column align-items-center">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              router.push(`/home/select`);
            }}
          >
            헬스장 찾기
          </button>
          <button
            type="button"
            className="btn btn-outline-dark mt-1"
            onClick={() => {
              router.push(`/home/login`);
            }}
          >
            내 예약 및 PT일지 관리
          </button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default M;
