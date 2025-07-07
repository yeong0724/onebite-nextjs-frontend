import SearchableLayout from "@/components/SearchableLayout";
import BookItem from "@/components/BookItem";
import style from "@/pages/index.module.css";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetchBooks";
import fetchRandomBooks from "@/lib/fetchRandomBooks";

/**
 * 1. 약속된 getServerSideProps 함수를 export 함으로써 해당 페이지는 서버사이드 렌더링이 가능하다
 * 2. 오직 Server Side에서만 실행되는 함수로, 단 한번 호출되며 브라우져를 새로고침하여도 재실행 되지 않는다.
 * 3. 해당 페이지의 컴포넌트보다 먼저 실행되어서, 필요한 데이터를 API 통신으로 부터 가져올 수 있다.
 */
export const getServerSideProps = async () => {
  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  // 반드시 props 형태로 객체를 반환해야한다.
  return {
    props: {
      allBooks,
      recommendBooks,
    },
  };
};

export default function Home({
  allBooks,
  recommendBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  /**
   * Next.js는 페이지를 서버에서 먼저 렌더링한 후 클라이언트로 전송
   * Node.js 서버 환경에서는 window가 정의되지 않기 때문에 undefined 에러가 발생한다.
   */
  // console.log("window.location:", window.location);

  useEffect(() => {}, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
