import { Card, Col, Container, Row } from 'react-bootstrap'
import { Button } from '@mui/material'
import { useContext, useState } from 'react';
import { UserInfoContext } from '../../commonComponent/UserInfoContext';

enum pageMode {
    DEFAULT = 'default',
    LOADING = 'Loading'
}

interface MyAddress_state {
    pageMode: pageMode,
    allAddress?: string[]

}

const  MyAddressPage = () => {

    const [userInfo] = useContext(UserInfoContext);

    const [state, setState] = useState<MyAddress_state>({
        pageMode: pageMode.DEFAULT
    });




    return(
        <Container className='mt-3'>
            <Card className='noBorderLine'>
                <Row>
                    <Col md={4} className='mt-1'>{"My current address(s)"}</Col>
                    <Col></Col>
                    <Col md={4}><Button variant="contained" 
                        onClick={() => {}}>Create New Address</Button>
                    </Col>
                </Row>
                <hr></hr>
            </Card>
        
        </Container>
    )
}

export default  MyAddressPage
