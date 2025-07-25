import Link from "next/link";
import type { BookData } from "@/types";
import style from "@/components/BookItem.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  // description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <img src={coverImgUrl} alt={`${title} 책 표지`} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
