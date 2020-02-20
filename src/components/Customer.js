import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/tableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
//import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const databaseURL="https://customer-5b5d0.firebaseio.com"

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table:{
      minWidth: 1080
    },
    progress:{
      margin: theme.spacing(2)
    },
    fab:{
      position: 'fixed',
      bottom: '20px',
      right: '20px'
    }
  });

class customer extends React.Component{
  
  constructor(){
    super();
    this.state={
      customers: {},
      dialog: false,
      name: '',
      birth: '',
      adress: '',
      phone: '',
      completed: 0
    }
  }

    //데이터 불러오기
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

    //데이터 추가
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

    clear = () => { 
      this.setState({
        name: '',
        birth: '',
        adress: '',
        phone: '',
      })
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

    //데이터 삭제
    _delete(id){
      return fetch(`${databaseURL}/customers/${id}.json`,{
        method:'DELETE'
      }).then(res=>{
        if(res.status !== 200){
          throw new Error(res.statusText);
        }
        return res.json();
      }).then(() => {
        let nextState = this.state.customers;
        delete nextState[id];
        this.setState({customers: nextState});
        this.componentDidMount();
      });
    }
    
    handleDelete = (id) => {
      this._delete(id);
    }

    //로딩 및 추가,삭제 시 데이터 새로고침

    progress = () => {
      const {completed} = this.state;
      this.setState({completed: completed >= 100? 0 : completed + 1})
    }

    componentDidMount(){
      this.timer = setInterval*(this.progress, 20);
      this._get()
    }

    UNSAFE_componentWillMount(){
      clearInterval(this.timer);
    }

    render(){
      const {classes} = this.props;
      return(
        <div>
          <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>생일</TableCell>
                    <TableCell>주소</TableCell>
                    <TableCell>전화번호</TableCell>
                    <TableCell>설정</TableCell>
                  </TableRow>
                </TableHead> 
                <TableBody>
                {this.state.customers ? Object.keys(this.state.customers).map(id => {
                  const customer = this.state.customers[id];
                  return(
                      <TableRow key={id}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.birth}</TableCell>
                            <TableCell>{customer.adress}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell><Button varient="outlined" color="primary" onClick={() => this.handleDelete(id)}>삭제</Button></TableCell>
                      </TableRow>
                  )
                }) : 
                <TableRow>
                      <TableCell colSpan="6" align="center">
                        <CircularProgress className={classes.progress} varient="determinate" value={this.state.completed}/>
                      </TableCell>
                    </TableRow>}
                </TableBody>
              </Table>
          </Paper>
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
              <Button varient="contained" color="primary" onClick={() => {this.handleSumbit(); this.clear()}}>추가</Button>
              <Button varient="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
  }
  
export default withStyles (styles) (customer)