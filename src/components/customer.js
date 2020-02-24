import 'date-fns';
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/tableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
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
import DialogContentText from '@material-ui/core/DialogContentText';
import InputBase from '@material-ui/core/InputBase';
import SnackBar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
/*import DateFnsUtils from '@date-io/date-fns';
import { MulPickersUtilProvider } from '@material-ui/pickers';*/

const databaseURL="https://customer-5b5d0.firebaseio.com"

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      minWidth: 1080
    },
    paper:{
      marginLeft:18,
      marginRight:18,
      marginTop:10,
      marginBottom:10
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
    },
    tableHead: {
      fontSize: '1.0rem'
    },
    searchBar: {
      marginLeft: '15px',
      marginRight: '15px',
      marginTop: '15px',
      marginBottom: '15px'
    },
    button: {
      marginLeft: 5,
      marginRight: 5
    },
  });

class customer extends React.Component{
  constructor(){
    super();
    this.state={
      customers: {},
      delTargetId: '',
      detailTargetId: '',
      dialogadd: false,
      dialogdel: false,
      dialogedit: false,
      dialogdetail: false,
      addalert: false,
      delalert: false,
      name: '',
      first: '',
      second: '',
      birth: '',
      phone: '',
      pay: '',
      left: '',
      completed: 0,
      searchKeyword: ''
    };
    this.searchValueChange = this.searchValueChange.bind(this);
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

    //데이터 디테일
    _getdetail = async(id) => {
      fetch(`${databaseURL}/customers/${id}.json`).then(res=>{
        if(res.status !== 200){
          throw new Error(res.statusText);
        }
        return res.json();
      }).then(customers => this.setState({customers:customers}))
      .catch(err => console.log(err));
      const responce = await fetch(`${databaseURL}/customers/${id}.json`)
      const body = await responce.json
      return body;
    }

    detailView = (detailid) => {
      this.detailToggle();
      this._getdetail(this.state.detailTargetId);
    }
    
    detailToggle = id => {
      this.setState({
        detailTargetId: id || this.state.detailTargetId,
        dialogdetail: !this.state.dialogdetail
      })
    }

    //데이터 수정
    _edit(id){
      return fetch(`${databaseURL}/customers${id}.json`,{
        method:'PUSH',
        body: JSON.stringify(id)
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
        this.addAlertOpen(); 
      });
    }

    clear = () => { 
      this.setState({
        name: '',
        first: '',
        second: '',
        birth: '',
        phone: '',
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
      const customer = {
        name: this.state.name,
        first: this.state.first,
        second: this.state.second,
        birth: this.state.birth,
        phone: this.state.phone
      }
      this.handleDialogToggle();
      if (!customer.name && !customer.first && !customer.second && !customer.birth && !customer.phone){
        return;
      }
      
      this._post(customer);
    }

    addAlertOpen = () => this.setState({
      addalert: true
    })

    addAlertClose = () => this.setState({
      addalert: false
    })
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
        this.delAlertOpen();
      });
    }
    
    handleDelete = () => {
      this.delToggle();
      this._delete(this.state.delTargetId); 
    }

    delToggle = id => {
      this.setState({
        delTargetId: id || this.state.delTargetId,
        dialogdel: !this.state.dialogdel
      })
    }

    delAlertOpen = () => this.setState({
      delalert: true
    })

    delAlertClose = () => this.setState({
      delalert: false
    })

    //데이터 새로고침

    componentDidMount(){
      this._get()
    }

    //검색
    searchValueChange(e) {
      this.setState({
        keyword: e.target.value
      });
    }

