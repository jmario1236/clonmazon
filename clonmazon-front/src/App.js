import React from 'react';
import {Footer} from "react-materialize"
import NavigationBar from "./components/navbar";
import ProductList from "./components/productlist";
import ProductDetail from "./components/productdetail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';


function productList(){
  return(<ProductList></ProductList>);
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
        <Route path="/product/:id" component={productDetails} />
        <Footer
          copyrights="Clonmazon 2019 - Cartagena de indias"
        ></Footer>
      </div>
      
    </Router>
  );
}

export default App;
