import React from "react";
import {Icon, Card, Button} from "react-materialize";

import  ProductDetail  from "./modals/productdetail";

class ProductItem extends React.Component{
    render(){
        const imagenProduct = (<img src={this.props.product.url_image} alt={this.props.product.name} width="200px"></img>)
        const addToCartButton = (<Button>
                                    Add to cart
                                    <Icon left>
                                        add_shopping_cart
                                    </Icon>
                                </Button>)
        const showDetails = (<Button>
                                Detail
                                <Icon left>
                                details
                                </Icon>
                            </Button>)
        const modalDetail = (<ProductDetail trigger={showDetails} product={this.props.product}></ProductDetail>)
        return(
            <Card header={imagenProduct} title={this.props.product.name} actions={[addToCartButton,modalDetail]}>
                <span>Price :</span><span>{this.props.product.price}</span>
            </Card>
        );
    }
}

export default ProductItem;