import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import SearchableLayout from "@/components/SearchableLayout";
import BookItem from "@/components/BookItem";
import fetchBooks from "@/lib/fetchBooks";

export default function Search() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const { q } = router?.query ?? ({} as { q?: string });

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  // 상태, 로직
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
