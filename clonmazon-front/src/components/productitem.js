import React from "react";
import {Icon, Card, Button} from "react-materialize";
import { withRouter, Link } from "react-router-dom";

class ProductItem extends React.Component{
    render(){
        const routerToProduct = `/product/${this.props.product._id}`
        const imagenProduct = ( <Link to={routerToProduct}><img src={this.props.product.url_image} alt={this.props.product.name} width="200px"></img></Link>)
        const addToCartButton = (<Button icon={<Icon left> add_shopping_cart</Icon>}>
                                    Add to cart                                    
                                </Button>)   
        const viewDetails = ( <Link to={routerToProduct}>
                                    <Button icon={<Icon left>chevron_right</Icon>}>
                                        Details                                
                                    </Button>
                                </Link>);        
        return(          
                <Card header={imagenProduct} title={this.props.product.name} actions={[addToCartButton, viewDetails]}>
                     <Link to={routerToProduct}>
                        <span>Price :</span><span>${this.props.product.price}</span>
                    </Link>
                </Card>
            
        );
    }
}

export default withRouter(ProductItem);