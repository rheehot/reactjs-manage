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

const drawerWidth = 180;

const styles ={
    root:{
        flexGrow: 1,
    },
    menuButton: {
        marginRight:'auto'
    },
    drawer:{
        width: drawerWidth,
        flexShrihk:0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    typo:{
        marginLeft: 15
    },
    icon:{
        marginRight: 15,
    }
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
                        <MenuIcon/>
                    </IconButton>
                </AppBar>
                <Drawer open={this.state.toggle} className={classes.drawer} classes={{paper: classes.drawerPaper}}>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/">
                            <Typography className={classes.typo} variant="h5"><HomeIcon fontSize="inherit" className={classes.icon}/></Typography>
                        </Link>
                    <Divider/>
                    </List>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/calendar">
                           <Typography className={classes.typo} variant="h5"><DateRangeIcon fontSize="inherit" className={classes.icon}/>일정관리</Typography>
                        </Link>
                    </List>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/customer">
                            <Typography className={classes.typo} variant="h5"><PermContactCalendarSharpIcon fontSize="inherit" className={classes.icon}/>고객관리</Typography>
                        </Link>
                    </List>
                    <List onClick={this.handleDrawerToggle}>
                        <Link component = {RouterLink} to="/product">
                            <Typography className={classes.typo} variant="h5"><LocalOfferIcon fontSize="inherit" className={classes.icon}/>제품관리</Typography>
                        </Link>
                    </List>
                </Drawer>
                </div>
                <div id="content" style={{margin: 'auto', marginTop:'20px'}}>
                {React.cloneElement(this.props.children)}
                </div>
           </div>
        )
    }
}



/*
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component = {RouterLink} to="/">
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component = {RouterLink} to="/calendar">
                                예약관리
                            </Link>
                        </MenuItem>
                        
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component = {RouterLink} to="/customer">
                                고객관리
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component = {RouterLink} to="/product">
                                제품관리
                            </Link>
                        </MenuItem>
                        <Divider/>
*/
export default withStyles (styles) (AppNav);