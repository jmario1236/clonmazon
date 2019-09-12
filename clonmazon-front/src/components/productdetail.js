import React from "react";
import {Icon, Card, Button, Row, Col, Chip, Preloader, Select, } from "react-materialize";
import { getRemoteProducts, addProductToShoppingCartRemote } from "../actions/index";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class ProductDetail extends React.Component{  

    constructor(){
        super();
        this.state = {
            quantity : 0
        }
        this.getListUnit = this.getListUnit.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.AddToCartonClick = this.AddToCartonClick.bind(this);
    }
   
    componentDidMount(){
        this.props.getRemoteProducts({_id: this.props.productid});
    }

    getListUnit(){        
        let listUnit = [];
        if(!this.props.products.products[0]){return []}
        for(let x = 0; x < this.props.products.products[0].stock; x++){
            listUnit.push(x);
        }
        return listUnit;
    }

    actionHandler(event){
        this.setState({quantity: parseInt(event.target.value)?parseInt(event.target.value):0});
    }

    agregateProductQuantity(productsStore, newAdd){
        if(!productsStore || productsStore.length === 0){
            return [].concat(newAdd);
        }
        let find = productsStore.find(item => item.product._id === newAdd[0].product._id);
        if(!find){
            return productsStore.concat(newAdd);
        }
        return productsStore.map(item => item.product._id === newAdd[0].product._id?{...item,quantity:item.quantity+=newAdd[0].quantity}:item);       
    }

    AddToCartonClick(){
        if(!this.props.user.user.token){
            window.M.toast({html:'Please login or enjoy!'});
            return;
        }
        if(this.state.quantity === 0){
            window.M.toast({html:'Please choose the quantity to buy!'});
            return;
        }
        const cartstore = !this.props.shopping.shoppingCartSession?{}:this.props.shopping.shoppingCartSession;
        const productToAdd = [{quantity:this.state.quantity, product:{_id:this.props.products.products[0]._id}}];
        const cart = {  ...cartstore, 
                        user:this.props.user.user.user,
                        products: this.agregateProductQuantity(cartstore.products,productToAdd) //(!cartstore.products?[]:cartstore.products).concat(productToAdd)
                    };
        console.log(cart);
        this.props.addProductToShoppingCartRemote(cart);
        window.M.toast({html:'Product added!'});
    }

    render(){
        const addToCartButton = (<Button onClick={this.AddToCartonClick}>
                                    Add to cart
                                    <Icon left>
                                        add_shopping_cart
                                    </Icon>
                                </Button>);
        
        const quantity = (<Select onChange={this.actionHandler}>
                                <option value="">
                                    Choose quantity
                                </option>
                                {this.getListUnit().map(unit => <option value={unit}>{unit}</option>)}                               
                            </Select>)
        const div = (<div className="details-button">
                     {quantity}
                        {addToCartButton}
                        
                    </div>)
        const { products }  = this.props;
        return(
                products.loading || !products.products[0]?<Preloader size="big" />:
                <Card title={products.products[0].name} className="App" actions={[div]}>
                    <Row >
                        <Col s={12}>
                            <img height="200px" src={products.products[0].url_image} alt={products.products[0].name}></img>
                        </Col>
                        <Col s={6} className="text-right">
                            <span>Name: </span>
                        </Col>
                        <Col s={6} className="text-justify">
                            <span>{products.products[0].name}</span>
                        </Col>
                        <Col s={6} className="text-right">
                            <span>Description: </span>
                        </Col>
                        <Col s={6} className="text-justify">
                            <span>{products.products[0].description}</span>
                        </Col>
                        <Col s={6} className="text-right">
                            <span>Price: </span>
                        </Col>
                        <Col s={6} className="text-justify">
                            <span>${products.products[0].price}</span>
                        </Col>
                        <Col s={6} className="text-right">
                            <span>Units available: </span>
                        </Col>
                        <Col s={6} className="text-justify">
                            <span>{products.products[0].stock}</span>
                        </Col>
                        <Col s={6} className="text-right">
                            <span>Categories: </span>
                        </Col>
                        <Col s={6} className="text-justify">
                            {products.products[0].categories.map(category => <Link to={`/category/${category._id}`}><Chip key={category._id}>{category.name}</Chip></Link>)}
                        </Col>
                        
                    </Row>
                </Card>
           

        );
    }
}

function mapStateToProps(state) {
    return {
      products: state.products,
      user: state.user,
      shopping: state.shoppingcart
    };
  }

export default withRouter(connect(mapStateToProps,{getRemoteProducts, addProductToShoppingCartRemote})(ProductDetail));
