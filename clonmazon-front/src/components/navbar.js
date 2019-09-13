import React from "react";
import {Navbar, NavItem, Icon, TextInput, Badge, Dropdown, Button} from "react-materialize";
import LoginForm from "./modals/login";
import RegisterUser from "./modals/registeruser";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getCategoriesRemote, eraseError, eraseErrorShopping } from "../actions/index";

class NavigationBar extends React.Component{

    constructor(){
        super();
        this.state = {
            name: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.refreshBrowser = this.refreshBrowser.bind(this);
    }
           
    componentDidMount(){
        this.props.getCategoriesRemote({});
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.error !== this.props.user.error && this.props.user.error !== ''){
            window.M.toast({html:this.props.user.error});
            prevProps.eraseError();
        }
        if(prevProps.shopping.error !== this.props.shopping.error && this.props.shopping.error !== ''){
            window.M.toast({html:this.props.shopping.error});
            prevProps.eraseErrorShopping();
        }
    }

    handleOnChange(event){
        const { value } = event.target;
        this.setState({name:value});
    }

    refreshBrowser(){
        window.location = "/";
    }

    render(){
        const { user } = this.props.user.user;
       
        const login = (<NavItem href="#">
                            {user?user.fullname:'Sign In'}
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
                    
                    <TextInput className="input-search-product" onChange={this.handleOnChange}></TextInput>
                    <Link to={`/search/${this.state.name}`}>
                        <Button node="a" icon={<Icon>
                            search
                            </Icon>}>                        
                        </Button>
                    </Link>
                                 
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
                    {user?<Button onClick={this.refreshBrowser}>Sign Out</Button>:''}      
                </Navbar>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      user: state.user,
      shopping: state.shoppingcart,
      categories: state.categories.categories
    };
}


export default withRouter(connect(mapStateToProps,{getCategoriesRemote, eraseError, eraseErrorShopping})(NavigationBar));
