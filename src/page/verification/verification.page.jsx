import React from 'react';
import Header from '../../component/header/header.component';
import {Form, Button,FormFile,Image} from 'react-bootstrap';
import {Grid, Typography} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CustomProgressBar from '../../component/progressbar/progressbar.component';
import CustomCamera from '../../component/camera/camera.component';
import Axios from 'axios';



class VerificationPage extends React.Component{
    state={
        type:"",
        emptyType:true,
        image1:null,
        image2:null,
        image1URL:"",
        image2URL:"",
        loading:false
    }
    dataURLtoFile = (dataurl, filename) =>{
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
    handleChange = event =>{
        const {name,value} = event.target;
        this.setState({
            [name]:value
        }) 
        if(name === "type"){
            this.setState({
                emptyType:false
            })
        }      
    }
    handleImageChange = event =>{
        if(event.target.files && event.target.files[0]){
            this.setState({
                [`${event.target.name}URL`]:URL.createObjectURL(event.target.files[0]),
                [event.target.name]:event.target.files[0]
            },()=>{console.log(this.state)});
        }
    }
    handleTakePhoto = (uri,name) =>{
        this.setState({
            [name]:this.dataURLtoFile(uri,`${name}.jpeg`),
            [`${name}URL`]:uri
        });
    }
    handleSubmit = event =>{
        event.preventDefault();
        if(!this.state.image1 || !this.state.image2 || !this.state.type){
            this.setState({
                emptyImage1:!this.state.image1,
                emptyImage2:!this.state.image2
            })
            return;
        }else{
            this.setState({
                loading:true
            })
            const data = {
                type:this.state.type,
                user_id:this.props.location.state && this.props.location.state.user_id?this.props.location.state.user_id:2,
                file:this.state.image1,
                file1:this.state.image2
            }
            const formdata = new FormData();
            formdata.append("type",this.state.type);
            formdata.append("user_id",this.props.location.state && this.props.location.state.user_id?this.props.location.state.user_id:2);
            formdata.append("file",this.state.image1);
            formdata.append("file1",this.state.image2);
            Axios.post("https://demo-mcafee.herokuapp.com/verification",formdata,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res=>{
                console.log(formdata)
                this.props.history.push("/payment",{user_id:data.user_id,product:this.props.location.state && this.props.location.state.product?this.props.location.state.product:2})
            }).catch(err=>{
                console.log(formdata, err);
            })
        }
    }
    render(){
        return(
            <div>
                <Header />
                <CustomProgressBar progress={67} />
                <div className="demopage" >
                    <div className="form">
                        <form autoComplete="off" noValidate style={{
                            display:"flex",flexDirection:"column",flexGrow:"5"
                        }} onSubmit={this.handleSubmit}>
                            <Typography style={{marginLeft:"30px"}}>Generate Payment</Typography>
                            <Form.Group controlId="exampleForm.SelectCustomSizeLg" className="form-item">
                                <Form.Label style={{
                                    color:this.state.emptyType?"red":""
                                }}>Select Identity{this.state.emptyType?" *":""}</Form.Label>
                                <Form.Control as="select" size="lg" name="type" custom onChange={this.handleChange}>
                                <option selected disabled value="">None</option>
                                <option value="AADHAR">Aadhar</option>
                                <option value="PAN">Pan Card</option>
                                <option value="VOTER_CARD">Voter Id</option>
                                <option value="DRIVING_LICENCE">Driving Licence</option>
                                <option value="CAMERA">Other</option>
                                </Form.Control>
                            </Form.Group>
                        {
                            !this.state.emptyType?(
                                <div style={{
                                    paddingLeft:"30px",
                                    marginTop:"30px"
                                }}>
                                    <Typography variant="body2">Document Verification</Typography>
                                    <Grid container style={{
                                        width:"100%",
                                        marginTop:"20px"
                                    }} justify="space-around" spacing={3}>
                                        <Grid item>
                                            <Grid container direction="column" spacing={3}>
                                                <Grid item>
                                            {
                                                this.state.type === "CAMERA"?(
                                                    <Form.Group>
                                                        <CustomCamera onClick={this.handleTakePhoto} name="image1"/>
                                                        <Form.Label style={{marginLeft:"20px",color:this.state.emptyImage1?"red":""}}>Capture Front Image</Form.Label>
                                                    </Form.Group>
                                                ) :(
                                                    <FormFile custom>
                                                        <FormFile.Input name="image1" onChange={this.handleImageChange} />
                                                        <FormFile.Label style={{
                                                            color:this.state.emptyImage1?"red":""
                                                        }}>{!this.state.image1?("Select Front Image"):this.state.image1.name}</FormFile.Label>
                                                    </FormFile>
                                                )
                                            }
                                                    
                                                </Grid>
                                                <Grid item>
                                                    <Image src={this.state.image1URL} fluid width={300} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                        <Grid container direction="column" spacing={3}>
                                            <Grid item>
                                        {
                                            this.state.type === "CAMERA"?(
                                                <Form.Group>
                                                    <CustomCamera onClick={this.handleTakePhoto} name="image2"/>
                                                    <Form.Label style={{marginLeft:"20px",color:this.state.emptyImage2?"red":""}}>Capture Back Image</Form.Label>
                                                </Form.Group>
                                            ):
                                            (<FormFile custom>
                                                <FormFile.Input name="image2" onChange={this.handleImageChange}/>
                                                <FormFile.Label style={{
                                                        color:this.state.emptyImage2?"red":""
                                                    }}>{!this.state.image2?("Select Back Image"):this.state.image2.name}</FormFile.Label>
                                            </FormFile>
                                            )
                                        }
                                            </Grid>
                                            <Grid item>
                                                <Image src={this.state.image2URL} fluid width={300}/>
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            ):(null)
                        }
                            <div style={{
                                display:"flex",
                                flexDirection:"column-reverse",
                                justifyContent:"flex-end",
                                alignItems:"flex-end",
                                marginRight:"20px",
                                marginTop:"30px"
                            }}>
                                <Button type="submit" disabled={this.state.loading} variant="outline-primary">{this.state.loading?("Loading..."):("Verify")}<NavigateNextIcon /></Button>
                            </div>
                        </form>
                    </div>
                    <div className="decorative">
                        <h1>Buy From Us.</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerificationPage;