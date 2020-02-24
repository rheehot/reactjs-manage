import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    Typography:{
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '15px',
        marginBottom: '15px',
    },
    Card:{
        width: '250px',
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '10px',
        marginBottom: '10px',
    }
})
class Home extends React.Component{
    render(){
        const { classes } = this.props
        return(
            <div>
                <Typography className={classes.Typography} variant="h4">
                    대시보드
                </Typography>
                <Card className={classes.Card}>
                    <Typography>내용1</Typography>
                    <Typography>내용2</Typography>
                    <Typography>내용3</Typography>
                    <Typography>내용4</Typography>
                </Card>
            </div>
        );
    }
}

export default withStyles (styles) (Home)