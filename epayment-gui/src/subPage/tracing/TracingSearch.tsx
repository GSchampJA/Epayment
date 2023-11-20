import { Card, Col, Container, Row } from 'react-bootstrap'
import logo from '../../assets/logo.svg'
import { Box, TextField, MenuItem, FormControl, FormHelperText } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

// className='Transaction_Search_field'

interface TX_state {
    searchCriteria: {
        select_type: string,
        text_input?: string
    },
    pageMode: 'default' | 'delete' | 'tracing'
}

const TracingSearch = () => {

    const [state, setState] = useState<TX_state>({
        pageMode: 'default',
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

            <Row className="justify-content-md-center">
                {/* <Col xs={4}></Col> */}
                <Col xs={4} style={{justifyContent:'right', paddingLeft: '20rem'}}>
                    <FormControl sx={{ m: 1, width: 125 }}>
                        <Select
                            value={state.searchCriteria.select_type}
                            onChange={changeSelection}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'ADDRESS'}>ADDRESS</MenuItem>
                            <MenuItem value={'Block'}>Block</MenuItem>
                            <MenuItem value={'Tx'}>Thirty</MenuItem>
                        </Select>
                        {/* <FormHelperText>Choose searching target</FormHelperText> */}
                    </FormControl>
                    
                </Col>
                <Col xs={4} style={{marginTop: '0.5rem'}}> 
                    <TextField 
                        label="Address, Transaction" 
                        variant="outlined"
                        value={state.searchCriteria.text_input}
                        onChange={event => changeSearchText(event.target.value)}
                    />
                </Col>
                {/* <Col xs={4}></Col> */}
            </Row>


            <Row>
                <Col>Result</Col>
            </Row>

            
            
        </Container>
    )
}

export default TracingSearch
