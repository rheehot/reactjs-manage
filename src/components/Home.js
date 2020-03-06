import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing(3),
    minWidth: 1080
  },
  Typography: {
    marginRight: "15px",
    marginTop: "15px",
    marginBottom: "15px"
  },
  Card: {
    width: "250px",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "20px",
    marginBottom: "20px"
  }
});
class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.Typography} variant="h4">
          대시보드
        </Typography>
        <Grid container spacing={0} justify="center">
          <Card className={classes.Card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                항목1
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                고객관리
              </Typography>
              <Typography variant="body2" component="p">
                제품구입: 10
              </Typography>
              <Typography variant="body2" component="p">
                제품판매: 10
              </Typography>
              <Typography variant="body2" component="p">
                제품재고: 10
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">자세히</Button>
            </CardActions>
          </Card>
          <Card className={classes.Card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                항목2
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                고객관리
              </Typography>
              <Typography variant="body2" component="p">
                제품구입: 10
              </Typography>
              <Typography variant="body2" component="p">
                제품판매: 10
              </Typography>
              <Typography variant="body2" component="p">
                제품재고: 10
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">자세히</Button>
            </CardActions>
          </Card>
          <Card className={classes.Card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                항목3
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                고객관리
              </Typography>
              <Typography variant="body2" component="p">
                제품구입: 10
              </Typography>
              <Typography variant="body2" component="p">
                제품판매: 10
              </Typography>
              <Typography variant="body2" component="p">
                제품재고: 10
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">자세히</Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
