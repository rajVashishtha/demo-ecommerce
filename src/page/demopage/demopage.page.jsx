import { FormControl, FormHelperText, OutlinedInput, InputLabel, Typography } from '@material-ui/core';
import React from 'react';
import './demopage.style.scss';
import Header from '../../component/header/header.component';
import {Button,Form} from 'react-bootstrap';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CustomProgressBar from '../../component/progressbar/progressbar.component';
import axios from 'axios';
import {withRouter} from 'react-router'

class DemoPage extends React.Component{
    state={
        name:"",
        email:"",
        mobile:"",
        billing:"",
        shipping:"",
        pincode:"",
        emptyEmail:false,
        emptyName:false,
        emptyBilling:false,
        emptyShipping:false,
        emptyProduct:false,
        product:"",
        loading:false
    }
    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }
    handleSubmit = async event =>{
        event.preventDefault();
        if(!this.state.email || !this.state.name || !this.state.billing || !this.state.shipping || !this.state.product){
            this.setState({
                emptyName:!this.state.name,
                emptyEmail:!this.state.email,
                emptyBilling:!this.state.billing,
                emptyShipping:!this.state.shipping,
                emptyProduct:!this.state.product
            })
            return;
        }
        else{
            this.setState({
                loading:true
            })
            const {history} = this.props;
            const formdata = new FormData();
            await formdata.append("name",this.state.name);
            await formdata.append("email",this.state.email);
            await formdata.append("billing_address",this.state.billing);
            await formdata.append("shipping_address",this.state.shipping);
            await formdata.append("product",this.state.product);
            axios.post("https://demo-mcafee.herokuapp.com/store",formdata).then(res=>{
                console.log(res)
                const user_id = res.data.message.user_id;
                this.setState({
                    loading:false,
                })
                history.push({
                    pathname:"/info/verify",
                    state:{user_id:user_id,product:this.state.product}
                })
            }).catch(err=>{
                console.log(err)
                this.setState({
                    loading:false
                })
            })

        }
    }
    render(){
        return(
            <>
            <Header />
            <CustomProgressBar progress={34} />
            <div className="demopage" >
                <div className="form">
                    <form autoComplete="off" noValidate style={{
                        display:"flex",flexDirection:"column",flexGrow:"5"
                    }} onSubmit={this.handleSubmit}>
                        <Typography style={{marginLeft:"30px"}}>Generate Payment</Typography>
                        <FormControl  variant="outlined" className="form-item">
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <OutlinedInput id="name" value={this.state.name} name="name" type="text" label="Name" onChange={this.handleChange} />
                        {
                            this.state.emptyName?(<FormHelperText error>Required*</FormHelperText>):(null)
                        }
                        </FormControl>

                        <FormControl  variant="outlined" className="form-item">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput id="email" value={this.state.email} name="email" type="email" label="Email" onChange={this.handleChange} />
                        {
                            this.state.emptyEmail?(<FormHelperText error>Required*</FormHelperText>):(null)
                        }
                        </FormControl>

                        <FormControl  variant="outlined" className="form-item">
                            <InputLabel htmlFor="billing">Billing Address</InputLabel>
                            <OutlinedInput id="billing" value={this.state.billing} name="billing"  label="Billing Address" onChange={this.handleChange} />
                        {
                            this.state.emptyBilling?(<FormHelperText error>Required*</FormHelperText>):(null)
                        }
                        </FormControl>

                        <FormControl  variant="outlined" className="form-item">
                            <InputLabel htmlFor="shipping">Shipping Address</InputLabel>
                            <OutlinedInput id="shipping" value={this.state.shipping} name="shipping" label="Shipping Address" onChange={this.handleChange} />
                        {
                            this.state.emptyShipping?(<FormHelperText error>Required*</FormHelperText>):(null)
                        }
                        </FormControl>
                        <Form.Group controlId="exampleForm.SelectCustomSizeLg" className="form-item">
                            <Form.Label style={{
                                color:this.state.emptyProduct?"red":""
                            }}>Select Product{this.state.emptyProduct?" *":""}</Form.Label>
                            <Form.Control as="select" size="lg" name="product" custom onChange={this.handleChange}>
                            <option selected disabled value="">None</option>
                            <option value="First">First</option>
                            <option value="Demo product">Demo product</option>
                            <option value="Neccessity">Neccessity</option>
                            <option value="Value">Value</option>
                            </Form.Control>
                        </Form.Group>
                        <div style={{
                            display:"flex",
                            flexDirection:"column-reverse",
                            justifyContent:"flex-end",
                            alignItems:"flex-end",
                            marginRight:"20px"
                        }}>
                            <Button type="submit" disabled={this.state.loading} variant="outline-primary">{this.state.loading?"Loading...":"Next"}<NavigateNextIcon /></Button>
                        </div>
                    </form>
                </div>
                <div className="decorative">
                    <h1>Buy From Us.</h1>
                </div>
            </div>
            </>
        )
    }
}

export default withRouter(DemoPage);