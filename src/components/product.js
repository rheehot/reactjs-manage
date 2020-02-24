import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import SnackBar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles'

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
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '10px',
        marginBottom: '10px',
    },
    fab:{
        position: 'fixed',
        bottom: '20px',
        right: '20px'
      },
    button: {
        marginLeft: 5,
        marginRight: 5
      }
});

class product extends React.Component{
    constructor (){
        super();
        this.state={
            products:{},
            dialogadd: false,
            addalert: false,
            delalert: false,
            name: '',
            tag: '',
            productbuy: '',
            productsell: '',
            productcurrent: '',
        }
    }

    //데이터 불러오기
    _get = async() => {
        fetch(`${databaseURL}/products.json`).then(res=>{
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(products => this.setState({products: products}))
        .catch(err => console.log(err));
        const responce = await fetch(`${databaseURL}/products.json`);
        const body = await responce.json();
        return body;
      }

      //데이터 추가
      _post(product){
        return fetch(`${databaseURL}/products.json`,{
          method:'POST',
          body: JSON.stringify(product)
        }).then(res => {
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(() => {
          let nextState = this.state.products;
          this.setState({products: nextState});
          this.componentDidMount();
          this.addAlertOpen();
        });
      }

      clear = () => { 
        this.setState({
          name: '',
          tag: '',
          productbuy: '',
          productsell: '',
          productcurrent: '',
        })
      }
  
      handleDialogToggle = () => this.setState({
        dialogadd: !this.state.dialogadd
      });
  
      handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }
  
      handleSumbit = () => {
        const product = {
          name: this.state.name,
          tag: this.state.tag,
          productbuy: this.state.productbuy,
          productsell: this.state.productsell,
          productcurrent: this.state.productcurrent
        }
        this.handleDialogToggle();
        if (!product.name && !product.tag && !product.productbuy && !product.productsell && !product.productcurrent){
          return;
        }
        this._post(product);
      }

      addAlertOpen = () => this.setState({
        addalert: true
      })

      addAlertClose = () => this.setState({
        addalert: false
      })

      //데이터 삭제
      _delete(id){
        return fetch(`${databaseURL}/products/${id}.json`,{
          method:'DELETE'
        }).then(res=>{
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(() => {
          let nextState = this.state.products;
          delete nextState[id];
          this.setState({products: nextState});
          this.componentDidMount();
        });
      }

      //데이터 갱신
      componentDidMount(){
        this._get()
      }

      //렌더(표시)
    render(){
        const {classes} = this.props
        return(
            <div className={classes.root}>
                <Grid container spacing={1} justify="center">
                {this.state.products ? Object.keys(this.state.products).map(id => {
                    const product = this.state.products[id];
                    return(
                        <div key={id}>
                          <Card className={classes.card}>
                            <CardContent>
                              <Typography variant="h5" component="h2">{product.name}</Typography>
                              <Typography className={classes.pos} color="textSecondary">{product.tag}</Typography>
                              <Typography variant="body2" component="p">제품구입: {product.productbuy}</Typography>
                              <Typography variant="body2" component="p">제품판매: {product.productsell}</Typography>
                              <Typography variant="body2" component="p">제품재고: {product.productcurrent}</Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small">자세히</Button>
                            </CardActions>
                          </Card>
                        </div>
                    )
                }) : <Typography align="center">제품이 없거나 서버로부터 응답이 없습니다.<br/>제품을 추가하시려면 아래 +버튼을 클릭하여 제품을 추가하십시오.</Typography>}
                </Grid>
                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <AddIcon/>
                </Fab>
                <Dialog open={this.state.dialogadd} onClose={this.handleDialogToggle}>
                    <DialogTitle>고객 추가</DialogTitle>
                        <DialogContent>
                            <DialogContentText>고객정보를 추가합니다.</DialogContentText>
                            <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                            <TextField label="분류" type="text" name="tag" value={this.state.tag} onChange={this.handleValueChange}/><br/>
                            <TextField label="구매" type="text" name="productbuy" value={this.state.productbuy} onChange={this.handleValueChange}/><br/>
                            <TextField label="판매" type="text" name="productsell" value={this.state.productsell} onChange={this.handleValueChange}/><br/>
                            <TextField label="재고" type="text" name="productcurrent" value={this.state.productcurrent} onChange={this.handleValueChange}/><br/>
                        </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={() => {this.handleSumbit(); this.clear();}}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
                <SnackBar open={this.state.addalert} autoHideDuration={3000} onClose={this.addAlertClose}>
                  <Alert onClose={this.addAlertClose} severity="success">
                    제품이 추가되었습니다.
                  </Alert>
                </SnackBar>
            </div>
        )
    }
}

export default withStyles (styles) (product);