import React from "react";
import {Icon, Card, Button, Row, Col, Chip, Preloader, Select, Table} from "react-materialize";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addProductToShoppingCartRemote, getUsersShoppingCarts } from "../actions/index";


class ShoppingCartDetails extends React.Component{

    constructor(){
        super();
        this.onClickRemoveProduct = this.onClickRemoveProduct.bind(this);
    }

    componentDidMount(){
        if(this.props.user.user){
            this.props.getUsersShoppingCarts({userid: this.props.user.user._id});
        }
            
    }

    onClickRemoveProduct(id){
        const productItems = this.props.shopping.shoppingCartSession.products.filter(p => p._id !==id );
        const cart = {...this.props.shopping.shoppingCartSession, products:productItems}
        this.props.addProductToShoppingCartRemote(cart);
    }

    render(){
        const shoppingCartSession = this.props.shopping.shoppingCartSession;
        return(
        <Card title="Shopping Cart Detail">
            <Table>
                <thead>
                    <tr>
                        <th>
                            Product
                        </th>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Subtotal
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {   !shoppingCartSession || !shoppingCartSession.products || shoppingCartSession.products.length === 0?<tr><td colSpan={6}>Empty Shopping cart!</td></tr>:
                        shoppingCartSession.products.map(productItem => 
                    (
                        <tr>
                            <td>
                                <img src={productItem.product.url_image} height="100px"></img>
                            </td>
                            <td>
                                {productItem.product.name}
                            </td>
                            <td>
                                ${productItem.product.price}
                            </td>
                            <td>
                                {productItem.quantity}
                            </td>
                            <td>
                                ${productItem.product.price*productItem.quantity}
                            </td>
                            <td>
                                <Button
                                    small
                                    icon={<Icon>delete</Icon>}
                                    className="red"
                                    tooltip="Remove product"
                                    onClick={()=>{this.onClickRemoveProduct(productItem._id)}}
                                >
                                </Button>
                            </td>
                        </tr>
                    )
                    ) }
                    
                </tbody>
            </Table>
        </Card>
        );
    }

}

function mapStateToProps(state) {
    return {
      user: state.user.user,
      shopping: state.shoppingcart
    };
}


export default withRouter(connect(mapStateToProps,{addProductToShoppingCartRemote, getUsersShoppingCarts})(ShoppingCartDetails));