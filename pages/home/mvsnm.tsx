import React from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLogo from "../../components/homelogo";

const Mvsnm = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeLogo />
        <div className="d-flex  mt-4 ms-2">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              router.push(`/home/m`);
            }}
          >
            회원
          </button>
          <button
            type="button"
            className="btn btn-outline-dark me-1 mx-1"
            onClick={() => {
              router.push("/home/select");
            }}
          >
            비회원
          </button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Mvsnm;
