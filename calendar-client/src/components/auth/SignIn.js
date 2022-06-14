import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom'
import validator from 'validator'; 
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { fetchSingIn } from '../../services/auth';

export const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate(); 

  const [title, setTitle] = useState('Sign In');
  const [ values, handleInputChange ] = useForm({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password:''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( isFormValid() ) {
      setTitle('');

      fetchSingIn( values )
          .then( res => {
            setTitle('Sign In');
            if ( res.ok ) {
              navigate('/');
            } 

            if ( res.msg ) {
              return Swal.fire('Error', res.msg, 'error');
            } else {
              return Swal.fire('Error', res.errors[0].msg, 'error');
            }
          })
          .catch( console.log );
    } 
  }

  const isFormValid = () => {

    if ( !validator.isEmail( values.email ) ) {
        return false;
    } else if ( !validator.isLength( values.password, { min: 5, max: 15 } ) ){
        Swal.fire('Error', 'El password es invalido', 'error');
        return false;
    } 

    return true;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  onSubmit={ handleSubmit } noValidate>
            <TextField 
                variant="outlined"
                margin="normal" 
                placeholder="Name"
                onChange={ handleInputChange } 
                type="text" 
                label="Name" 
                fullWidth 
                name="name"
            />
            
            <TextField 
                variant="outlined"
                margin="normal" 
                placeholder="Lastname"
                onChange={ handleInputChange } 
                type="text" 
                label="Lastname" 
                fullWidth 
                name="lastname"
            />
            
            <TextField 
                variant="outlined"
                margin="normal" 
                placeholder="Username"
                onChange={ handleInputChange } 
                type="text" 
                label="Username" 
                fullWidth 
                name="username"
            />
            
            <TextField 
                variant="outlined"
                margin="normal" 
                placeholder="example@gmail.com"
                onChange={ handleInputChange } 
                type="email" 
                label="Email" 
                fullWidth 
                name="email"
            />
            
            <TextField 
                variant="outlined"
                margin="normal" 
                placeholder="***********"
                onChange={ handleInputChange } 
                type="password" 
                label="Password" 
                fullWidth 
                name="password" 
            />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = { handleSubmit }
          >
            { title }
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Don't have an account? Log In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));