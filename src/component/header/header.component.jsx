import React from 'react';
import './header.style.scss';
import {Navbar} from 'react-bootstrap'

class Header extends React.Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark" style={{
                height:"50px"
            }}>
                <Navbar.Brand href="">
                <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                E-Commerce
                </Navbar.Brand>
            </Navbar>
        )
    }
}

export default Header;