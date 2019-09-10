import React from "react";
import {Row,Col,Preloader} from "react-materialize";
import { connect } from "react-redux";
import { getRemoteProducts } from "../actions/index";

import ProductItem from "./productitem";

class ProductList extends React.Component{
    
    componentDidMount(){
        this.props.getRemoteProducts();
    }


    render(){
        const { products }  = this.props;
        console.log(products)
        return(products.loading?<Preloader size="big" />:
            <Row>               
               {products.products.map(product =>  
                (<Col s={3} key={product._id}>
                    <ProductItem key={product._id} product={product}></ProductItem>                                                                
                 </Col>))}              
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
      products: state.products
    };
  }

export default connect(mapStateToProps,{getRemoteProducts})(ProductList);