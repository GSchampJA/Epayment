import { Col, Container, Row } from 'react-bootstrap'
import { TextField, MenuItem, FormControl, Button, FormGroup } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Transaction, Address, Block } from '../../commonComponent/objectType/BlockchainType';
import TxRow, { TxRowProps } from './TxRow';
import txExample from './transactionExample.json'
import { sendApi_searchBlock } from '../../commonComponent/api/CommonApi';
import { toast } from 'react-toastify';

enum pageMode {
    DEFAULT = 'default',
    SHOW_RECORD = 'showRecord'
}

interface TX_state {
    pageMode: pageMode,
    searchCriteria: {
        blockIndex?: number
    },
    searchResult?: Block
}

const SearchBlock = () => {



    const [state, setState] = useState<TX_state>({
        pageMode: pageMode.DEFAULT,
        searchCriteria: {  }
    })

    const changeSearchText = (blockIndex: number) => {
        setState({
            ...state, 
            searchCriteria: {
                blockIndex: blockIndex
            }
        })
    }

    const clickSearch = () => {

        const searchBlockIndex = state.searchCriteria.blockIndex

        if ((searchBlockIndex != undefined || searchBlockIndex === 0) && typeof(searchBlockIndex) === 'number') {
            sendApi_searchBlock(searchBlockIndex).then(res => {
                console.log('receive api - sendApi_searchBlock')
                if (res.data.blockIndex === undefined) {
                    toast.error('Cannot find such block based on input blockIndex')
                    return
                }
    
                console.log(res.data)

                setState({
                    ...state,
                    searchResult: res.data
                })

                
            })
        } else {
            toast.error('Invalid input blockIndex')
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
                                    disabled
                                    displayEmpty
                                    defaultValue={"Block"}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={"Block"}>Block</MenuItem>

                                </Select>
                                {/* <FormHelperText>Choose searching target</FormHelperText> */}
                            </FormControl>
                            <TextField 
                                style={{marginTop: '0.5rem'}}
                                label="Block Index" 
                                variant="outlined"
                                type='number'
                                InputProps={{ inputProps: { min: 0} }}
                                value={state.searchCriteria.blockIndex}
                                onChange={ref => changeSearchText(Number(ref.target.value))}
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


                <Row style={{marginTop: "4rem"}}></Row>
                
            </div>

            {/* ================================================================================================ */}
            {/* Result records table */}
            <div>
                <Row>
                    <Col>Result</Col>
                    <hr></hr>
                </Row>

                <Row>{state.searchResult?.currentBlockHash}</Row>

                

                
                
            </div>
        </Container>
    )
}

export default SearchBlock
