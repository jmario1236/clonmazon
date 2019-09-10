import React from "react";
import {Icon, Modal, Card, Button, TextInput} from "react-materialize";


class LoginForm extends React.Component{
    render(){
        const login = (<Button className="Button-Login">
                            LogIn
                            <Icon left>
                                done
                            </Icon>
                        </Button>);
        const exit = (<Button modal="close" className="Button-Login">
                            Cancel
                            <Icon left>
                                clear
                            </Icon>
                        </Button>);
        const listButton = [login,exit];
        return(
            <Modal header="Login Clonmazon" trigger={this.props.trigger} actions={listButton}>
                <Card>
                    
                <TextInput name="login-user" autoComplete="new-password" className="inputs-box" placeholder="Enter your email"></TextInput>                       
                    
                <TextInput name="password-user" autoComplete="new-password" password className="inputs-box" placeholder="Enter your password"></TextInput>
                       
                   
                </Card>
            </Modal>
        );
    }
}

export default LoginForm;