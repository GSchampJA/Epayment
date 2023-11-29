import { Card, Col, Container, Row } from 'react-bootstrap'
import { Button } from '@mui/material'
import { useContext, useState } from 'react';
import { UserInfoContext } from '../../commonComponent/UserInfoContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CopyToClipboardButton from '../../commonComponent/input/CopyToClipboardButton';

enum pageMode {
    DEFAULT = 'default',
    LOADING = 'Loading'
}

interface MyAddress_state {
    pageMode: pageMode,
    allAddress?: string[],

    // component of Dialog
    isOpen: boolean,
    newAddress?: string

}

const  MyAddressPage = () => {

    const [userInfo] = useContext(UserInfoContext);

    const [state, setState] = useState<MyAddress_state>({
        pageMode: pageMode.DEFAULT,
        isOpen: false
    });

    const createNewAddress = () => {

        if (state.isOpen === true && state.newAddress) {
            setState({...state, isOpen: false, newAddress: undefined})
            return;
        }
        const prk = userInfo.privatekey
        // send api to create address

        setState({
            ...state,
            newAddress: '#ASCAS6565ASCASC'
        })
    }

    const closeDialog = () => {

        if (!!!state.newAddress) {

        }
        setState({
            ...state,
            isOpen: false,
            newAddress: undefined
        })

    }

    const openDialog = () => {
        setState({
            ...state,
            isOpen: true
        })

    }




    return(
        <Container className='mt-3'>
            <Dialog
                open={state.isOpen}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{!!!state.newAddress ? "Are you sure to create a new address?" : "Here's your new address!"}</DialogTitle>
                <DialogContent>
                    {state.newAddress ? 
                    <DialogContentText id="alert-dialog-description">
                        Your new address: <CopyToClipboardButton copyText={state.newAddress??``}/>
                    </DialogContentText>
                    :<DialogContentText id="alert-dialog-description">
                        If you want to create a new address for this wallet, click 'Confirm'.
                    </DialogContentText>}
                </DialogContent>
                <DialogActions>
                    {!!!state.newAddress ? <Button onClick={closeDialog}>Not now</Button> : <></>}
                    <Button onClick={createNewAddress} autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
            



            <Card className='noBorderLine'>
                <Row>
                    <Col md={4} className='mt-1'>{"My current address(s)"}</Col>
                    <Col></Col>
                    <Col md={4}>
                        {/* <Button variant="contained" onClick={openDialog}>Create New Address</Button> */}
                    </Col>
                </Row>
                <hr></hr>

                {/* <Row className='mt-5'> */}
                    <Row className="mt-5">
                        <Col md={3}>Address:</Col>
                        <Col><CopyToClipboardButton copyText={userInfo.address??`Error`} /></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={3}>Private Key:</Col>
                        <Col><CopyToClipboardButton copyText={userInfo.privatekey??`Error`} /></Col>
                    </Row>
                {/* </Row> */}
            </Card>
        
        </Container>
    )
}

export default  MyAddressPage
