import React from "react";
import { useNavigate } from 'react-router-dom';
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/actions/auth";
import { eventsCleaning } from "../../state/actions/events";

export const NavBar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { name, lastname } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const userLogout = () => {
      dispatch( eventsCleaning() );
      dispatch( logout() );
      navigate('/')
    }

    return (
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
                <div className={classes.sectionDesktop}>
                  <IconButton
                    edge="end"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                    <p style={{fontSize: 17, margin: 4}}>{ name } { lastname }</p>
                  </IconButton>
                </div> 
                <div className={classes.grow} /> 
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                >
                    <button 
                        className="btn btn-outline-danger"
                        onClick={ userLogout }
                    >
                        <i className="fas fa-sign-out-alt" ></i>
                        <span> Exit</span>
                    </button>
                </IconButton>
                   
            </Toolbar>
          </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    }
  }));
