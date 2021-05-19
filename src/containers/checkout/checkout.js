import React ,{Component} from 'react';

import CheckoutSummary from '../../components/order/checkoutsummary/checkoutsummary';
import {Route} from 'react-router-dom';
import ContactData from './contactdata/contactdata';
import {connect} from 'react-redux';

class Checkout extends Component{
   

    // componentWillMount(){
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0]==='price'){
    //             price=param[1];
    //         }
    //         else{
    //         ingredients[param[0]]=+param[1];
    //         }
    //     }
    //     this.setState({ingredients:ingredients,price:price});
    // }

    checkoutCancelHandler=()=>{
        this.props.history.goBack();              
    }

    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings} 
                checkoutcancel={this.checkoutCancelHandler} 
                checkoutcontinue={this.checkoutContinueHandler} />
            <Route path={this.props.match.path+'/contact-data'} 
           component={ContactData}  />
            </div>
        );
    };
};

const mapStateToProps=state=>{
    return{
        ings:state.order.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);