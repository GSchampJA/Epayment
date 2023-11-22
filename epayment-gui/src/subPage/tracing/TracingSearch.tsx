import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import { TextField, MenuItem, FormControl, Button, FormGroup } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Transaction, Address } from '../../commonComponent/objectType/Blockchain';
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


    const [state, setState] = useState<TX_state>({
        pageMode: pageMode.DEFAULT,
        searchCriteria: {
            select_type: 'ADDRESS',
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
                                    <MenuItem value={'ADDRESS'}>ADDRESS</MenuItem>
                                    <MenuItem value={'Block'}>Block</MenuItem>
                                    <MenuItem value={'Tx'}>Transaction</MenuItem>
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
                            onClick={() => {}}
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
                Transaction:
                <div style={{marginTop: "1rem"}}>
                    {TxRow(demoTx)}
                </div>
            </div>
        </Container>
    )
}

export default TracingSearch
