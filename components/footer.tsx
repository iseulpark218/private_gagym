import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { useRouter } from "next/router";
import { Navbar, Container, Nav } from "react-bootstrap";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="">
      <div className={styles.div1}>
        {/*-----------------div2-----------------*/}
        <div className={styles.div2}>
          <div className={styles.div22}>
            <span className="mb-2">[ 제휴 및 서비스 이용문의 ]</span>
            <span className="mb-1">AM 10:00 - PM 07:00</span>
            <span>토/일/공휴일 휴무</span>
          </div>
          <div className={styles.div22}>
            <span>(주) 가짐</span>
            <span>서울특별시 강남구 강남대로 428</span>
            <span>대표 : 이희균, 박이슬, 이효정</span>
            <span>사업자번호 : 123-45-6789</span>
            <span>통신판매번호 : 제2021-서울강남-1215호</span>
            <span>contact@gagym.co.kr</span>
          </div>
        </div>

        {/*-----------------div3-----------------*/}
        <div className={styles.div3}>
          <div>
            <a target="_blank" href="" className={styles.div33}>
              <span>이용약관</span>
            </a>
          </div>
          <div>
            <a target="_blank" href="" className={styles.div33}>
              <span>개인정보처리방침</span>
            </a>
          </div>
          <div>
            <a target="_blank" href="" className={styles.div33}>
              <span>위치정보이용약관</span>
            </a>
          </div>
          <div>
            <a href="/home/select" className={styles.div33}>
              <span>헬스장 찾기</span>
            </a>
          </div>
        </div>

        {/*-----------------div4-----------------*/}
        <div className={styles.div4}>
          <span>Copyright ⓒ Gagym Co., Ltd. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
