import { ReactNode } from "react";
import Link from "next/link";
import style from "@/components/GlobalLayout.module.css";

type GlobalLayoutType = {
  children: ReactNode;
};

export default function GlobalLayout({ children }: GlobalLayoutType) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @winterlood</footer>
    </div>
  );
}
