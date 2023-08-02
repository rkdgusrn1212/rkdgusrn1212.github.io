import { PropsWithChildren } from 'react';
import { Container, Stack } from 'react-bootstrap';
import Footer from 'components/Footer';
import Header, { HeaderProps } from 'components/Header';

/**
 * 페이지 헤더와 컨텐츠를 뷰포트에 고정하고 컨텐츠의 끝에서부터야 푸터로 스크롤 가능하게 하는 헤더와 푸터가 더해진 컨테이너
 */
const ScrollViewportContainer: React.FC<PropsWithChildren<HeaderProps>> = ({
  activeHref,
  children,
}: PropsWithChildren<HeaderProps>) => {
  return (
    <>
      <Stack className="vh-100 overflow-scroll">
        <Header activeHref={activeHref} />
        <Container fluid="md" className="flex-grow-1 h-25">
          {children}
        </Container>
      </Stack>
      <Footer />
    </>
  );
};
export default ScrollViewportContainer;
