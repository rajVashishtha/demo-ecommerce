import React from 'react';
import Header from '../../component/header/header.component';
import CustomProgressBar from '../../component/progressbar/progressbar.component';
import { FormControl, FormHelperText, OutlinedInput, InputLabel, Typography } from '@material-ui/core';
import {Button} from 'react-bootstrap';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { PayPalButton } from "react-paypal-button-v2";
import { withRouter } from 'react-router';



class PaymentPage extends React.Component{
    state={
        quantity:"",
        succeed:true
    }
    handleChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render(){
        return(
            <div>
                <Header />
                <CustomProgressBar progress={100} />
                <div className="demopage" >
                    <div className="form">
                        <form autoComplete="off" noValidate style={{
                            display:"flex",flexDirection:"column",flexGrow:"5"
                        }} onSubmit={this.handleSubmit}>
                            <Typography style={{marginLeft:"30px"}}>Payment</Typography>
                            <FormControl  variant="outlined" className="form-item">
                                <InputLabel htmlFor="name">Quantity</InputLabel>
                                <OutlinedInput id="name" value={this.state.quantity} name="quantity" type="number" min="1" label="Quantity" onChange={this.handleChange} />
                            {
                                this.state.emptyQuantity?(<FormHelperText error>Required*</FormHelperText>):(null)
                            }
                            </FormControl>
                        {
                            this.state.quantity?(<Typography variant="h5" align="center">Your total Cost : {Math.abs(this.state.quantity)*25} </Typography>):(null)
                        }
                        </form>
                    {
                        this.state.succeed?(
                            <div style={{
                                marginTop:"20px"
                            }}>
                                <PayPalButton amount={Math.abs(this.state.quantity) * 25} options={{
                                    currency:"INR",
                                    clientId:"AdsOTV8ftYihXtgjYTifO4K8bRMsm9UerOPIYv_fe3nASrOMXtvrTKqn90-rqg6I85MeXfnnp3mwXdpo"
                                }} createOrder={(data,action)=>{
                                        return action.order.create({
                                            purchase_units:[{
                                                amount:{
                                                    value:Math.abs(this.state.quantity)*25,
                                                }
                                            }]
                                        })
                                }}
                                onSuccess = {(details, price)=>{
                                    console.log(details, price);
                                    this.props.history.push("/payment/success")
                                }}
                                />
                            </div>
                        ):(null)
                    }
                    </div>
                    <div className="decorative">
                        <h1>Buy From Us.</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PaymentPage);