import React from 'react';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputBase from '@material-ui/core/InputBase';
import SnackBar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Calendar from '@toast-ui/react-calendar';

const databaseURL="https://customer-5b5d0.firebaseio.com"

const styles = theme => ({
    root: {
        flexGrow:1,
        width: '100%',
        marginTop: theme.spacing(3),
        minWidth: 1080
    },
    card:{
        width: '250px',
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18,
        marginBottom: 18,
    },
    fab:{
        position: 'fixed',
        bottom: '20px',
        right: '20px'
      },
    button: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5
      },
    paper:{
        marginLeft:18,
        marginRight:18,
        marginTop:10,
        marginBottom:10
      },
    searchbar: {
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '10px',
      marginBottom: '10px'
    }
});

class calendar extends React.Component{
    render(){
        const {classes} = this.props
        return(
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <InputBase className={classes.searchbar} placeholder="검색"></InputBase>
                <Button className={classes.button} variant="outlined" color="primary">일간</Button>
                <Button className={classes.button} variant="outlined" color="primary">주간</Button>
                <Button className={classes.button} variant="outlined" color="primary">월간</Button>
              </Paper>
            </div>
        )
    }
}

export default withStyles (styles) (calendar);