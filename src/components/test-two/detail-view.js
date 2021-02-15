import React, { Component }  from 'react';
import './checkout.css'

const initialState = {
    usernameError: "",
    emailError: "",
  };

class DetailView extends Component {

    constructor(props){
        super(props);
        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
    
        this.state = initialState;
      }

    isFormValid = () => {

        let usernamevalue = this.usernameRef.current.value;
        let emailvalue = this.emailRef.current.value;
    
        let usernameerr, emailerr;
    
        if(!usernamevalue.length){
          usernameerr = "Please Enter Name."
        }
    
        if(!emailvalue.length){
          emailerr = "Please Enter Email."
        } else if(!(emailvalue.indexOf('@') > -1)){
          emailerr = "Please Enter a valid Email."
        }
          
        if(usernameerr || emailerr){
          this.setState({
            usernameError: usernameerr,
            emailError: emailerr,
          });
    
          return false;
        }
        return true;
    }

    onSubmit = (event) => {
        event.preventDefault();
        if(this.isFormValid()) {
            console.log("Success")
            this.props.triggerSetPaymentActive();
        }
    }

    render() {
        return (
            <div className="fst-form-cont bold-grey-cls">
                <form onSubmit={this.onSubmit}>
                    Fill this form with your identity.
                    <p>Name</p>
                    <input className="input-cls" type="text" name="username" ref = {this.usernameRef} />
                    <div className="error-font">
                        {this.state.usernameError}
                    </div>

                    <p>Email</p>
                    <input className="input-cls" type="text" name="email" ref = {this.emailRef} />
                    <div className="error-font">
                        {this.state.emailError}
                    </div>
                    <p>The download link wll be sent to your email.</p>

                    <button className="sbmt-cls" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default DetailView;