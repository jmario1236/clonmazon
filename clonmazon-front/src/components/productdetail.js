import React from "react";
import {Icon, Card, Button, Row, Col, Chip, Preloader, Select, } from "react-materialize";
import { getRemoteProducts, addProductToShoppingCartRemote } from "../actions/index";
import { connect } from "react-redux";

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

    AddToCartonClick(){
        if(!this.props.user.user.token){
            window.M.toast({html:'Please login!'});
            return;
        }
        if(this.state.quantity === 0){
            window.M.toast({html:'Please choose the quantity to buy!'});
            return;
        }
        const cartstore = this.props.shopping.shoppingCartSession;
        const productToAdd = [{quantity:this.state.quantity, product:{_id:this.props.products.products[0]._id}}];
        const cart = {  ...cartstore, 
                        user:this.props.user.user.user,
                        products:  (!cartstore.products?[]:cartstore.products).concat(productToAdd)
                    };
        this.props.addProductToShoppingCartRemote(cart);
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
                            {products.products[0].categories.map(category => <Chip key={category._id}>{category.name}</Chip>)}
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

export default connect(mapStateToProps,{getRemoteProducts, addProductToShoppingCartRemote})(ProductDetail);
