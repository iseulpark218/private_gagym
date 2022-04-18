import "../styles/bootstrap-custom.scss";
import type { AppProps } from "next/app";
import "../styles/font.css";
import { Provider } from "react-redux"; // react 앱에 redux store를 제공해줌
import { store } from "../provider"; // redux store
// _app은 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트로, 페이지에 적용할 공통 레이아웃의 역할을 합니다.
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;

/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
*/
