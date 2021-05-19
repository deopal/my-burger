import React ,{Component} from 'react';

import Order from '../../components/order/orders';
import axios from '../../axiom-output';
import withErrorHandler from '../../withErrorhandler';
import {connect} from 'react-redux';



class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        const tokenid=this.props.token;
        const user=this.props.userId;
        const queryParams = '?auth=' + tokenid + '&orderBy="userId"&equalTo="' + user + '"';
        axios.get('/orders.json' + queryParams)
        .then(res=>{
            const fetchedorders=[];
            for(let key in res.data){
                fetchedorders.push({
                    ...res.data[key],
                    id:key
                });
            }
            this.setState({loading:false , orders:fetchedorders});

        })
        .catch(err=>{
            this.setState({loading:false});
        })
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={order.prices}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        token:state.auth.token,
        userId:state.auth.userId

    }
}

export default connect(mapStateToProps)( withErrorHandler( Orders, axios ) );;