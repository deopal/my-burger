import React ,{Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';


import Input from '../../ui/input/input';
import Button from '../../ui/button/button';
import Spinner from '../../ui/spinner/spinner';
import './auth.css';
import * as actions from '../../store/index';

class Auth extends Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirect!=='/'){
            this.props.onSetAuthRedirect();
        }
    }

    checkValidity=(value,rules)=>{
        let isvalid=true;
        if(!rules){
            return true; 
        }
        if(rules.required){
            isvalid=value.trim()!=='' && isvalid;
        }
        if(rules.minLength){
            isvalid=isvalid&&(value.length>=rules.minLength);
        }
        if(rules.isEmail){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            isvalid=isvalid && reg.test(value);
            
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isvalid = pattern.test(value) && isvalid
        }
   
        return isvalid;
    }

    inputchangeHandler=(event, controlName)=>{
        const updateControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updateControls});

       }

       submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthmode=()=>{
        this.setState(prevState=>{
            return {isSignup:!prevState.isSignup};
        });
    }

    

    render(){
        const formelements=[];
        for(let key in this.state.controls){
            formelements.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let form=formelements.map(formele=>(
            <Input 
            key={formele.id}
            elementType={formele.config.elementType} 
            elementConfig={formele.config.elementConfig}
            value={formele.config.value} 
            invalid={!formele.config.valid}
            touched={formele.config.touched}
            shouldvalidate={formele.config.validation}
            changed={(event)=>this.inputchangeHandler(event,formele.id)} />
        ));

        if(this.props.loading){
            form=<Spinner />;
        }
        let errorMessage=null;

        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            );
        }

        let redirect=null;

        if(this.props.isAuth){

            redirect=(   
                <Redirect to={this.props.authRedirect} />
            )
        }

        return(
            <div className="Auth">
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Danger">SUBMIT</Button>
                </form>
                <button className="button Danger"
                onClick={this.switchAuthmode}
                >Switch to {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
            </div>
        );
    }

}

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !== null,
        building:state.order.building,
        authRedirect:state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup)),
        onSetAuthRedirect:()=>dispatch(actions.setAuthRedirect('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);