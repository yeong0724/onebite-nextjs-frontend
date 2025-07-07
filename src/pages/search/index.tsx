import SearchableLayout from "@/components/SearchableLayout";
import BookItem from "@/components/BookItem";
import books from "@/mock/books.json";
// import { useRouter } from "next/router";

export default function Search() {
  // const router = useRouter();
  // const { keyword = "" } = router.query as { keyword?: string };

  // 상태, 로직
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Search.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
