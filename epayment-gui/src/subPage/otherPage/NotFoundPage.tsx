import { Container, Row, Col } from "react-bootstrap"
import { AppUrl } from "../../commonComponent/objectType/AppUrl";
import { Link } from "react-router-dom";


const NotFoundPage = () => {

    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col md={3}></Col>
                <Col className='mt-3 justify-content-md-center' md={8}>
                    <div className="ExText">404 Not Found</div>
                </Col>
                <Col></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={3}></Col>
                <Col className='font-36 alignCenter' md={10}>
                    <div className=""><Link to={AppUrl.Home}>To Home</Link></div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}

export default NotFoundPage;