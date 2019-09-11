import React from "react";
import {Navbar, NavItem, Icon, TextInput, Badge} from "react-materialize";
import LoginForm from "./modals/login";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsersShoppingCarts } from "../actions/index";

class NavigationBar extends React.Component{
    constructor(){
        super();
        this.state = {
            search: false
        }
        this.enableSearch = this.enableSearch.bind(this);
        this.populateShoppingUser = this.populateShoppingUser.bind(this);
    }
    enableSearch(){
        this.setState({search:!this.state.search});
    }

    

    populateShoppingUser(){
        this.props.getUsersShoppingCarts({_id:"5d71b385f59cad04d80db0f5"});
    }

    render(){
        const { user } = this.props.user;
       
        const login = (<NavItem href="#" onClick={this.populateShoppingUser}>
                            {user?user.fullname:'LogIn'}
                            <Icon left>
                            account_box
                            </Icon>
                        </NavItem>);
        return(
            <div className="section">
                <Navbar fixed={true} search={this.state.search} brand={<a href="/">CLONMAZON</a>} alignLinks="right">
                    
                    <TextInput></TextInput>
                    <NavItem href="#" onClick={this.enableSearch}>
                        <Icon>
                        search
                        </Icon>
                    </NavItem>                    
                    <NavItem href="#">
                        <div className="count_item">
                            <Icon>
                            shopping_cart
                            </Icon>
                            <Badge newIcon>
                                {!this.props.shopping.shoppingCartSession.products?0:this.props.shopping.shoppingCartSession.products.length}
                            </Badge>
                        </div>
                        

                    </NavItem>  
                    {user?login:<LoginForm trigger = {login}></LoginForm>}      
                </Navbar>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      user: state.user.user,
      shopping: state.shoppingcart
    };
}


export default withRouter(connect(mapStateToProps,{getUsersShoppingCarts})(NavigationBar));
