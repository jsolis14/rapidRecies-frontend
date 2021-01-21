import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountButton } from './AccountButton';
import { RouteComponentProps } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const NavBar = (props: RouteComponentProps<{}>) => {
    const classes = useStyles();
    const [isAuth, setIsAuth] = useState<boolean>(false)

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    })

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        App Title
                    </Typography>
                    {isAuth ? <AccountButton {...props} /> : <Button color="inherit" onClick={() => props.history.push('login')}>Login</Button>}

                </Toolbar>
            </AppBar>
        </div>
    );
}
