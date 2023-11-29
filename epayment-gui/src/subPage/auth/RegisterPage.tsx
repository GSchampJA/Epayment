import { useContext, useReducer } from "react";
import { Card, Col, Container, Row } from "react-bootstrap"
import { UserInfoContext } from "../../commonComponent/UserInfoContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { Link, useNavigate } from "react-router-dom";
import { AppUrl } from "../../commonComponent/objectType/AppUrl";
import { Button } from "@mui/material";
import axios from "axios";
import { sendApi_walletCreate } from "./AuthApi";
import CopyToClipboardButton from "../../commonComponent/input/CopyToClipboardButton";


interface RegisterState {
  accountInput: {
    username?: string,
    password?: string,
    password2?: string
  },

  digModal: {
    isDigOpen: boolean,
    prKey?: string,   //  private key  
    address?: string
  }

  // registerReturn?: {
  //   flag: boolean,
  //   address: string,
  //   prKey: string,    //  private key  
  //   puKey?: string     //  public key
  // },
}

enum ActionType {
  UPDATE_ACCOUNT_INPUT,
  RECEIVE_API,
  OPEN_DIALOG,
  CLOSE_DIALOG,

}

type Action = {
  type: ActionType.UPDATE_ACCOUNT_INPUT;
  target: keyof RegisterState['accountInput'];
  value: string; 
} | {
  type: ActionType.RECEIVE_API;
} | {
  type: ActionType.OPEN_DIALOG;
  address: string,
  prkey: string
} | {
  type: ActionType.CLOSE_DIALOG;
}

const reducer = (state: RegisterState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_ACCOUNT_INPUT:
      
      return {
        ...state,
        accountInput: {
          ...state.accountInput,
          [action.target]: action.value
        }
      }
    case ActionType.OPEN_DIALOG: 
      return {
        ...state,
        digModal: {
          isDigOpen: true,
          prKey: action.prkey,   //  private key  
          address: action.address
        }
      }
    case ActionType.CLOSE_DIALOG: 
      return {
        ...state,
        digModal: {
          isDigOpen: false,
          prKey: undefined,   //  private key  
          address: undefined
        }
      }
    default:
      return state;
  }
};



const RegisterPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [state, dispatch] = useReducer(reducer, {
    accountInput: {},
    digModal: {
      isDigOpen: false
    }
  });

  const sendApiRequest = async () => {
    try {
      const response = await fetch('/api/endpoint'); // Replace with your API endpoint
      const data = await response.json();
      // Process the 'data' received from the API
      console.log(data);
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error(error);
    }
  };

  const createAccount = () => {
    sendApi_walletCreate().then(res => {
      console.log('response: ')
      console.log(res)
      console.log(res.data)
      const return_address = res.data.publicKeyHash
      const return_privateKey = res.data.privateKey

      setUserInfo({
        logIn: true,
        address: return_address,
        privatekey: return_privateKey,
      })

      dispatch({ type: ActionType.OPEN_DIALOG, address: return_address, prkey: return_privateKey})

    }).catch()
  }


  const confirmDiag = () => {

    //  update state

    dispatch({type: ActionType.CLOSE_DIALOG})

    //  route to main page
    navigate(AppUrl.Home)
  }

  return (
    <Container>

      <Dialog
        open={state.digModal.isDigOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your new address"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please copy your address and private key. After that, click 'Confirm' to discard the pop-up window.
            </DialogContentText>
            <Row className="mt-5">
              <Col>Address:</Col>
              <Col><CopyToClipboardButton copyText={state.digModal.address??`Error`} /></Col>
            </Row>
            <Row className="mt-3">
              <Col>Private Key:</Col>
              <Col><CopyToClipboardButton copyText={state.digModal.prKey??`Error`} /></Col>
            </Row>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={confirmDiag}>Confirm</Button>
        </DialogActions>
      </Dialog>






      <Row>
        <Col></Col>
        <Col md={8}>
          <Card className='LoginBorder_Card'>
            <Row className="justify-content-md-center"><Col></Col>Register Account<Col></Col></Row>
            <Row className="justify-content-md-center mt-5"><Col></Col>
            <Col><Button onClick={createAccount} variant="outlined" style={{minWidth: '12rem'}}>Get Account</Button></Col>
            <Col></Col></Row>


            <Row className="justify-content-md-center" style={{marginTop: '5rem'}}>
              <Col md={4}></Col>
              <Col md={5}>Already have account ? <Link to={AppUrl.Login}>Login</Link></Col>
              <Col></Col>

            </Row>

          </Card>
        </Col>
        <Col></Col>
      </Row> 
    </Container>
  )
}

export default RegisterPage


{/* <Row className="justify-content-md-center mt-5">
<Col></Col>
<Col md={8}>
  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
    <TextField label="Username" variant="standard" value={state.accountInput.username}
      onChange={(ref) => dispatch({ type: ActionType.UPDATE_ACCOUNT_INPUT, target: 'username', value: ref.target.value })} 
    />
  </Box>
</Col>
<Col></Col>
</Row>
<Row className="justify-content-md-center mt-3">
<Col></Col>
<Col md={8}>
  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
    <TextField label="New Password" variant="standard" type="password" value={state.accountInput.password}
      onChange={(ref) => dispatch({ type: ActionType.UPDATE_ACCOUNT_INPUT, target: 'password', value: ref.target.value })} 
    />
  </Box>
</Col>
<Col></Col>
</Row>
<Row className="justify-content-md-center mt-3">
<Col></Col>
<Col md={8}>
  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
    <TextField label="Password Again" variant="standard" type="password" value={state.accountInput.password2}
      onChange={(ref) => dispatch({ type: ActionType.UPDATE_ACCOUNT_INPUT, target: 'password2', value: ref.target.value })} 
    />
  </Box>
</Col>
<Col></Col>
</Row> */}