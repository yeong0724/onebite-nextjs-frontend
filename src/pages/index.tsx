import { useEffect } from "react";
import { InferGetStaticPropsType } from "next";
import SearchableLayout from "@/components/SearchableLayout";
import BookItem from "@/components/BookItem";
import style from "@/pages/index.module.css";
import fetchBooks from "@/lib/fetchBooks";
import fetchRandomBooks from "@/lib/fetchRandomBooks";

/**
 * ISR (Incremental Static Regeneration) - 증분 정적 재생성 방식
 * - SSG 방식으로 생성된 정적 페이지를 일정 시간을 주기로 다시 생성하는 기술
 */
export const getStaticProps = async () => {
  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  /**
   * props: 반드시 props 형태로 객체를 반환해야한다.
   * revalidate: ISR 재검증 시간 주기 옵션
   */
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
