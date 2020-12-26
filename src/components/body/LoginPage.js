import React, {useState, useContext, useRef, createRef} from 'react'

import {Form, FormControl, Button, Col, Row, Container, Alert} from "react-bootstrap";
import {Redirect} from 'react-router-dom'

import {UserManager} from '../../managers/userManager'
import userContext from "../../context/userContext";

const LoginPage = () => {
  let [status, setStatus] = useState(null)
  let [user, setUser] = useContext(userContext)
  let _username = useRef(null);
  let _password = useRef(null);

  if (user) return <Redirect to='/myposts'/>

  return (
    <Container fluid="sm">
      <Row className="mt-5">
        <Col xs={{span: 4, offset: 4}} lg={{span: 4, offset: 4}} md={{span: 6, offset: 3}} sm={{span: 10, offset: 1}}>
          <Form>
              <div className="text-primary text-center font-weight-bold" style={{'font-size': '24px'}}> Login </div>
              <br/>
            {status ?
                (status.err ? <Alert variant="danger"> {status.err} </Alert> :
                    (status.res ? <Alert variant="success"> {status.res} </Alert> : null))
                : null}


            <Form.Group controlId="formBasicEmail">
              <Form.Label> Username </Form.Label>
              <Form.Control type="text" placeholder="Username" ref={_username}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label> Password </Form.Label>
              <Form.Control type="password" placeholder="Password" ref={_password}/>
            </Form.Group>
            <Button variant="primary" type="button" onClick={(e) => {
              let username = _username.current.value;
              let password = _password.current.value;

              (async () => {
                  let ans = await UserManager.login(username, password)

                  if (ans.res) {
                      setUser(ans.res)
                      setStatus({res: 'Success'})
                  } else {
                      setStatus({err: ans.err})
                  }
              })()
            }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage