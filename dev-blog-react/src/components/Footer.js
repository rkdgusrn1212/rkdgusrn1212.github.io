import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";

function Footer() {
  return (
    <Container fluid="true" className="bg-dark bg-gradient">
      <Row className="p-1">
        <Col xs="12" sm="5" className="p-2">
          <Row className="p-3">
            <Col><h1 className="text-light text-center">9Log</h1></Col>
          </Row>
          <Row className="p-3">
            <Col className="d-flex flex-wrap justify-content-evenly">
              <a className="text-light" href=".\">깃헙</a>
              <a className="text-light" href=".\">백준</a>
              <a className="text-light" href=".\">구 블로그</a>
            </Col>
          </Row>
          <Row className="p-3">
            <Col className="d-flex flex-wrap">
              <Badge className="m-2">Spring</Badge>
              <Badge className="m-2">JPA</Badge>
              <Badge className="m-2">Java</Badge>
              <Badge className="m-2">Oracle</Badge>
              <Badge className="m-2">MyBatis</Badge>
              <Badge className="m-2">Hibernate</Badge>
              <Badge className="m-2">Bootstrap</Badge>
              <Badge className="m-2">React</Badge>
              <Badge className="m-2">MySQL/MariaDB</Badge>
              <Badge className="m-2">JSP/Servlet</Badge>
            </Col>
          </Row>
        </Col>
        <Col xs="12" sm="7" className="p-2">
          <Table borderless className="text-light">
            <thead>
              <tr>
                <th>Posts</th>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Java</td>
                <td>오목판</td>
              </tr>
              <tr>
                <td>Algorithm</td>
                <td>Tasty Way</td>
              </tr>
              <tr>
                <td>Spring</td>
                <td>두부북쉐어</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
