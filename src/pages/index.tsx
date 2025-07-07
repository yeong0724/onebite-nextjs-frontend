import { InferGetStaticPropsType } from "next";
import SearchableLayout from "@/components/SearchableLayout";
import BookItem from "@/components/BookItem";
import style from "@/pages/index.module.css";
import fetchBooks from "@/lib/fetchBooks";
import fetchRandomBooks from "@/lib/fetchRandomBooks";
import Head from "next/head";

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
  return (
    <>
      <Head>
        <title>Onebite Books</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="Onebite Books" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요."
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
