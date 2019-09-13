import React from "react";
import {Icon, Modal, Card, Button, TextInput} from "react-materialize";
import { loginRemoteUser } from "../../actions/index";
import { connect } from "react-redux";

class LoginForm extends React.Component{
    constructor(){
        super();
        this.state = {
            user:{
                email:'',
                password:''
            },
            openTrigger: undefined
        };
        this.loginOnClick = this.loginOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ user:{...this.state.user, [name]: value} });
    }

    loginOnClick(){
        console.log(this.state.user);
        if(this.validateField()){
            this.props.loginRemoteUser(this.state.user);
        }        
    }

    validateField(){
        if( this.state.user.email.trim() === '' || this.state.user.password.trim() === ''){
            window.M.toast({html:'Please fill in all fields!'});
            return false;
        }       
        return true;
    }


    render(){
        const login = (<Button className="Button-Login" onClick={this.loginOnClick}>
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
            <Modal header="Login Clonmazon" trigger={this.props.trigger} actions={listButton} open={this.props.user.token?false:undefined}> 
                <Card>
                    
                <TextInput name="email" 
                    value={this.state.user.email}
                    onChange={this.handleChange} 
                    autoComplete="new-password" 
                    className="inputs-box" 
                    placeholder="Enter your email">
                </TextInput>                       
                    
                <TextInput name="password" 
                    value={this.state.user.password} 
                    onChange={this.handleChange} 
                    autoComplete="new-password" 
                    password className="inputs-box" 
                    placeholder="Enter your password">
                </TextInput>
                       
                   
                </Card>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
      user: state.user.user
    };
}


export default connect(mapStateToProps,{loginRemoteUser})(LoginForm);