import React from 'react';
import {Footer} from "react-materialize"
import NavigationBar from "./components/navbar";
import ProductList from "./components/productlist";
import ProductDetail from "./components/productdetail";
import ShoppingCartDetails from "./components/shoppingcartdetails";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';


function productList(){
  return(<ProductList></ProductList>);
}

function productListCategory({ match }){
  return(<ProductList idcategory={match.params.idcategory}></ProductList>);
}

function productListSearch({ match }){
  return(<ProductList search={match.params.search}></ProductList>);
}

function productDetails({ match }){
  return(<ProductDetail productid={match.params.id}></ProductDetail>);
}

function App() {
  return (
    <Router>
      <NavigationBar></NavigationBar>
      <div className="App">
        
        <Route path="/" exact component={productList} />
        <Route path="/search/:search" component={productListSearch}></Route>
        <Route path="/category/:idcategory" component={productListCategory} />
        <Route path="/product/:id" component={productDetails} />
        <Route path="/shoppingdetails" component={ShoppingCartDetails}></Route>
        <Footer
          copyrights="Clonmazon 2019 - Cartagena de indias"
        ></Footer>
      </div>
      
    </Router>
  );
}

export default App;
