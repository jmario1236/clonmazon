import React from "react";
import {Navbar, NavItem, Icon, TextInput, Badge, Dropdown, Divider} from "react-materialize";
import LoginForm from "./modals/login";
import RegisterUser from "./modals/registeruser";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getCategoriesRemote } from "../actions/index";

class NavigationBar extends React.Component{
           
    componentDidMount(){
        this.props.getCategoriesRemote({});
    }

    render(){
        const { user } = this.props.user;
       
        const login = (<NavItem href="#">
                            {user?user.fullname:'Log In'}
                            <Icon left>
                            account_box
                            </Icon>
                        </NavItem>);
        const register = (<NavItem href="#">
                            {user?user.fullname:'Sign Up'}
                            <Icon left>
                            open_in_new
                            </Icon>
                        </NavItem>);
        return(
            <div className="section">
                <Navbar brand={<Link to="/">CLONMAZON</Link>} alignLinks="right">
                    
                    <TextInput></TextInput>
                    <NavItem href="#" onClick={this.enableSearch}>
                        <Icon>
                        search
                        </Icon>
                    </NavItem>  
                                 
                    <NavItem href="#">
                    <Link to="/shoppingdetails">
                        <div className="count_item">
                            <Icon>
                            shopping_cart
                            </Icon>
                            <Badge caption="Items" newIcon>
                                {!this.props.shopping.shoppingCartSession || !this.props.shopping.shoppingCartSession.products?0:this.props.shopping.shoppingCartSession.products.length}
                            </Badge>
                        </div>
                    </Link>
                    </NavItem>  
                    <Dropdown trigger={<a>Categories</a>}>
                        {this.props.categories.map(category => 
                        <Link to={`/category/${category._id}`}>{category.name}</Link>
                        )}                      
                    </Dropdown>
                    {user?login:<LoginForm trigger = {login}></LoginForm>}  
                    {user?'':<RegisterUser trigger = {register}></RegisterUser>}    
                </Navbar>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      user: state.user.user,
      shopping: state.shoppingcart,
      categories: state.categories.categories
    };
}


export default withRouter(connect(mapStateToProps,{getCategoriesRemote})(NavigationBar));
