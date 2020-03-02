import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PermContactCalendarSharpIcon from '@material-ui/icons/PermContactCalendarSharp';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 180;

const styles ={
    root:{
        flexGrow: 1,
    },
    menuButton: {
        marginRight:'auto',
    },
    drawer:{
        width: drawerWidth,
        flexShrihk:0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    typo:{
        marginLeft: 15,
        alignItems: 'center',
        display: 'flex',
        '&:hover': {
            opacity: 0.8,
            transition: '0.2s'
         },
    },
    icon:{
        verticalAlign: 'middle',
        marginRight: 15,
        '&:hover': {
            opacity: 0.8,
            transition: '0.2s'
         },
    },
    close:{
        marginLeft: 4
    },
};

class AppNav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toggle:false
        };
    }
    handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})
    render(){
        const { classes } = this.props;
        return(
           <div>
                <div className={classes.root}>
                <AppBar position="static">
                    <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                        <MenuIcon className={classes.icon}/><Typography variant="h5">React 산전케어 프로그램</Typography>
                    </IconButton>
                </AppBar>
                <Drawer open={this.state.toggle} className={classes.drawer} classes={{paper: classes.drawerPaper}}>
                    <IconButton className={classes.menuButton} color="inherit" onClick={this.handleDrawerToggle}>
                        <CloseIcon className={classes.close}/>
                    </IconButton>
                    <Divider/>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/" color="inherit" style={{textDecoration: 'none'}}>
                            <Typography className={classes.typo} variant="h5"><HomeIcon className={classes.icon}/>대시보드</Typography>
                        </Link>
                    </List>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/calendar/" color="inherit" style={{textDecoration: 'none'}}>
                           <Typography className={classes.typo} variant="h5" ><DateRangeIcon className={classes.icon}/>일정관리</Typography>
                        </Link>
                    </List>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/customer/" color="inherit" style={{textDecoration: 'none'}}>
                            <Typography className={classes.typo} variant="h5"><PermContactCalendarSharpIcon className={classes.icon}/>고객관리</Typography>
                        </Link>
                    </List>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/product/" color="inherit" style={{textDecoration: 'none'}}>
                            <Typography className={classes.typo} variant="h5"><LocalOfferIcon className={classes.icon}/>제품관리</Typography>
                        </Link>
                    </List>
                </Drawer>
                </div>
                {React.cloneElement(this.props.children)}
           </div>
        )
    }
}
export default withStyles (styles) (AppNav);