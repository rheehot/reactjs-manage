import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Calendar from '@toast-ui/react-calendar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
/*import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import SnackBar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';*/


//const databaseURL="https://customer-5b5d0.firebaseio.com"

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
    },
    calendarSize: {
      marginLeft:18,
      marginRight:18
    }
});

const optionProps = [
  'disableDblClick',
  'isReadOnly',
  'month',
  'scheduleView',
  'taskView',
  'theme',
  'timezones',
  'week'
]

class calendar extends React.Component{
    render(){
        const {classes} = this.props
        return(
            <div className={classes.root}>
              <Paper className={classes.paper} elevation={3}>
                <InputBase className={classes.searchbar} placeholder="검색"></InputBase>
                <ButtonGroup  variant="outlined" color="primary" aria-label="productTag">
                  <Button>일간</Button>
                  <Button>주간</Button>
                  <Button>월간</Button>
                </ButtonGroup>
              </Paper>
              <Paper className={classes.calendarSize} elevation={3}>
                <Calendar/>
              </Paper>
            </div>
        )
    }
}

export default withStyles (styles) (calendar);