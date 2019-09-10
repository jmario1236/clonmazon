import React from 'react';
import {Footer} from "react-materialize"
import NavigationBar from "./components/navbar";
import ProductList from "./components/productlist";
import './App.css';

function App() {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="App">
        <ProductList></ProductList>
        <Footer
          copyrights="Clonmazon 2019 - Cartagena de indias"
        ></Footer>
      </div>
      
    </div>
  );
}

export default App;
