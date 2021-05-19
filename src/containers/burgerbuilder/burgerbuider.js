import React ,{Component} from 'react';
import Buildcontrols from '../../components/burger/buildcontrols/buildcontrols.js';
import Burger from '../../components/burger/burger';
import Modal from '../../ui/modal/modal';
import Ordersummary from '../../components/burger/ordersummary/ordersummary';
import axios from '../../axiom-output';
import Spinner from '../../ui/spinner/spinner';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const ingredientprice={
    bacon:0.5,
    cheese:1,
    meat:1,
    salad:0.5
}
    

class Burgerbuilder extends Component {

state={
    
    purchasing:false,
    loading:false,
    error:false
}

// componentDidMount () {
//     axios.get( 'https://my-burger-43ab3-default-rtdb.firebaseio.com/ingredients.json' )
//         .then( response => {
//             this.setState( { ingredients: response.data } );
//         } )
//         .catch( error => {
//             this.setState( { error: true } );
//         } );
// }

updatePurchasestate(ingredient){
    const sum=Object.keys(ingredient).map(igkey=>{
        return ingredient[igkey];
    }).reduce((sum,el)=>{
        return sum+el;
    },0);
    return sum>0;
}

purchaseHandler=()=>{
    if(this.props.isAuth){
    this.setState({purchasing:true});
    }
    else{
        this.props.onSetRedirect('/checkout');
        this.props.history.push('/auth');
    }
}

purchasecancelHandler=()=>{
    this.setState({purchasing:false});
}

purchaseconfirmhandler=()=>{
    // this.setState( { loading: true } );
    // const order={
    //     ingredients:this.state.ingredients,
    //     price:this.state.totalprice,
    //     costumer:{
    //         name:'deopal',
    //         address:{
    //            street:'test-colony',
    //            pin:'354354',
    //            country:'gernany'}
    //     }
    // }

    // axios.post( '/order.json', order )
    //     .then( response => {
    //         console.log(response);
    //     this.setState({ loading: false, purchasing: false });
    //         } )
    //         .catch( error => {
    //             this.setState({ loading: false, purchasing: false });
    //         } );

    // const query=[];
    // for(let i in this.state.ingredients){
    //     query.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // query.push('price='+this.props.price);
    // const querystring=query.join('&');

    this.props.history.push('/checkout');

}

// addIngredientHandler=(type)=>{
//     const prev=this.state.ingredients[type];
//     const next=prev+1;
//     const updatedingredient={
//         ...this.state.ingredients
//     };
//     updatedingredient[type]=next;
//     const addprice=ingredientprice[type];
//     const price=this.state.totalprice;
//     const newprice=addprice+price;
//     this.setState(
//         {
//             ingredients:updatedingredient,
//             totalprice:newprice
//         }
//     );

//     this.updatePurchasestate(updatedingredient);


// }

// removeIngredientHandler=(type)=>{
    

//     const prev=this.state.ingredients[type];
//        const next=prev-1;
//     const updatedingredient={
//         ...this.state.ingredients
//     };
//     updatedingredient[type]=next;
//     const lessprice=ingredientprice[type];
//     const price=this.state.totalprice;
//     const newprice=price-lessprice;
//     this.setState(
//         {
//             ingredients:updatedingredient,
//             totalprice:newprice
//         }
//     );
//     this.updatePurchasestate(updatedingredient);
// }


    render(){
        const disabledinfo={
            ...this.props.ings
        };
    
        for(let key in disabledinfo){
            disabledinfo[key]=(disabledinfo[key]<=0);
        }

    let orderSummary = null;
    let burger=<Spinner />;

    if(this.props.ings){
        burger=(
            <React.Fragment>
            <Burger  ingredients={this.props.ings}/>
                <Buildcontrols 
                disabled={disabledinfo} 
                ingredientremoved={this.props.onIngredientRemoved} 
                ingredientadded={this.props.onIngredientAdded}
                totalprice={this.props.price}
                isAuth={this.props.isAuth}
                purchasable={this.updatePurchasestate(this.props.ings)}
                ordered={this.purchaseHandler}/>
            </React.Fragment>
        );

        orderSummary = (
        <Ordersummary
        ingredients={this.props.ings}
        price={this.props.price}
        cancelpurchase={this.purchasecancelHandler}
        confirmpurchase={this.purchaseconfirmhandler} /> );
    }

    if ( this.state.loading) {
        orderSummary = <Spinner />;
        
    }

        return(
            <React.Fragment>
                
                <Modal show={this.state.purchasing} modalclosed={this.purchasecancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>

        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.order.ingredients,
        price:state.order.totalPrice,
        isAuth:state.auth.token !==null

    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingname)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingname}),
        onIngredientRemoved:(ingname)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingname}),
        onSetRedirect:(path)=>dispatch({type:actionTypes.AUTH_REDIRECT,path:path})
    };
}



export default connect(mapStateToProps,mapDispatchToProps)(Burgerbuilder);