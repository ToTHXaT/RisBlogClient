import UserContext from '../context/userContext'
import React, {useContext} from 'react'


import {NavDropdown, Navbar, Nav, Form, FormControl, Button, NavLink} from "react-bootstrap";
import {Link} from 'react-router-dom'
import s from './Header.module.css'
import {UserManager} from "../managers/userManager";

const Header = () => {
    let [user, setUser]  = useContext(UserContext)

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home"> Blog </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/myposts"> My posts</Nav.Link>
              <Nav.Link as={Link} to="/createpost"> Create post </Nav.Link>
              <Nav.Link as={Link} to="/allposts"> Posts </Nav.Link>
            </Nav>
            {/*<Form inline className="ml-auto mr-5">*/}
            {/*  <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
            {/*  /!*<Button variant="outline-info">Search</Button>*!/*/}
            {/*</Form>*/}
            <Nav className="" style={{'margin-right': '80px'}}>
                <NavDropdown title={user ? user.username : 'Guest'} id="basic-nav-dropdown">

                    {!user ?
                        <>
                        <NavDropdown.Item as={Link} to='/login'> Login </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='/signup'> Sign up </NavDropdown.Item>
                        </>
                        :
                        <>
                        <NavDropdown.Item onClick={() => {

                            (async () => {

                                let ans = await UserManager.signout();

                                if (ans.res) {
                                    setUser(null)
                                } else {
                                    alert(ans.err)
                                }

                            })()

                        }}> Sign out </NavDropdown.Item>
                        </>
                    }
                </NavDropdown>

            </Nav>
      </Navbar>

    )
}

export default Header