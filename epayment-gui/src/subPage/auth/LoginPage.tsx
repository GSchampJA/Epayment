import { useContext, useReducer } from "react";
import { Card, Col, Container, Row } from "react-bootstrap"
import { UserInfoContext } from "../../commonComponent/UserInfoContext";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppUrl } from "../../commonComponent/objectType/AppUrl";
import { extract_FileName } from "../../commonComponent/input/StringHandle";


interface LoginState {
  accountInput: {
    username?: string,
    password?: string,
    filename?: string,
    file?: Blob
  },
}


enum ActionType {
  UPDATE_ACCOUNT_INPUT = "UPDATE_ACCOUNT_INPUT",
  RECEIVE_API = "RECEIVE_API",
}

type Action = {
  type: ActionType.UPDATE_ACCOUNT_INPUT;
  target: keyof LoginState['accountInput'];
  value: string; 
} | {
  type: ActionType.RECEIVE_API;
}

const reducer = (state: LoginState, action: Action) => {
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


const LoginPage = () => {
  const [userInfo, setUserInfo] = useContext(UserInfoContext);
  const [state, dispatch] = useReducer(reducer, {
    accountInput: {}
  });





  const handlePrivateFileInputChange = (ref: any) => {
    let privateKey = "";

    // console.log(ref);
    console.log("file path: ", ref.target.value);
    console.log("file name: ", extract_FileName(ref.target.value));

    dispatch({ type: ActionType.UPDATE_ACCOUNT_INPUT, target: 'filename', value: extract_FileName(ref.target.value) })

    const file = ref.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      if (event && event.target) {
        privateKey = event.target.result as string;
        console.log('upload privateKey:');
        console.log(JSON.stringify(privateKey));


      }
      // console.log(privateKey);
      // cookies.set("userPrivateKeyStr", privateKey, 
      //   { path: '/', secure: true, sameSite :true}
      // );
    };
    reader.readAsText(file);
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md={5}>
          <Card className='LoginBorder_Card'>
            <Row className="justify-content-md-center"><Col></Col>Login<Col></Col></Row>
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
                  <TextField label="Password" variant="standard" value={state.accountInput.password}
                    onChange={(ref) => dispatch({ type: ActionType.UPDATE_ACCOUNT_INPUT, target: 'password', value: ref.target.value })} 
                  />
                </Box>
              </Col>
              <Col></Col>
            </Row>
            {/* upload file field */}
            <Row className="mt-5">
              <Col md={2}></Col>
              <Col md={7} className="" style={{marginLeft: '2rem'}}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  // sx={{ marginRight: "1rem" }}
                >
                  Your Private Key
                  <input type="file" accept=".txt" hidden onChange={(ref) => {
                    // console.log(ref.target.value)
                    handlePrivateFileInputChange(ref)

                    // dispatch({ type: ActionType.UPDATE_ACCOUNT_INPUT, target: 'file', value: ref.target.value })

                  }}/>
                </Button>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col md={3}></Col>
              <Col md={8} className="mt-1">{state.accountInput.filename}</Col>
              <Col></Col>
            </Row>

            <Row style={{marginTop: '5rem'}}>
              <Col></Col>
              <Col md={8}>New User ? <Link to={AppUrl.RegisterAC}>Register Here</Link></Col>
              <Col></Col>
            </Row>




          </Card>
        </Col>
        <Col></Col>
      </Row> 
    </Container>
  )
}

export default LoginPage