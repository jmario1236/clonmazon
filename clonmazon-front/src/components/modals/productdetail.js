import React from "react";
import {Icon, Modal, Card, Button, Row, Col, Chip} from "react-materialize";

import ProductQuantity from "./productquantity";

class ProductDetail extends React.Component{

    
    constructor(){
        super();
        this.state = {
            open: undefined
        }
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleCloseModal(open){
        this.setState({open: open});
    }

    render(){
        const addToCartButton = (<Button>
                                    Add to cart
                                    <Icon left>
                                        add_shopping_cart
                                    </Icon>
                                </Button>);
        
        const addToCartModalButton = (<ProductQuantity trigger={addToCartButton} product={this.props.product} openTrigger={this.handleCloseModal}></ProductQuantity>)
        return(
            <Modal header="Detail Product" trigger={this.props.trigger} actions={[addToCartModalButton]} open={this.state.open}>
                <Card title={this.props.product.name} className="App">
                    <Row>
                        <Col s={12}>
                            <img height="200px" src={this.props.product.url_image} alt={this.props.product.name}></img>
                        </Col>
                        <Col s={6}>
                            <span>Name: </span>
                        </Col>
                        <Col s={6}>
                            <span>{this.props.product.name}</span>
                        </Col>
                        <Col s={6}>
                            <span>Description: </span>
                        </Col>
                        <Col s={6}>
                            <span>{this.props.product.description}</span>
                        </Col>
                        <Col s={6}>
                            <span>Price: </span>
                        </Col>
                        <Col s={6}>
                            <span>${this.props.product.price}</span>
                        </Col>
                        <Col s={6}>
                            <span>Units available: </span>
                        </Col>
                        <Col s={6}>
                            <span>{this.props.product.stock}</span>
                        </Col>
                        <Col s={6}>
                            <span>Categories: </span>
                        </Col>
                        <Col s={6}>
                            {this.props.product.categories.map(category => <Chip key={category._id}>{category.name}</Chip>)}
                        </Col>
                        
                    </Row>
                </Card>
            </Modal>

        );
    }
}


export default ProductDetail;