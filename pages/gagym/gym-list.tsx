import React from "react";
import Image from "next/image";
import styles from "../../styles/Gymlist.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";
import Footer from "../../components/footer";
import Pagination from "../../components/pagination";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
// import { Pagination } from "react-bootstrap";

interface GymDetail {
  albumId: number;
  id: number;
  gymName: string;
  gymCoNum: string;
  gymLocateSi: string;
  gymLocateGunGu: string;
  gymAddress: string;
  gymPhoneNum: string;
  gymTime: string;
  gymService: string;
  gymPhoto: string;
  fileName: string;
  fileType: string;
  gym1DayPrice: string;
  gym3DayPrice: string;
  gym7DayPrice: string;
  gymMonthPrice: string;
  gym3MonthPrice: string;
  gym6MonthPrice: string;
  gymYearPrice: string;
}

interface gymListProp {
  gymList: GymDetail[];
}

const GymList = ({ gymList }: gymListProp) => {
  const router = useRouter();

  return (
    <div>
      <AppBar />
      <div className={styles.svg1} style={{ margin: "30px 0 20px 120px" }}>
        <div className={styles.svg11}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className={styles.svg111}
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <span className={styles.svg111}>
            <Link href="/home/select" passHref>
              <a className={styles.svg1111}>서울시</a>
            </Link>
          </span>
        </div>
      </div>
      <div>
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ margin: "40px 0 0 0" }}
        >
          {gymList.map((item, index) => (
            <div
              key={`photo-item-${index}`}
              className={styles.div}
              style={{
                boxShadow: "0 2px 5px 0",
                width: "calc((100% - 10rem) / 5)",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`/gagym/detail/${item.id}`);
                }}
              >
                <Image
                  src={item.gymPhoto}
                  alt={item.gymName}
                  layout="responsive"
                  objectFit="cover" //써야됨 or none
                  width={100}
                  height={100}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.gymName}</h5>
                  <h6 className="card-title">{item.gymAddress}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center m-5">
        {/* <Pagination /> */}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  // axios함수는 API 서버에 get method로 요청을 보내고 그 결과를 프로미스로 반환받음.

  // GET방식은 서버에서 어떤 데이터를 가져와서 보여줄것인가를 정하는 용도로 쓴다.
  // 주소에 있는 쿼리스트링을 활용해 정보를 전달하는 것이고 GET 메서드는 값이나 상태등을 직접 바꿀수 없다.
  // 응답은 json 형태로 넘어온다.

  const res = await axios.get<GymDetail[]>(
    "http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/gagym/gym-list"
  );
  const gymList = res.data;

  return { props: { gymList } };
}

export default GymList;
