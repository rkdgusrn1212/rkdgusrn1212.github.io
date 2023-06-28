import Header from 'components/common/CommonHeader';
import Footer from 'components/common/CommonFooter';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostList from 'components/post/PostList';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

const HomePage = () => (
  <>
    <Stack className="vh-100">
      <Header activeHref={'/'} />
      <Container fluid="md">
        <Row>
          <Col xs={12} md={6}>
            <PostList pageSize={5} pgntHalfSize={2} />
          </Col>
          <Col xs={12} md={6}>
            <Stack
              direction="horizontal"
              gap={2}
              className="flex-wrap mt-2 mb-2"
            >
              <Card style={{ width: '18rem', flexShrink: 0 }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem', flexShrink: 0 }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <Card style={{ width: '18rem', flexShrink: 0 }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Stack>
          </Col>
        </Row>
      </Container>
    </Stack>
    <Footer />
  </>
);
export default HomePage;
