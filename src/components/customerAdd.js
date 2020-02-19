import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const databaseURL="https://customer-5b5d0.firebaseio.com"

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: "auto"
      },
    fab:{
      position: 'fixed',
      bottom: '20px',
      right: '20px'
    }
  });

class customerAdd extends React.Component{
    constructor(){
        super();
        this.state={
          customers: {},
          dialog: false,
          name: '',
          birth: '',
          adress: '',
          phone: '',
        }
      }

      _get = async() => {
        fetch(`${databaseURL}/customers.json`).then(res=>{
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(customers => this.setState({customers: customers}))
        .catch(err => console.log(err));
        const responce = await fetch(`${databaseURL}/customers.json`);
        const body = await responce.json();
        return body;
      }

      _post(customer){
        return fetch(`${databaseURL}/customers.json`,{
          method:'POST',
          body: JSON.stringify(customer)
        }).then(res => {
          if(res.status !== 200){
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(() => {
          let nextState = this.state.customers;
          this.setState({customers: nextState});
          this.componentDidMount();
        });
      }

      componentDidMount(){
        this._get()
      }

      handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
      });

      handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
      }

      handleSumbit = () => {
        const customer = {
          name: this.state.name,
          birth: this.state.birth,
          adress: this.state.adress,
          phone: this.state.phone
        }
        this.handleDialogToggle();
        if (!customer.name && !customer.birth && !customer.adress && !customer.phone){
          return;
        }
        this._post(customer);
      }

      render(){
          const {classes} = this.props;
          return(
        <div>
         <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
            <AddIcon/>
         </Fab>
          <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
            <DialogTitle>고객 추가</DialogTitle>
            <DialogContent>
              <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
              <TextField label="생일" type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange}/><br/>
              <TextField label="주소" type="text" name="adress" value={this.state.adress} onChange={this.handleValueChange}/><br/>
              <TextField label="번호" type="text" name="phone" value={this.state.phone} onChange={this.handleValueChange}/><br/>
            </DialogContent>
            <DialogActions>
              <Button varient="contained" color="primary" onClick={() => this.handleSumbit()}>추가</Button>
              <Button varient="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
            </DialogActions>
          </Dialog>
          </div>
          )
      }
}

export default withStyles (styles) (customerAdd)