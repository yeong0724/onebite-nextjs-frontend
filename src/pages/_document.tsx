import { Html, Head, Main, NextScript } from "next/document";

/**
 * 모든 페이지에 공통적으로 적용이 되어야 하는 Next.js App의 HTML 코드를 설정하는 컴포넌트
 * 기존 React의 index.html 파일과 유사한 역할을 한다.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
