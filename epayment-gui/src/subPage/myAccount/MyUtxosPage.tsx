import { Card, Col, Container, Row } from 'react-bootstrap'
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useContext, useEffect, useState } from 'react';
import { UtxO, utxosExample } from '../../commonComponent/objectType/BlockchainType';
import { UserInfoContext } from '../../commonComponent/UserInfoContext';
import { HandleBoolean } from '../../commonComponent/tableElement/TableDisplay';

enum pageMode {
    DEFAULT = 'default',
    LOADING = 'Loading'
}

interface MyAddress_state {
    pageMode: pageMode,
    uTxOsList?: UtxO[],
    totalAmount?: number,

}

const  MyUtxosPage = () => {

    const [userInfo] = useContext(UserInfoContext);



    const [state, setState] = useState<MyAddress_state>({
        pageMode: pageMode.LOADING,
        uTxOsList: utxosExample,
    });

    useEffect(() => {
        setTimeout(() => {
            var sumAmount;
            if (state.uTxOsList) {
                sumAmount = state.uTxOsList.reduce((sum, utxo) => sum + utxo.amount, 0);
            }
          setState({ ...state, pageMode: pageMode.DEFAULT, totalAmount: sumAmount??undefined });
        }, 3000);
    }, []);




    return(
        <Container className='mt-3'>
            <Card className='noBorderLine'>
                <Row>
                    <Col md={4} className='mt-1'>{"My UTxOs - Unspent Transaction Outputs"}</Col>
                    <Col></Col>
                    <Col md={4}>Total Amount: {state.totalAmount??"-"}</Col>
                </Row>
                <hr></hr>
                {/* table of records */}
                <Card className='noBorderLine'>
                    {state.pageMode === pageMode.LOADING && 
                        <Row>
                            <Col></Col>
                            <Col className='mt-2'><CircularProgress className='loading-center' size={90} /></Col>
                            <Col></Col>
                        </Row>
                    }

                    {state.pageMode === pageMode.DEFAULT && 
                    <TableContainer className='hor' component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>txid</TableCell>
                                <TableCell align="right">vout</TableCell>
                                <TableCell align="right">address</TableCell>
                                <TableCell align="right">label</TableCell>
                                <TableCell align="right">scriptPubKey</TableCell>
                                <TableCell align="right">amount</TableCell>
                                <TableCell align="right">confirmations</TableCell>
                                <TableCell align="right">spendable</TableCell>
                                <TableCell align="right">solvable</TableCell>
                                <TableCell align="right">desc</TableCell>
                                <TableCell align="right">parent_descs</TableCell>
                                <TableCell align="right">safe</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {state.uTxOsList && state.uTxOsList.map((row, index) => (
                                <TableRow key={row.txid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    
                                    <TableCell component="th" scope="row"> {index+1}</TableCell>
                                    <TableCell align="right">{row.txid}</TableCell>
                                    <TableCell align="right">{row.vout}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.label}</TableCell>
                                    <TableCell align="right">{row.scriptPubKey}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="right">{row.confirmations}</TableCell>
                                    <TableCell align="right">{HandleBoolean(row.spendable)}</TableCell>
                                    <TableCell align="right">{HandleBoolean(row.solvable)}</TableCell>
                                    <TableCell align="right">{row.desc}</TableCell>
                                    <TableCell >{row.parent_descs?.join(",")}</TableCell>
                                    <TableCell align="right">{HandleBoolean(row.safe)}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                    
                </Card>
            </Card>
        
        </Container>
    )
}

export default  MyUtxosPage
