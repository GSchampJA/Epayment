import { Card, Col, Container, Row } from 'react-bootstrap'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CopyToClipboardButton from '../../commonComponent/input/CopyToClipboardButton';
import { useContext, useReducer, useState } from 'react';
import { UserInfoContext } from '../../commonComponent/UserInfoContext';

enum pageMode {
    DEFAULT = 'default',
    LOADING = 'Loading'
}

interface MyTx_state {
    pageMode: pageMode,
    allTx?: string[],
    isDigOpen: boolean,
    tx_input?: {
        toAdress?: string,
        amount?: number,
        fee?: number,

    }
}

enum ActionType {
    UPDATE_TX_INPUT,
    RECEIVE_API,
    UPDATE_DIGOPEN,
}
  
type Action = {
    type: ActionType.UPDATE_TX_INPUT;
    // target: keyof MyTx_state['accountInput'];
    value: string; 
} | {
    type: ActionType.RECEIVE_API;
} | {
    type: ActionType.UPDATE_DIGOPEN;
    isDigOpen: boolean
}
  
  const reducer = (state: MyTx_state, action: Action) => {
    switch (action.type) {

        case ActionType.UPDATE_TX_INPUT:
            return state;

        case ActionType.UPDATE_DIGOPEN:
        
            return {...state, isDigOpen: action.isDigOpen};
        default:
            return state;
    }
  };

const  MyTxPage = () => {

    const [userInfo] = useContext(UserInfoContext);

    const [state, dispatch] = useReducer(reducer, {
        pageMode: pageMode.DEFAULT,
        isDigOpen: false,
    });

    const controlDiag = (isDigOpen: boolean) => {

    }




    return(
        <Container className='mt-3'>

            <Dialog
                open={state.isDigOpen}
                onClose={() => controlDiag(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Make new Transaction"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you want to create a new address for this wallet, click 'Confirm'.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* {!!!state.newAddress ? <Button onClick={closeDialog}>Not now</Button> : <></>} */}
                    <Button autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>


            <Card className='noBorderLine'>
                <Row>
                    <Col md={4} className='mt-1'>{"My current transaction(s)"}</Col>
                    <Col></Col>
                    <Col md={4}><Button variant="contained" 
                        onClick={() => controlDiag(true)}>Create New Transaction</Button>
                    </Col>
                </Row>
                <hr></hr>
            </Card>
        
        </Container>
    )
}

export default  MyTxPage
