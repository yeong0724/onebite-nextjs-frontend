import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import fetchOneBook from "@/lib/fetchOneBook";
import style from "@/pages/book/[id].module.css";

export const getStaticPaths = () => {
  return {
    // 1 ~ 3번까지의 책에 대한 페이지를 빌드 단계에서 사전에 생성 해놓기 때문에 자주 호출 되는 id 값에 대해서는 빠르게 서비스 제공이 가능
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    /**
     * [fallback 옵션]
     * 1. true : SSR 방식 + fallback
     *   - paths에 대한 페이지는 빌드 단계에서 준비됐으므로 바로 보여준다.
     *   - fallback 상태일땐 로딩 페이지를 우선 보여주고 데이터가 로딩되면 페이지를 업데이트 함
     * 2. false : 404 Notfound
     *   - 데이터가 없는 경우 404 페이지를 보여줌
     * 3. blocking : SSR 방식
     *   - paths 이외의 경로에 대해서는 SSR을 통해서 페이지를 생성, 실제로 .next 빌드 폴데에 보면 추가로 생성 되어 있음을 확인할 수 있음)
     */
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context?.params ?? ({} as { id?: string });
  const book = await fetchOneBook(Number(id));

  if (!book) {
    // book 데이터가 없는 경우 Next.js는 404 페이지로 자동으로 리다이렉션 시켜준다.
    return {
      notFound: true,
    };
  }

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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

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
