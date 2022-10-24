import { ComponentType, Fragment } from 'react';

interface Props {
  container?: ComponentType<any>;
  title?: string;
  description?: string;
  imageUrl?: string;
}

/**
 * @name OpenGraph
 * @description
 * 현재 페이지에 [OpenGraph](https://nowonbun.tistory.com/517) (공유 시 타이틀, 설명, 이미지) 를 적용할 수 있도록 하는 컴포넌트입니다.
 * @example
 * <OpenGraph
 *    title="공동인증서 없이 바로 등본 떼기 📄"
 *    description="가장 가까운 토스 주민센터에서 가능해요."
 *    imageUrl="https://static.toss.im/assets/paper0/pc_og.png"
 * />
 */
export function OpenGraph({ container: Container = Fragment, title, description, imageUrl }: Props) {
  return (
    <Container>
      {title !== undefined && (
        <>
          <meta property="og:title" content={title} />
        </>
      )}
      {description !== undefined && (
        <>
          <meta property="og:description" content={description} />
        </>
      )}
      {imageUrl !== undefined && (
        <>
          <meta property="og:image" content={imageUrl} />
        </>
      )}
    </Container>
  );
}
