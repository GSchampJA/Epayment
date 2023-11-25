import { useContext, useReducer } from "react";
import { Card, Col, Container, Row } from "react-bootstrap"
import { UserInfoContext } from "../../commonComponent/UserInfoContext";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { Link } from "react-router-dom";
import { AppUrl } from "../../commonComponent/objectType/AppUrl";


interface RegisterState {
  accountInput: {
    username?: string,
    password?: string,
    password2?: string
  },

  registerReturn?: {
    flag: boolean,
    address: string,
    prKey: string,    //  private key  
    puKey: string     //  public key
  },
}

enum ActionType {
  UPDATE_ACCOUNT_INPUT = "UPDATE_ACCOUNT_INPUT",
  RECEIVE_API = "RECEIVE_API",
}

type Action = {
  type: ActionType.UPDATE_ACCOUNT_INPUT;
  target: keyof RegisterState['accountInput'];
  value: string; 
} | {
  type: ActionType.RECEIVE_API;
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
    default:
      return state;
  }
};



const RegisterPage = () => {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [state, dispatch] = useReducer(reducer, {
    accountInput: {}
  });

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md={5}>
          <Card className='LoginBorder_Card'>
            <Row className="justify-content-md-center"><Col></Col>Register Account<Col></Col></Row>
            <Row className="justify-content-md-center mt-5">
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
            </Row>

            {/* upload file field */}
            {/* <Row className="justify-content-md-center mt-4">
              <Col md={1}></Col>
              <Col md={8}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  // sx={{ marginRight: "1rem" }}
                >
                  Upload Your Private Key
                  <input type="file" accept=".txt" hidden onChange={() => {}} />
                </Button>
              </Col>
              <Col className="mt-1">{"FILE-NAME"}</Col>
            </Row> */}

            <Row className="justify-content-md-center" style={{marginTop: '5rem'}}>
              <Col></Col>
              <Col md={8}>Already have account ? <Link to={AppUrl.Login}>Login</Link></Col>
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