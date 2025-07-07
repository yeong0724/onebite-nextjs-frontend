import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "@/components/SearchableLayout.module.css";

type SearchableLayoutProps = {
  children: ReactNode;
};

export default function SearchableLayout({ children }: SearchableLayoutProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { q = "" } = router.query as { q?: string };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
