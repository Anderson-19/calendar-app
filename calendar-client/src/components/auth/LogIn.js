import React, {useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { startLogin } from "../../state/actions/auth";


export const LogIn = () => {
    const classes = useStyles();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const [title, setTitle] = useState('Log In');
    const [ values, handleInputChange ] = useForm({
      email: '',
      password:''
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if ( isFormValid() ) {
        setTitle('');
        dispatch( startLogin( values, setTitle, navigate ) );
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
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <form className={classes.form} onSubmit={ handleSubmit } noValidate>
              <TextField 
                  variant="outlined" 
                  fullWidth 
                  margin="normal"
                  placeholder="example@gmail.com"
                  onChange={ handleInputChange }
                  type="email" 
                  label="Email"  
                  name="email"
              />

              <TextField 
                  variant="outlined" 
                  fullWidth 
                  margin="normal"
                  placeholder="****************"
                  onChange={ handleInputChange } 
                  type="password" 
                  label="Password"  
                  name="password" 
              />

              <Button 
                  type="submit"
                  variant="contained"
                  fullWidth  
                  color="primary"
                  className={classes.submit}
                  onClick={ handleSubmit }
                  
              >{ title }</Button>
              <Grid container>
                <Grid item>
                  <Link onClick={ () => navigate('/signIn') } variant="body2">
                    {"Don't have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>            
            </form>
          </div>
        </Grid>
    </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(12, 8),
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
