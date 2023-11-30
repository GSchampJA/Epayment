import { Card, Col, Container, Row } from 'react-bootstrap'
import { Button, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CopyToClipboardButton from '../../commonComponent/input/CopyToClipboardButton';
import { useContext, useReducer, useState } from 'react';
import { UserInfoContext } from '../../commonComponent/UserInfoContext';
import { sendApi_createTx } from './MyAccountApi';
import { toast } from 'react-toastify';

enum pageMode {
    DEFAULT = 'default',
    LOADING = 'Loading'
}

interface MyTx_state {
    pageMode: pageMode,
    allTx?: string[],
    isDigOpen: boolean,
    tx_input: {
        toAdress?: string,
        amount?: number,
        fee?: number,
    },
    tx_inputError: {
        toAdress: boolean,
        amount: boolean,
        fee: boolean,
        toAdress_errorText?: string,
        amount_errorText?: string,
        fee_errorText?: string,
    }
}

enum ActionType {
    UPDATE_TX_INPUT,
    RECEIVE_API,
    UPDATE_DIGOPEN,
    UPDATE_TX_INPUT_ERROR,
    CLOSE_DIAG,
}
  
type Action = {
    type: ActionType.UPDATE_TX_INPUT;
    target: keyof MyTx_state['tx_input'];
    value: string | number; 
} | {
    type: ActionType.RECEIVE_API;
} | {
    type: ActionType.UPDATE_DIGOPEN;
    isDigOpen: boolean
} | {
    type: ActionType.UPDATE_TX_INPUT_ERROR;
    target: keyof MyTx_state['tx_inputError'];
    value: boolean | string
} | {
    type: ActionType.CLOSE_DIAG;
}
  
  const reducer = (state: MyTx_state, action: Action) => {
    switch (action.type) {

        case ActionType.UPDATE_TX_INPUT:
            return {...state, tx_input: {
                ...state.tx_input,
                [action.target]: action.value
            }};

        case ActionType.UPDATE_DIGOPEN:
            return {...state, isDigOpen: action.isDigOpen};

        case ActionType.CLOSE_DIAG:
            return {
                ...state,
                isDigOpen: false,
                tx_input: {
                    toAdress: undefined,
                    amount: undefined,
                    fee: undefined,
                },
                tx_inputError: {
                    toAdress: false,
                    amount: false,
                    fee: false,
                    toAdress_errorText: undefined,
                    amount_errorText: undefined,
                    fee_errorText: undefined,
                }
            }
        case ActionType.UPDATE_TX_INPUT_ERROR:
            return {
                ...state,
                tx_inputError: {
                    ...state.tx_inputError,
                    [action.target]: action.value
                }
            }
        default:
            return state;
    }
  };

const  MyTxPage = () => {

    const [userInfo] = useContext(UserInfoContext);

    const [state, dispatch] = useReducer(reducer, {
        pageMode: pageMode.DEFAULT,
        isDigOpen: false,
        tx_input: {},
        tx_inputError: {
            toAdress: false,
            amount: false,
            fee: false,
        }
    });

    const controlDiag = (isDigOpen: boolean) => {
        dispatch({ type: ActionType.UPDATE_DIGOPEN, isDigOpen: isDigOpen})
    }

    const makeTx = () => {

        console.log('Validation: ', (!!state.tx_input.amount && !!state.tx_input.toAdress?.trim() && !!state.tx_input.fee
        && (state.tx_input.amount >= 0.00001) && (state.tx_input.fee >= 0.00001)
        ))
        // console.log('Validation: ', (state.tx_input.amount && state.tx_input.toAdress?.trim() && state.tx_input.fee
        // && state.tx_input.amount > 0.00001 && state.tx_input.fee > 0.00001
        // ))
        if (!!state.tx_input.amount && !!state.tx_input.toAdress?.trim() && !!state.tx_input.fee
            && (state.tx_input.amount >= 0.00001) && (state.tx_input.fee >= 0.00001)
            ) {
                console.log('pass tx input validation')

            dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'toAdress', value: false})
            dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'amount', value: false})
            dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'fee', value: false})
            // send request
            sendApi_createTx({
                address: state.tx_input.toAdress?.trim(), 
                amount: state.tx_input.amount,
                fee: state.tx_input.fee
            }).then(res => {
                console.log('response - sendApi_createTx:')
                console.log(res)
                toast.success('Success to create transaction')
            }).catch((er) => {
                console.log(er)
                toast.error(er.message);
                toast.error(er.response.data.error);
            })

            dispatch({ type: ActionType.CLOSE_DIAG})


        }
        console.log('tx_input - toAdress:', !state.tx_input.toAdress?.trim())
        if (!state.tx_input.toAdress?.trim()) {
            dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'toAdress', value: true})
        } else {dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'toAdress', value: false})}

        console.log('tx_input - amount: ', (!state.tx_input.amount || state.tx_input.amount < 0.00001))
        if (!state.tx_input.amount || state.tx_input.amount < 0.00001) {
            dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'amount', value: true})
        } else {dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'amount', value: false})}

        console.log('tx_input - fee:', (!state.tx_input.fee || state.tx_input.fee < 0.00001))
        if (!state.tx_input.fee || state.tx_input.fee < 0.00001) {
            dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'fee', value: true})
        } else {dispatch({ type: ActionType.UPDATE_TX_INPUT_ERROR, target: 'fee', value: false})}
    }




    return(
        <Container className='mt-3'>

            <Dialog
                open={state.isDigOpen}
                // onClose={() => controlDiag(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Make new Transaction"}<hr></hr></DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you want to create a new transaction, click 'Confirm'.
                    </DialogContentText>
                    <Row className="mt-3">
                        <Col md={2}></Col>
                        <Col>
                            <TextField
                                error={state.tx_inputError.toAdress}
                                label="To Address"
                                value={state.tx_input.toAdress}
                                onChange={(ref) => dispatch({ type: ActionType.UPDATE_TX_INPUT, target:'toAdress', value: ref.target.value})}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={2}></Col>
                        <Col>
                            <TextField
                                error={state.tx_inputError.amount}
                                type='number'
                                inputProps={{ step: "0.00001" }}
                                label="Amount"
                                value={state.tx_input.amount}
                                helperText={"minimum amount is 0.00001"}
                                onChange={(ref) => {
                                    var input_amount = Number(ref.target.value);
                                    // var toamount = 0.00001
                                    // if (input_amount > 0.00001) {
                                    //     toamount = input_amount
                                    // }

                                    dispatch({ type: ActionType.UPDATE_TX_INPUT, target:'amount', value: input_amount})}
                                }
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={2}></Col>
                        <Col>
                            <TextField
                                error={state.tx_inputError.fee}
                                label="Fee"
                                type='number'
                                inputProps={{ step: "0.00001" }}
                                value={state.tx_input.fee}
                                helperText={"minimum fee is 0.00001"}
                                onChange={(ref) => {
                                    var input_fee = Number(ref.target.value);
                                    // var tofee = 0.00001
                                    // if (input_fee > 0.00001) {
                                    //     tofee = input_fee
                                    // }

                                    dispatch({ type: ActionType.UPDATE_TX_INPUT, target:'fee', value: input_fee})}
                                }
                            />
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions className='mt-3'>
                    <Button onClick={() => dispatch({ type: ActionType.CLOSE_DIAG})}>Cancel</Button>
                    <Button onClick={() => makeTx()} autoFocus>Confirm</Button>
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
