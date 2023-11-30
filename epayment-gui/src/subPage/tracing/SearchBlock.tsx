import { Card, Col, Container, Row } from 'react-bootstrap'
import { TextField, MenuItem, FormControl, Button, FormGroup, Table, CircularProgress } from '@mui/material'
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Block } from '../../commonComponent/objectType/BlockchainType';
import { sendApi_searchBlock } from '../../commonComponent/api/CommonApi';
import { toast } from 'react-toastify';

enum pageMode {
    DEFAULT = 'default',
    SHOW_RECORD = 'showRecord',
    LOADING = 'loading'
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

        setState({
            ...state,
            pageMode: pageMode.LOADING,
        })

        const searchBlockIndex = state.searchCriteria.blockIndex

        if ((searchBlockIndex != undefined || searchBlockIndex === 0) && typeof(searchBlockIndex) === 'number') {
            sendApi_searchBlock(searchBlockIndex).then(res => {
                console.log('receive api - sendApi_searchBlock')
                if (res.data.blockIndex === undefined) {
                    toast.error('Cannot find such block based on input blockIndex')
                    setState({
                        ...state,
                        pageMode: pageMode.DEFAULT
                    })
                    return
                }
    
                console.log(res.data)

                setState({
                    ...state,
                    pageMode: pageMode.SHOW_RECORD,
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
            { state.pageMode === pageMode.SHOW_RECORD && <div>
                <Row>
                    <Col>Result</Col>
                    <hr></hr>
                </Row>

                {/* <div>
                    <BlockTable block={state.searchResult} />
                </div> */}

                <Card className='TransactionBorder_Card'>
                    <Card className='noBorderLine'>
                    <Table>
                        <Row>
                            <Col md={2} variant="head" className='table-hearder-tag'>blockIndex:</Col>
                            <Col>{state.searchResult?.blockIndex}</Col>
                        </Row>

                        {/* blockHeader */}
                        <Row className='mt-4'>
                            <Col md={2}  variant="head" className='table-hearder-tag'>Block Header:</Col>
                        </Row>
                        <Row>
                            <Col md={2}  variant="head"></Col>
                            <Col md={2} variant="head" className='table-hearder-tag'>version:</Col>
                            <Col>{state.searchResult?.blockHeader.version}</Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col md={2}  variant="head"></Col>
                            <Col md={3} variant="head" className='table-hearder-tag' style={{width: 'fit-content', minWidth: '11rem'}}>previousBlockHeader:</Col>
                            <Col>{state.searchResult?.blockHeader.previousBlockHeader}</Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col md={2}  variant="head"></Col>
                            <Col md={2} variant="head" className='table-hearder-tag'>merkleRoot:</Col>
                            <Col>{state.searchResult?.blockHeader.merkleRoot}</Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col md={2}  variant="head"></Col>
                            <Col md={2} variant="head" className='table-hearder-tag'>timeStamp:</Col>
                            <Col>{state.searchResult?.blockHeader.timeStamp}</Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col md={2}  variant="head"></Col>
                            <Col md={2} variant="head" className='table-hearder-tag'>difficulty:</Col>
                            <Col>{state.searchResult?.blockHeader.difficulty}</Col>
                        </Row>
                        <Row className='mt-1'>
                            <Col md={2}  variant="head"></Col>
                            <Col md={2} variant="head" className='table-hearder-tag'>nonce:</Col>
                            <Col>{state.searchResult?.blockHeader.nonce}</Col>
                        </Row>


                        <Row className='mt-4'>
                            <Col md={2}  variant="head" className='table-hearder-tag'>txns:</Col>
                            <Col></Col>
                        </Row>

                        {state.searchResult?.txns.map((item, index) => {


                            return (
                                <>
                                <Row className={(index !== 0) ? `mt-4`: ``}>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>txid:</Col>
                                    <Col>{item.txid}</Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>toAddess:</Col>
                                    <Col>{item.toAddess}</Col>
                                </Row>
                                {/* <Row>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head">toAddess:</Col>
                                    <Col>{'asc'}</Col>
                                </Row> */}
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>amount:</Col>
                                    <Col>{item.amount}</Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>txinCount:</Col>
                                    <Col>{item.txinCount}</Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>txin:</Col>
                                    <Col>{JSON.stringify(item.txin.map(Txin => {return JSON.stringify(Txin) + ', '})).length > 20 ? JSON.stringify(item.txin.map(Txin => {return JSON.stringify(Txin) + ', '})).substring(0, 20) + ` ...` : item.txin.map(Txin => {return JSON.stringify(Txin) + ', '})}</Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>txoutputCount:</Col>
                                    <Col>{item.txoutputCount}</Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag' style={{maxHeight: '1.5rem'}}>txout:</Col>
                                    <Col>{item.txout.map(TxOut => {
                                        return (<><Row style={{marginLeft: '0.2rem'}}>
                                            <Col className='table-hearder-tag'  style={{width: 'fit-content', maxWidth: '6.5rem'}}>toAddress:</Col>
                                            <Col>{TxOut.toAddress}</Col>
                                            <Col className='table-hearder-tag' style={{width: 'fit-content', maxWidth: '5.5rem'}}>amount:</Col>
                                            <Col>{TxOut.amount}</Col>
                                            </Row><Row className='mt-1' style={{marginLeft: '0.2rem'}}>
                                            <Col className='table-hearder-tag'  style={{maxWidth: '6.5rem'}}>lockScript:</Col>
                                            <Col>{TxOut.lockScript}</Col>
                                        </Row></>)
                                    })}</Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>fee:</Col>
                                    <Col>{item.fee}</Col>
                                </Row>
                                <Row className='mt-1'>
                                    <Col md={2}  variant="head"></Col>
                                    <Col md={2}  variant="head" className='table-hearder-tag'>timestamp:</Col>
                                    <Col>{item.timestamp}</Col>
                                </Row>
                                </>
                            )
                        })}



                        <Row className='mt-4'>
                            <Col md={2}  variant="head" className='table-hearder-tag' style={{width: 'fit-content', minWidth: '11.5rem'}}>currentBlockHash:</Col>
                            <Col>{state.searchResult?.currentBlockHash}</Col>
                        </Row>
                    </Table>

                    </Card>
                </Card>

                

                

                
                
            </div>}


            {state.pageMode === pageMode.LOADING &&
                <Row>
                    <Col></Col>
                    <Col className='mt-2'><CircularProgress className='loading-center' size={90} /></Col>
                    <Col></Col>
                </Row>
            }
        </Container>
    )
}

export default SearchBlock


{/* <Table>
                        <TableRow>
                            <TableCell variant="head">blockIndex:</TableCell>
                            <TableCell>{state.searchResult?.blockIndex}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell variant="head">Block Header:</TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell variant="head"></TableCell>
                            <TableCell variant="head">version:</TableCell>
                            <TableCell>{state.searchResult?.blockHeader.version}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head"></TableCell>
                            <TableCell variant="head">previousBlockHeader:</TableCell>
                            <TableCell>{state.searchResult?.blockHeader.previousBlockHeader}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head"></TableCell>
                            <TableCell variant="head">merkleRoot:</TableCell>
                            <TableCell>{state.searchResult?.blockHeader.merkleRoot}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head"></TableCell>
                            <TableCell variant="head">timeStamp:</TableCell>
                            <TableCell>{state.searchResult?.blockHeader.timeStamp}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head"></TableCell>
                            <TableCell variant="head">difficulty:</TableCell>
                            <TableCell>{state.searchResult?.blockHeader.difficulty}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head"></TableCell>
                            <TableCell variant="head">nonce:</TableCell>
                            <TableCell>{state.searchResult?.blockHeader.nonce}</TableCell>
                        </TableRow>


                        <TableRow>
                            <TableCell variant="head">txns:</TableCell>
                            <TableCell>[{state.searchResult?.txns.map(item => {
                                return JSON.stringify(item) + ', '
                            })}]</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">currentBlockHash:</TableCell>
                            <TableCell>{state.searchResult?.currentBlockHash}</TableCell>
                        </TableRow>
                    </Table> */}
