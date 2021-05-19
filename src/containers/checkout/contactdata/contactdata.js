import React,{Component, isValidElement} from 'react';
import {connect} from 'react-redux';

import Button from '../../../ui/button/button';
import './contactdata.css';
import axios from '../../../axiom-output';
import Spinner from '../../../ui/spinner/spinner';
import Input from '../../../ui/input/input';

class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    }
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                pin:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Postal code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minlength:5
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest', displayValue:'Cheapest'}
                    ]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true
                }
            },
        formIsvalid:false,
        loading:false
    }

    orderHandler=(token)=>{
        this.setState( { loading: true } );
        const formdata={};
        for(let formeleIdentifier in this.state.orderForm){
            formdata[formeleIdentifier]=this.state.orderForm[formeleIdentifier].value;
        }
    const order={
        ingredients:this.props.ings,
        prices:this.props.price,
        orderData:formdata,
        userId:this.props.userId   
    }

    axios.post( '/orders.json?auth='+token, order )
        .then( response => {
            console.log(response);
        this.setState({ loading: false});
        this.props.history.push('/');
            } )
            .catch( error => {
                this.setState({ loading: false});
            } );

        console.log(this.props.ingredients);
    }

    checkValidity=(value,rules)=>{
        let isvalid=true;
        if(!rules){
            return true; 
        }
        if(rules.required){
            isvalid=value.trim()!=='' && isvalid;
        }
        if(rules.minlength){
            isvalid=isvalid&&(value.length>=rules.minlength);
        }
        return isvalid;
    }

    inputchangeHandler=(event, inputIdentifier)=>{
        const updateform={
            ...this.state.orderForm
        }
        const updatedformele={
            ...updateform[inputIdentifier]
        };
        updatedformele.value=event.target.value;
        updatedformele.touched=true;
        updatedformele.valid=this.checkValidity(updatedformele.value,updatedformele.validation);
        updateform[inputIdentifier]=updatedformele;

        let formIsvalid=true;
        for(let inputIdentifier in updateform){
            formIsvalid=updateform[inputIdentifier].valid && formIsvalid;
        }
        this.setState({orderForm:updateform,formIsvalid:formIsvalid});
    }

    render(){
        const formelements=[];
        for(let key in this.state.orderForm){
            formelements.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                    {formelements.map(formele=>(
                        <Input 
                           key={formele.id}
                           elementType={formele.config.elementType} 
                           elementConfig={formele.config.elementConfig}
                           value={formele.config.value} 
                           invalid={!formele.config.valid}
                           touched={formele.config.touched}
                           shouldvalidate={formele.config.validation}
                           changed={(event)=>this.inputchangeHandler(event,formele.id)}/>
                    ))}
                    <Button btnType="success" disabled={!this.state.formIsvalid} name="submit" clicked={()=>this.orderHandler(this.props.token)}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner />
        }
        return(
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    };
};

const mapStateToProps=state=>{
    return{
        ings:state.order.ingredients,
        price:state.order.totalPrice,
        token:state.auth.token,
        userId:state.auth.userId
    };
};

export default connect(mapStateToProps)(ContactData);