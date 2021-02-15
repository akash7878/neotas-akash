import React, { Component }  from 'react';
import DoneIcon from '@material-ui/icons/Done';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import './checkout.css';
import DetailView from './detail-view';
import PaymentView from './payment-view';
import SuccessView from './success-view';

const initialState = {
    isDetail: true,
    isPayment: false,
    isSuccess: false,
  };

let detailContCls = 'bold-grey-cls';
let paymentContCls = 'bold-grey-cls';
let successContCls = 'bold-grey-cls';

class CheckoutContainer extends Component {
    constructor(props){
        super(props);    
        this.state = initialState;
      }
    
      setPaymentActive() {
        detailContCls = 'bold-blue-cls';
        this.setState({
            isDetail: false,
            isPayment: true,
            isSuccess: false,
          });
      }

      setSuccessActive() {
        paymentContCls = 'bold-blue-cls';
        this.setState({
            isDetail: false,
            isPayment: false,
            isSuccess: true,
        });
      }

    render() {
        return (
            <div className="parent-cont">
                <div className="outer-cont">
                    <div className="inner-cont">
                        <h1> Checkout </h1>
                        <div className="border-line"></div>
                        <div className="options-cont">
                            <span className={detailContCls}>
                                <span><PersonOutlineOutlinedIcon /></span>
                                <span> DETAIL </span>
                            </span>
                            <span className={paymentContCls}>
                                <span><PaymentIcon /></span>
                                <span> PAYMENT </span>
                            </span>
                            <span className={successContCls}>
                                <span><DoneIcon /></span>
                                <span> SUCCESS </span>
                            </span>
                        </div>
                        <div className="border-line"></div>

                        {this.state.isDetail ? <DetailView triggerSetPaymentActive = {this.setPaymentActive.bind(this)} /> : null}
                        {this.state.isPayment ? <PaymentView triggerSetSuccessActive = {this.setSuccessActive.bind(this)} /> : null}
                        {this.state.isSuccess ? <SuccessView /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckoutContainer;