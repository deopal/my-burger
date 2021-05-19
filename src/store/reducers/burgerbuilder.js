import * as actionTypes from '../actions';

const initialState={
    ingredients:{
        salad:0,
        meat:0,
        bacon:0,
        cheese:0
    },
    error:false,
    totalPrice:4,
    building:false
};

const INGREDIENT_PRICES={
    bacon:0.5,
    cheese:1,
    meat:1,
    salad:0.5
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true


            };
        default:
            return state;
    }
};

export default reducer;
