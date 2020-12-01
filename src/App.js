import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import DemoPage from './page/demopage/demopage.page';
import VerificationPage from './page/verification/verification.page';
import PaymentPage from './page/payment_init/payment_init.page'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@material-ui/core';

const SuccessPage = ()=>{
  return(
    <div>
      <Typography variant="h2" align="center">Payment Successful</Typography>
    </div>
  )
}

function App() {
  return (
    <Switch>
      <Route exact path="/" render={props=><Redirect to={{pathname:"/info"}} />} />
      <Route exact path="/info" component={DemoPage} />
      <Route exact path="/info/verify" component={VerificationPage} />
      <Route exact path="/payment" component={PaymentPage} />
      <Route exact path="/payment/success" component={SuccessPage} />
    </Switch>
  );
}

export default App;
