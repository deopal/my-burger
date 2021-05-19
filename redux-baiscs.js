import { CreateStore as _createStore } from 'redux';
const createStore=_createStore;

const initialState={
    counter:0
}
//reducer
const rootReducer=(state=initialState,action)=>{
    if(action.type==='INC_COUNTER'){
        return{
            ...state,
            counter:state.counter+1
        }
    }
    return state;
};


//store
const store=createStore(rootReducer);
console.log(store.getState());


//dispathcing action
store.dispatch({type:'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER' , value:10});
console.log(store.getState());

//subscription