    //랜더(표시)
    render(){
      const {classes} = this.props;
      const cellList = ["이름","1차","2차","예정일","전화번호","설정"]
      const delid = this.state.delTargetId;
      const detailid = this.state.detailTargetId;
      return(
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <InputBase name="searchKeyword" placeholder="검색" className={classes.searchBar} value={this.state.searchKeyword} onChange={this.handleValueChange}/>
          </Paper>
          <div >
            <Paper className={classes.paper} elevation={3}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {cellList.map(c => {return <TableCell align="center" className={classes.tableHead} key={c}>{c}</TableCell>})}
                  </TableRow>
                </TableHead> 
                <TableBody>
                  {this.state.customers ? Object.keys(this.state.customers).map(id => {
                    const customer = this.state.customers[id];
                    return(
                      <TableRow key={id}>
                        <TableCell align="center">{customer.name}</TableCell>
                        <TableCell align="center">{customer.first}</TableCell>
                        <TableCell align="center">{customer.second}</TableCell>
                        <TableCell align="center">{customer.birth}</TableCell>
                        <TableCell align="center">{customer.phone}</TableCell>
                        <TableCell align="center"><Button variant="contained" color="primary" onClick={() => {this.detailToggle(id)}} className={classes.button}>자세히</Button>
                        <Button variant="contained" color="secondary" onClick={()=>{this.delToggle(id)}} className={classes.button}>삭제</Button></TableCell>
                      </TableRow>
                    )
                  }) : 
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <Typography align="center">고객정보가 없거나 서버로부터 응답이 없습니다.<br/>고객정보를 추가하시려면 아래 +버튼을 클릭하여 고객정보를 추가하십시오.</Typography>
                    </TableCell>
                  </TableRow>}
                  </TableBody>
                </Table>
            </Paper>
            </div>
          <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
            <AddIcon/>
          </Fab>
          <Dialog open={this.state.dialogadd} onClose={this.handleDialogToggle}>
            <DialogTitle>고객 추가</DialogTitle>
            <DialogContent>
              <DialogContentText>고객정보를 추가합니다.</DialogContentText>
              <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
              <TextField label="1차" type="text" name="first" value={this.state.first} onChange={this.handleValueChange}/><br/>
              <TextField label="2차" type="text" name="second" value={this.state.second} onChange={this.handleValueChange}/><br/>
              <TextField label="예정일" type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange}/><br/>
              <TextField label="번호" type="text" name="phone" value={this.state.phone} onChange={this.handleValueChange}/><br/>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={() => {this.handleSumbit(); this.clear()}}>추가</Button>
              <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={this.state.dialogdel} onClose={() => {this.delToggle(delid)}} key={delid}>
            <DialogTitle>경고</DialogTitle>
              <DialogContent>
                 <DialogContentText>고객정보를 삭제하시겠습니까?</DialogContentText>
                <DialogActions>
                 <Button variant="contained" color="secondary" onClick={() => {this.handleDelete(delid)}}>예</Button>
                 <Button variant="outlined" color="primary" onClick={this.delToggle}>아니오</Button>
                </DialogActions>
              </DialogContent>
          </Dialog>
          <Dialog open={this.state.dialogdetail} onClose={() => this.detailToggle(detailid)}>
              <DialogTitle>{}님의 정보</DialogTitle>
                <DialogContent>
                    <DialogContentText>이름: {}</DialogContentText>
                    <DialogContentText>1차: {}</DialogContentText>
                    <DialogContentText>2차: {}</DialogContentText>
                    <DialogContentText>예정일: {}</DialogContentText>
                    <DialogContentText>연락처: {}</DialogContentText>
                  <DialogActions>
                    <Button variant="contained" color="primary">수정</Button>
                    <Button variant="outlined" color="primary" onClick={this.detailToggle}>닫기</Button>
                  </DialogActions>
              </DialogContent>
            </Dialog>
            <SnackBar open={this.state.addalert} autoHideDuration={3000} onClose={this.addAlertClose}>
                  <Alert onClose={this.addAlertClose} severity="success">
                    고객정보가 추가되었습니다.
                  </Alert>
            </SnackBar>
            <SnackBar open={this.state.delalert} autoHideDuration={3000} onClose={this.delAlertClose}>
                  <Alert onClose={this.delAlertClose} severity="success">
                    고객정보가 삭제되었습니다.
                  </Alert>
            </SnackBar>
        </div>
      
      )
    }
  }

  //코스, 예치금(30만 고정), 잔액, 결제여부
  
export default withStyles (styles) (customer)