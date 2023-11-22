import { Col, Container, Row } from 'react-bootstrap'
import { TextField, MenuItem, FormControl, Button, FormGroup } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Transaction, Address } from '../../commonComponent/objectType/BlockchainType';
import TxRow, { TxRowProps } from './TxRow';
import txExample from './transactionExample.json'

enum pageMode {
    DEFAULT = 'default',
    TRANSACTION = 'Tx',
    ADDRESS = 'address',
    BLOCK = 'block'
}

interface TX_state {
    pageMode: pageMode,
    searchCriteria: {
        select_type: string,
        text_input?: string
    },
    searchResult?: {
        type: pageMode,
        txRecord?: Transaction,
        searchAddress?: Address
    }
}

const TracingSearch = () => {

    const demoTx:TxRowProps = {
        txRecord: JSON.parse(JSON.stringify(txExample))
    }

    const demoAdd: Address = {
        address: 'ASCSC2AS@#AS###',
        totalReceived: 100,
        totalSent: 98,
        balance: 2.000,       //  totalReceived - totalSent
        transcations: [demoTx.txRecord, demoTx.txRecord, demoTx.txRecord]
    }


    const [state, setState] = useState<TX_state>({
        pageMode: pageMode.DEFAULT,
        searchCriteria: {
            select_type: '',
            text_input: undefined
        }
    })

    const changeSelection = (event: SelectChangeEvent) => {
        // event.target.value
        setState({
            ...state,
            searchCriteria: {
                ...state.searchCriteria,
                select_type: event.target.value
            }
        });
    };

    const changeSearchText = (value: string) => {
        setState({
            ...state,
            searchCriteria: {
                ...state.searchCriteria,
                text_input: value
            }
        });
    }

    const clickSearch = () => {
        switch (state.searchCriteria.select_type) {
            case pageMode.ADDRESS:

                // call api for searching address
                setState({
                    ...state,
                    pageMode: pageMode.ADDRESS
                });


                
                break;
            case pageMode.TRANSACTION:

                // call api for searching transaction
                setState({
                    ...state,
                    pageMode: pageMode.TRANSACTION
                });
                
                break;
            default:
                setState({
                    ...state,
                    pageMode: pageMode.DEFAULT
                });
                break;
        }

    }


    return(
        <Container className='Transaction_Search_field'>
            {/* Search criteria bar */}
            <div>
                <Row className="justify-content-md-center">
                    <Col xs={4}></Col>
                    <Col xs={6} className='TxSearchingBar'>
                        <FormGroup className='TxSearchingBar_inputGroup'>
                            <FormControl sx={{ m: 1, width: 125 }}>
                                <Select
                                    value={state.searchCriteria.select_type}
                                    onChange={changeSelection}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                    <MenuItem value={pageMode.ADDRESS}>ADDRESS</MenuItem>
                                    <MenuItem value={pageMode.BLOCK}>Block</MenuItem>
                                    <MenuItem value={pageMode.TRANSACTION}>Transaction</MenuItem>
                                </Select>
                                {/* <FormHelperText>Choose searching target</FormHelperText> */}
                            </FormControl>
                            <TextField 
                                style={{marginTop: '0.5rem'}}
                                label="Address, Transaction" 
                                variant="outlined"
                                value={state.searchCriteria.text_input}
                                onChange={event => changeSearchText(event.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={2}>
                        <Button 
                            variant="contained" 
                            onClick={() => clickSearch()}
                            style={{marginTop: "1rem"}}>Search</Button>
                    </Col>
                    {/* <Col></Col> */}
                </Row>

                <Row>
                    <Col sm={2}></Col>
                    <Col sm={2}>Value: </Col>
                    <Col sm={2}>{state.searchCriteria.select_type}</Col>
                    <Col sm={2}>{state.searchCriteria.text_input}</Col>
                    <Col></Col>
                </Row>

                <Row style={{marginTop: "4rem"}}></Row>
                
            </div>

            {/* ================================================================================================ */}
            {/* Result records table */}
            <div>
                <Row>
                    <Col>Result</Col>
                    <hr></hr>
                </Row>
                {  state.pageMode === pageMode.TRANSACTION && <>
                
                    Transaction:
                    <div style={{marginTop: "1rem"}}>
                        {TxRow(demoTx)}
                    </div>
                </>
                }

                {  state.pageMode === pageMode.ADDRESS && <>
                
                    Address record:
                    <div style={{marginTop: "1rem"}}>
                        {demoAdd.transcations.map((tx => {
                            return (
                                <div style={{marginBottom: '1rem'}}>{TxRow({txRecord: tx})}</div>
                            )
                        }))}
                    </div>
                </>
                }

                

                
                
            </div>
        </Container>
    )
}

export default TracingSearch
