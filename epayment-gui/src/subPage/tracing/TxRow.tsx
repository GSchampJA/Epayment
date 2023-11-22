import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Transaction } from '../../commonComponent/objectType/Blockchain';
import ForwardSharpIcon from '@mui/icons-material/ForwardSharp';

export interface TxRowProps {
    txRecord: Transaction
}


const TxRow = (props: TxRowProps) => {
    // txRecord?: Transaction
    const { txRecord } = props;



    return (
        <Card className='TransactionBorder_Card'>
            <Row>
                <Col md={5}>
                    <Card className='TransactionAdress_Card'>
                        <Table className='TransactionAdress_Table'>
                            <Row><Col>
                                <a className='font_coinAmount'>
                                    {txRecord?.fromTxAdd.sent??`0`}{" "}
                                </a>
                                     Coins from
                            </Col></Row>
                            <Row><Col style={{marginLeft: '1rem'}}>{txRecord?.fromTxAdd.address??``}</Col></Row>
                        </Table>
                    </Card>
                </Col>
                <Col sm={1}> <ForwardSharpIcon color="primary" sx={{ fontSize: 60 }}  /> </Col>
                <Col md={5}>
                    {txRecord?.toTxAdd.map(address => {
                        // return all receiver(s) information
                        return (
                            <div style={{paddingBottom: '1rem'}}>
                                <Card className='TransactionAdress_Card'>
                                    <Table className='TransactionAdress_Table'>
                                        <Row><Col>
                                            <a className='font_coinAmount'>{address.received??`0`}{" "}</a>
                                                Coins to
                                        </Col></Row>
                                        <Row><Col style={{marginLeft: '1rem'}}>{address.address??``}</Col></Row>
                                    </Table>
                                </Card>
                            </div>
                        )
                    })}

                </Col>
            </Row>
        </Card>

    );
}

export default TxRow;