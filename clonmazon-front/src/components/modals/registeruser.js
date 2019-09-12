import React from "react";
import {Icon, Modal, Card, Button, TextInput} from "react-materialize";
import { registerRemoteUser } from "../../actions/index";
import { connect } from "react-redux";

class RegisterUser extends React.Component{
    constructor(){
        super();
        this.state = {
            user:{
                email:'',
                password:'',
                passwordagain: '',
                fullname:'',
            },
            openTrigger: undefined
        };
        this.singupOnClick = this.singupOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ user:{...this.state.user, [name]: value} });
    }   

    singupOnClick(){
        console.log(this.state.user);
        const newuser = {
            fullname: this.state.user.fullname,
            email: this.state.user.email,
            password: this.state.user.password
        }
        this.props.registerRemoteUser(newuser);
    }

    render(){
        const login = (<Button className="Button-Login" onClick={this.singupOnClick}>
                            SingUp
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
            <Modal header="User Register" fixedFooter trigger={this.props.trigger} actions={listButton} open={this.props.user.token?false:undefined}> 
                <Card title="Information Register">
                    
                <TextInput name="fullname" 
                    value={this.state.user.fullname}
                    onChange={this.handleChange} 
                    autoComplete="new-password" 
                    className="inputs-box" 
                    placeholder="Enter your fullname">
                </TextInput>

                <TextInput name="email" email validate error="Invalid email!"
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
                       
                <TextInput name="passwordagain" 
                    value={this.state.user.passwordagain} 
                    onChange={this.handleChange} 
                    autoComplete="new-password" 
                    password className="inputs-box" 
                    placeholder="Enter your password again">
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

export default connect(mapStateToProps,{registerRemoteUser})(RegisterUser);