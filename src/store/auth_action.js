import * as actionTypes from './actions';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    };
};

export const authsuccess=(token,userid)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userid
    };
};

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout=(expireTime)=>{
    return dispatch=>{
        setTimeout(() => {
            dispatch(logout());
        }, expireTime*1000);
    };
};

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8Uk-gOREup1LuKBM4DBBpVAf1mtjaRJQ';
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8Uk-gOREup1LuKBM4DBBpVAf1mtjaRJQ';
        }
        axios.post(url,authData)
        .then(response =>{
            console.log(response);
            const expirationDate= new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expireDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authsuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirect=(path)=>{
    return{
        type:actionTypes.AUTH_REDIRECT,
        path:path
    };
};

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expiryDate=new Date(localStorage.getItem('expireDate'));
            if(expiryDate > new Date()){
                const userId=localStorage.getItem('userId');
                dispatch(authsuccess(token,userId));
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime())/1000));
            }
            else{
                dispatch(logout());
            }
            

        }
    }
}