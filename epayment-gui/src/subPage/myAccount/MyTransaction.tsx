import { Card, Col, Container, Row } from 'react-bootstrap'
import { Button } from '@mui/material'
import { useContext, useState } from 'react';
import { UserInfoContext } from '../../commonComponent/UserInfoContext';

enum pageMode {
    DEFAULT = 'default',
    LOADING = 'Loading'
}

interface MyTx_state {
    pageMode: pageMode,
    allAddress?: string[]

}

const  MyTxPage = () => {

    const [userInfo] = useContext(UserInfoContext);

    const [state, setState] = useState<MyTx_state>({
        pageMode: pageMode.DEFAULT
    });




    return(
        <Container className='mt-3'>
            <Card className='noBorderLine'>
                <Row>
                    <Col md={4} className='mt-1'>{"My current transaction(s)"}</Col>
                    <Col></Col>
                    <Col md={4}><Button variant="contained" 
                        onClick={() => {}}>Create New Transaction</Button>
                    </Col>
                </Row>
                <hr></hr>
            </Card>
        
        </Container>
    )
}

export default  MyTxPage
