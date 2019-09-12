import React from "react";
import {Row,Col,Preloader} from "react-materialize";
import { connect } from "react-redux";
import { getRemoteProducts } from "../actions/index";
import ProductItem from "./productitem";

class ProductList extends React.Component{   

    constructor(){
        super();
        this.state = {
            idCategory: ''
        }
    }

    componentDidMount(){
        if(this.props.idcategory){
            this.props.getRemoteProducts({categories:this.props.idcategory});
        }else{
            this.props.getRemoteProducts({});
        }        
    }

    componentDidUpdate(prevProps){
        if(prevProps.idcategory !== this.props.idcategory){
            prevProps.getRemoteProducts({categories:this.props.idcategory});
        }
    }
    
    render(){
        const { products }  = this.props;
        console.log(products)
        return(products.loading?<Preloader size="big" />:
            <Row>               
               {products.products.length===0?<Col s={12} m={12} l={12}><h4>Products not found for this category.</h4></Col>:
               products.products.map(product =>  
                (<Col s={12} m={6} l={3} xl={3} key={product._id}>
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