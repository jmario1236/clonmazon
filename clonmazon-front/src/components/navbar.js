import React from "react";
import {Navbar, NavItem, Icon} from "react-materialize";
import LoginForm from "./modals/login";


class NavigationBar extends React.Component{
    constructor(){
        super();
        this.state = {
            user: {}
        }
    }
    render(){
        const { user } = this.state;
        const login = (<NavItem href="#">
                            {user.fullname?user.fullname:'LogIn'}
                            <Icon left>
                            account_box
                            </Icon>
                        </NavItem>);
        return(
            <div className="section">
                <Navbar brand={<a href="/">CLONMAZON</a>} alignLinks="right">
                    <NavItem href="get-started.html">
                        <Icon>
                        search
                        </Icon>
                    </NavItem>                    
                    <NavItem href="get-started.html">
                        <Icon>
                        shopping_cart
                        </Icon>
                    </NavItem>  
                    <LoginForm trigger = {login}></LoginForm>       
                </Navbar>
                
            </div>
        );
    }
}

export default NavigationBar;