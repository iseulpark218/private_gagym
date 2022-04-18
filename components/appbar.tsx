import Link from "next/link";
import styles from "../styles/Appbar.module.css";
import { Navbar, Container, Nav } from "react-bootstrap";

/* next/link 안에 a태그를 주어서 스타일 먹인다 */

const AppBar = () => {
  return (
    <div className={styles.appbar}>
      <Navbar className={styles.appbar1} expand="lg">
        <Container className="w-100">
          <Navbar.Brand>
            <Link href="/" passHref>
              <img
                style={{ width: "100px" }}
                src="/logo.png"
                alt="logo"
                className={styles.appBarLogo}
              />
            </Link>
          </Navbar.Brand>
          <div className="d-flex justify-content-end align-items-center">
            <Nav className="me-auto">
              <Nav.Item className="mx-3">
                <Link href="/" passHref>
                  <a className={styles.txt}>HOME</a>
                </Link>
              </Nav.Item>
              <Nav.Item className="mx-3">
                <Link href="/home/select">
                  <a className={styles.txt}>헬스장찾기</a>
                </Link>
              </Nav.Item>
              <Nav.Item className="mx-3">
                <Link href="/mypage/mypage">
                  <a className={styles.txt}>마이페이지</a>
                </Link>
              </Nav.Item>
              {/* <Nav.Item className="mx-3">
                <Link href="/mypage/diary/diary-list">
                  <a className={styles.txt}>PT일지</a>
                </Link>
              </Nav.Item> */}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppBar;
