import React,{Component} from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Redirect, useHistory } from "react-router-dom";
import { Router, Route, hashHistory} from "react-router";
import { withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";



const paperStyle = { padding: 20, height: '60vh', width: 300, margin: "0 auto" }
const avatarStyle = { backgroundColor: '  #5b9aa0' }
const btnStyle = { margin: '8px 0' }
const GridStyle={margin:'0px 0 0 0 '}



const msg={backgroundColor:'red'}
const initialValues = {
    username: '',
    password: '',
    remember: false
}
const validationSchema = Yup.object().shape({
    username: Yup.string().email('Please Enter a Valid Email').required('Compulsory Field'),
    password: Yup.string().required('Compulsory Field')
})
const onSubmit = (values, props) => {
    console.log(values);
    props.resetForm();
    console.log(props);
}



class Login extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={

        email:'',
        password:''
       
        
        }
       
        this.changeEmail=this.changeEmail.bind(this);
        this.changePassword=this.changePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    changeEmail(event)
    {
        this.setState({
        email: event.target.value
        })
    }
   
    changePassword(event)
    {
        this.setState({
        password: event.target.value
        })
    }

    onSubmit(event)
{
    event.preventDefault()
    const loggedin =
    {
        
        email:this.state.email,
        password:this.state.password
      

    }
    
   
    //Posting Data to the Server.
    axios.post('http://localhost:5900/users/authenticate',loggedin)
    .then(res=>{
        localStorage.setItem("login",res.data.token);
        localStorage.setItem("role",res.data.role);
       

    //Decoding the token and fetching the roles of the loggedIn user.
    //  var token1=(localStorage.getItem("login",res.data.token))
    //  var decoded = jwt_decode(token1);
    //  console.log(decoded.role);


    // Rendering condition for User and Delivery Executive.
        if("delivery" == res.data.role  )
        {
            this.props.history.push('/delivery');
        }
        else
        {
            this.props.history.push('/user');
        }

    
  });

    
    this.setState({
        email:'',
        password:''
      
        
    })

  
}
   
    
    
    render()
    {

 

    return (
        <div>
        <Grid style={GridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2> Sign In</h2>
                </Grid>
              
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                     
                     <form onSubmit={this.onSubmit}>
                            <Field as={TextField} label='Username'  placeholder="Enter username" fullWidth required
                                //  helperText={<ErrorMessage name='email' style={msg} />} 
                                onChange={this.changeEmail}
                                value={this.state.email}/>
                            
                            <Field as={TextField} label='Password'  placeholder="Enter password" type="password" fullWidth required
                                //  helperText={<ErrorMessage style={msg}/>}
                                onChange={this.changePassword}
                                value={this.state.password}/>
                            
                            <Field as={FormControlLabel}
                                name='remember'
                                control={
                                    <Checkbox

                                        color="primary"
                                    />
                                }
                                label="Remember Me"
                            />
                            <Button type='submit' value='Submit'variant="contained" color='primary' style={btnStyle} fullWidth required> Sign In</Button>
                        </form>

                    )}
                </Formik>
        
            </Paper>
        </Grid>
        </div>
      
    )}
             }
             export default withRouter(Login);   
