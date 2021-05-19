import React from 'react';
import Layout from './components/layout/layout.js';
import Burgerbuilder from './containers/burgerbuilder/burgerbuider.js';
import Checkout from './containers/checkout/checkout';
import {Route,Switch,Redirect} from 'react-router-dom';
import Orders from './containers/orders/orders';
import Auth from "./containers/auth/auth";
import Logout from "./containers/auth/logout";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from './store/index';

class App extends React.Component {
  componentDidMount(){
    this.props.authCheck();
  };

  render(){

    let routes=(
      <Switch>
      <Route path="/auth"  component={Auth} />
      <Route path="/" exact component={Burgerbuilder} />
      <Redirect to='/' />
      </Switch>
    );

    if(this.props.isAuth){
      routes=(
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout"  component={Logout} />
        <Route path="/auth"  component={Auth} />
        <Route path="/" exact component={Burgerbuilder} />
        <Redirect to='/' />
        </Switch>
      );
    };

  return (
    <div>
      <Layout>
       {routes}
      </Layout>
      
    </div>
  );
  }
}

const mapStateToProps=state=>{
  return{
    isAuth:state.auth.token!==null
  };
};

const mapDispatchToProps=dispatch=>{
  return{
  authCheck:()=>dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
