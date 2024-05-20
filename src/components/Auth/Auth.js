import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {Avatar,Button,Paper,Typography,Container,Grid} from '@material-ui/core';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Input from './input';
import { authActions } from '../../store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import {signin,signup} from '../../actions/auth';


const initialState={
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:''
}

const  Auth=()=> {
    const [showPassword,setShowPassword]=useState(false);
    const [signIn,setIsSignIn]=useState(true);
    const [formData,setFormData]=useState(initialState);
    const [isTouched,setIsTouched]=useState({});

    const error=useSelector((state)=>state.Auth.error);
    

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const classes=useStyles();
   

    const confirmPasswordHasError=isTouched.confirmPasswordIsTouched && formData.password!==formData.confirmPassword;
    const passwordHasError=isTouched.passwordIsTouched && formData.password.length<6;

    const handleSubmit=(e)=>{
         e.preventDefault();
         if(confirmPasswordHasError || passwordHasError){
          return;
        }
         if(!signIn){
            dispatch(signup(formData,navigate))
         }else{

           dispatch(signin(formData,navigate))
         }
    }
    const handleBlur=(value)=>{
      setIsTouched(value);
    }
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    }
    const switchMode=()=>{
     setIsSignIn((prevState)=>!prevState)
    }

    const handleGoogleSuccess=async (res)=>{
      const token=res?.credential;
      try {
        dispatch(authActions.authenticate(token));

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }


  const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword);

  const signUpForm=(
      <>
        <Input name="firstName" label="First Name" handleChange={handleChange} half/>
        <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
      </>
    )

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon/>
        </Avatar>
        <Typography variant='h5'>{!signIn?'Sign Up':'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!signIn && signUpForm}
            <Input  name="email" label="Email Address" error={error?true:false} helperText={error} handleChange={handleChange}  type="email"/>
            <Input helperText={passwordHasError?"please enter a valid password at least 6 charcters":''} error={passwordHasError} name="password" label="Password"  handleChange={handleChange} type={showPassword ?"text":"password" } handleBlur={handleBlur} handleShowPassword={handleShowPassword}/>
            {!signIn && <Input error={confirmPasswordHasError} helperText={confirmPasswordHasError?"password mismatch!!":''} name="confirmPassword" label="Repeat Password" handleChange={handleChange} handleBlur={handleBlur} type="password"/>}
          </Grid>
          <Button  type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {!signIn ? 'Sign Up':'Sign In'}
          </Button>
          <div className={classes.googleButton}>
          <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={()=>console.log('error')}
          />
          </div>
          <Grid container justifyContent='center'>
             <Grid item>
                <Button onClick={switchMode}>
                    {!signIn?'Already have an account? Sign In':'Dont have an account? Sign Up'}
                </Button>
             </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default Auth;
