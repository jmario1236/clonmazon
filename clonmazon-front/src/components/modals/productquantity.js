import React from "react";
import {Icon, Modal, Card, Button, TextInput } from "react-materialize";

class ProductQuantity extends React.Component{

    constructor(){
        super();
        this.state = {
            open: false
        }
        this.handleCloseModalClick = this.handleCloseModalClick.bind(this);
    }

    handleCloseModalClick(){
        this.setState({
            open:false
        })
        this.props.openTrigger(false);
    }

    render(){
        const okButton=(<Button onClick={this.handleCloseModalClick}>
                            OK
                            <Icon left>
                                check
                            </Icon>
                        </Button>);
        const cancelButton=(<Button>
                                CANCEL
                                <Icon left>
                                    close
                                </Icon>
                            </Button>);
        return(
            <Modal header="Product" trigger={this.props.trigger} actions={[okButton,cancelButton]} open={this.state.open}>
                <Card className="App">
                    <TextInput  className="inputs-box" placeholder="Enter Quantity to buy"></TextInput> 
                </Card>
            </Modal>
        );
    }
}

export default ProductQuantity;