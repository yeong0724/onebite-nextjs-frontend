import { ReactNode } from "react";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import SearchableLayout from "@/components/SearchableLayout";
import BookItem from "@/components/BookItem";
import fetchBooks from "@/lib/fetchBooks";

/**
 * @param context - 현재 브라우저로부터 받은 요청에 대한 모든 정보가 담긴 객체
 */
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { q = "" } = context.query as { q?: string };
  const searchBooks = await fetchBooks(q);

  return {
    props: {
      searchBooks,
    }, // 빈 객체를 반환하여 페이지 컴포넌트에 전달
  };
};

export default function Search({
  searchBooks,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  // 상태, 로직
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
