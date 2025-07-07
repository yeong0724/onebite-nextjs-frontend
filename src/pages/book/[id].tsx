import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetchOneBook";
import style from "@/pages/book/[id].module.css";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context?.params ?? ({} as { id?: string });
  const book = await fetchOneBook(Number(id));

  return {
    props: {
      book,
    },
  };
};

/**
 * 1. Catch All Segment
 * - [...id].tsx
 * - 모든 경로를 처리할 수 있는 페이지
 *
 *
 * 2. Optional Catch All Segment
 * - [[...id]].tsx
 * - /book 에 대한 모든 경로를 처리할 수 있는 페이지
 */
export default function Book({
  book,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const {
    // id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book || {};

  // 상태, 로직
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
