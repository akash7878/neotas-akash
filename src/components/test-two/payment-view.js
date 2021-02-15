import React, { Component }  from 'react';
import './checkout.css'

const initialState = {
    cardError: "",
    expiryError: "",
    usernameError: "",
    codeError: "",
  };

class PaymentView extends Component {

    constructor(props){
        super(props);
        this.cardRef = React.createRef();
        this.expiryRef = React.createRef();
        this.usernameRef = React.createRef();
        this.codeRef = React.createRef();
    
        this.state = initialState;
      }

    isFormValid = () => {

    let cardvalue = this.cardRef.current.value;
    let expiryalue = this.expiryRef.current.value;
    let usernamevalue = this.usernameRef.current.value;
    let codevalue = this.codeRef.current.value;

    let carderr, expiryerr, usernameerr, codeerr;

    if(!cardvalue.length || cardvalue.length !== 16){
      carderr = "Please Enter 16 Digit Card No."
    }

    if(!expiryalue.length){
      expiryerr = "Please Enter Expiry"
    }

    if(!usernamevalue.length){
        usernameerr = "Please Enter Name."
    }
  
    if(!codevalue.length){
        codeerr = "Please Enter Code"
    }
      
    if(carderr || expiryerr || usernameerr || codeerr){
      this.setState({
        cardError: carderr,
        expiryError: expiryerr,
        usernameError: usernameerr,
        codeError: codeerr,
      });

      return false;
    }
    return true;
  }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.isFormValid()){
            console.log("Success")
            this.props.triggerSetSuccessActive();
        }
    }

    render() {
        return (
            <div className="fst-form-cont bold-grey-cls">
                <form onSubmit={this.onSubmit}>
                    Fill this form with your credit card bills.

                    <div className="flex-info">
                        <div className="full-width">
                            <p>Card Number</p>
                            <input className="input-card-cls" type="text" name="username" ref = {this.cardRef} />
                            <div className="error-font">
                                {this.state.cardError}
                            </div>
                        </div>
                        <div className="full-width">
                            <p>Expiry</p>
                            <input className="input-exp-cls" type="text" name="username" ref = {this.expiryRef} />
                            <div className="error-font">
                                {this.state.expiryError}
                            </div>
                        </div>
                    </div>

                    <div className="flex-info">
                        <div className="full-width">
                            <p>Name on Card</p>
                            <input className="input-card-cls" type="text" name="username" ref = {this.usernameRef} />
                            <div className="error-font">
                                {this.state.usernameError}
                            </div>
                        </div>
                        <div className="full-width">
                            <p>Code</p>
                            <input className="input-exp-cls" type="text" name="username" ref = {this.codeRef} />
                            <div className="error-font">
                                {this.state.codeError}
                            </div>
                        </div>
                    </div>

                    <p>Secure Payment</p>
                    <button className="sbmt-cls" type="submit">Pay with Card</button>
                </form>
            </div>
        );
    }
}

export default PaymentView;