import React from "react";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/tableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";

import SnackBar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const databaseURL = "https://customer-5b5d0.firebaseio.com";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    minWidth: 1080
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 10,
    marginBottom: 10
  },
  table: {
    minWidth: 1080
  },
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  },
  tableHead: {
    fontSize: "1.0rem"
  },
  searchBar: {
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
    marginBottom: "15px"
  },
  button: {
    marginLeft: 5,
    marginRight: 5
  },
  formControl: {
    minWidth: 180
  }
});

class customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: {},
      delTargetId: "",
      detailTargetId: "",
      dialogadd: false,
      dialogdel: false,
      dialogedit: false,
      dialogdetail: false,
      addalert: false,
      delalert: false,
      id: "",
      name: "",
      course: "",
      coursebal: "",
      firstpay: "",
      amount: "",
      first: "",
      second: "",
      birth: "",
      phone: "",
      pay: "",
      left: "",
      searchKeyword: "",
      selValue: ""
    };
    this.searchValueChange = this.searchValueChange.bind(this);
  }

  //데이터 불러오기
  _get = async () => {
    fetch(`${databaseURL}/customers.json`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(customers => this.setState({ customers: customers }))
      .catch(err => console.log(err));
    const responce = await fetch(`${databaseURL}/customers.json`);
    const body = await responce.json();
    return body;
  };

  //데이터 디테일
  _getdetail = async id => {
    fetch(`${databaseURL}/customers/${id}.json`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(customers => this.setState({ customers: customers }))
      .catch(err => console.log(err));
    const responce = await fetch(`${databaseURL}/customers/${id}.json`);
    const body = await responce.json;
    return body;
  };

  detailView = detailid => {
    this.detailToggle();
    this._getdetail(this.state.detailTargetId);
  };

  detailToggle = id => {
    this.setState({
      detailTargetId: id || this.state.detailTargetId,
      dialogdetail: !this.state.dialogdetail
    });
  };

  //데이터 수정
  _edit(id) {
    return fetch(`${databaseURL}/customers${id}.json`, {
      method: "PUSH",
      body: JSON.stringify(id)
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.state.customers;
        this.setState({ customers: nextState });
        this.componentDidMount();
      });
  }

  //데이터 추가
  _post(customer) {
    return fetch(`${databaseURL}/customers.json`, {
      method: "POST",
      body: JSON.stringify(customer)
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.state.customers;
        this.setState({ customers: nextState });
        this.componentDidMount();
        this.addAlertOpen();
      });
  }

  clear = () => {
    this.setState({
      id: "",
      name: "",
      course: "",
      coursebal: "",
      firstpay: "",
      amount: "",
      first: "",
      second: "",
      birth: "",
      phone: "",
      pay: "",
      left: ""
    });
  };

  handleDialogToggle = () => {
    this.setState({
      dialogadd: !this.state.dialogadd
    });
    this.clear();
  };

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleSumbit = () => {
    const customer = {
      name: this.state.name,
      course: this.state.course,
      corsebal: this.state.coursebal,
      firstpay: this.state.firstpay,
      first: this.state.first,
      second: this.state.second,
      birth: this.state.birth,
      phone: this.state.phone,
      pay: this.state.pay,
      left: this.state.left
    };
    this.handleDialogToggle();
    if (
      !customer.name &&
      !customer.course &&
      !customer.first &&
      !customer.second &&
      !customer.birth &&
      !customer.phone
    ) {
      return;
    }
    this._post(customer);
  };

  addAlertOpen = () =>
    this.setState({
      addalert: true
    });

  addAlertClose = () =>
    this.setState({
      addalert: false
    });

  //데이터 삭제
  _delete(id) {
    return fetch(`${databaseURL}/customers/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.state.customers;
        delete nextState[id];
        this.setState({ customers: nextState });
        this.componentDidMount();
        this.delAlertOpen();
      });
  }

  handleDelete = () => {
    this.delToggle();
    this._delete(this.state.delTargetId);
  };

  delToggle = id => {
    this.setState({
      delTargetId: id || this.state.delTargetId,
      dialogdel: !this.state.dialogdel
    });
  };

  delAlertOpen = () =>
    this.setState({
      delalert: true
    });

  delAlertClose = () =>
    this.setState({
      delalert: false
    });

  //데이터 새로고침
  componentDidMount() {
    this._get();
  }

  //검색
  searchValueChange(e) {
    this.setState({ searchKeyword: e.target.value });
    //console.log(this.state.searchKeyword) 입력 테스트용 콘솔로그
  }

  //랜더(표시)
  render() {
    const { classes } = this.props;
    const cellList = ["이름", "전화번호", "코스", "1차", "2차", "예정일", "설정"];
    const detailid = this.state.detailTargetId;
    const delid = this.state.delTargetId;
    const customers = [];
    for (let key in this.state.customers) {
      customers.push(this.state.customers[key]);
    }
    const renderFilteredRows = () => {
      return customers.map((customer, id) => {
        if (customer.name.includes(this.state.searchKeyword)) {
          return (
            <TableRow key={id}>
              <TableCell align="center">{customer.name}</TableCell>
              <TableCell align="center">{customer.phone}</TableCell>
              <TableCell align="center">{customer.course}</TableCell>
              <TableCell align="center">{customer.first}</TableCell>
              <TableCell align="center">{customer.second}</TableCell>
              <TableCell align="center">{customer.birth}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ detailTargetId: Object.keys(this.state.name) }, () => {
                      this.detailToggle(Object.keys(this.state.name));
                      console.log(this.detailToggle);
                    });
                  }}
                  className={classes.button}
                >
                  자세히
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    this.setState({ delTargetId: Object.keys(this.state.customers)[id] }, () => {
                      this.delToggle(Object.keys(this.state.customers)[id]);
                    });
                  }}
                  className={classes.button}
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          );
        } else {
          return null;
        }
      });
    };

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <InputBase
            name="searchKeyword"
            placeholder="검색"
            className={classes.searchBar}
            value={this.state.searchKeyword}
            onChange={this.searchValueChange}
          />
        </Paper>
        <div>
          <Paper className={classes.paper} elevation={3}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {cellList.map(c => {
                    return (
                      <TableCell align="center" className={classes.tableHead} key={c}>
                        {c}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.customers && renderFilteredRows(customer.id)}
                {!this.state.customers && (
                  <TableRow>
                    <TableCell colSpan="7" align="center">
                      <Typography>
                        고객정보가 존재하지 않거나 서버로부터 응답이 없습니다.
                        <br />
                        고객정보를 추가하시려면 아래 + 버튼을 클릭하여 고객정보를 추가하십시오.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
          <AddIcon />
        </Fab>
        <Dialog open={this.state.dialogadd} onClose={this.handleDialogToggle}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <DialogContentText>고객정보를 추가합니다.</DialogContentText>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  label="이름"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleValueChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="전화번호"
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleValueChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="예정일"
                  type="date"
                  name="birth"
                  value={this.state.birth}
                  InputLabelProps={{ shrink: true }}
                  onChange={this.handleValueChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl className={classes.formControl}>
                  <InputLabel required>코스</InputLabel>
                  <Select
                    id="course-select-label"
                    value={this.state.course}
                    onChange={this.handleValueChange}
                  >
                    <MenuItem value={3000000}>미정</MenuItem>
                    <MenuItem value={3000000}>로얄</MenuItem>
                    <MenuItem value={3000000}>럭셔리</MenuItem>
                    <MenuItem value={3000000}>스페셜</MenuItem>
                    <MenuItem value={3000000}>베이직</MenuItem>
                    <MenuItem value={3000000}>스텐다드</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="예치금"
                  type="text"
                  name="firstpay"
                  value={this.state.firstpay}
                  onChange={this.handleValueChange}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="잔액"
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleValueChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="1차"
                  type="date"
                  name="first"
                  value={this.state.first}
                  onChange={this.handleValueChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="2차"
                  type="date"
                  name="second"
                  value={this.state.second}
                  InputLabelProps={{ shrink: true }}
                  onChange={this.handleValueChange}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleSumbit();
                this.clear();
              }}
            >
              추가
            </Button>
            <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>
              닫기
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.dialogdel}
          onClose={() => {
            this.delToggle(delid);
          }}
        >
          <DialogTitle>경고</DialogTitle>
          <DialogContent>
            <DialogContentText>고객정보를 삭제하시겠습니까?</DialogContentText>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.handleDelete(delid);
                }}
              >
                예
              </Button>
              <Button variant="outlined" color="primary" onClick={this.delToggle}>
                아니오
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.dialogdetail} onClose={() => this.detailToggle(detailid)}>
          <DialogTitle>{customer.name}님의 정보</DialogTitle>
          <DialogContent>
            <DialogContentText>이름: {}</DialogContentText>
            <DialogContentText>1차: {}</DialogContentText>
            <DialogContentText>2차: {}</DialogContentText>
            <DialogContentText>예정일: {}</DialogContentText>
            <DialogContentText>연락처: {}</DialogContentText>
            <DialogActions>
              <Button variant="contained" color="primary">
                수정
              </Button>
              <Button variant="outlined" color="primary" onClick={this.detailToggle}>
                닫기
              </Button>
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
    );
  }
}

//코스, 예치금(30만 고정), 잔액 결제여부
/*
로얄 300 -> 255
럭셔리 270 -> 229.5
스페셜 200 -> 170
베이직 160 -> 136
스텐다드 120 -> 102
 
예치금 30

예치금 지불 여부 = (참: 코스-예치금=잔액, 거짓:코스=잔액)

잔액 결제여부 = 카드,현금,이체,상품권,모바일상품권

현금,상품권 : 현금영수증
카드 : 카드번호,승인번호

                    <TableRow key={id}>
                      <TableCell align="center">{customer.name}</TableCell>
                      <TableCell align="center">{customer.phone}</TableCell>
                      <TableCell align="center">{customer.course}</TableCell>
                      <TableCell align="center">{customer.first}</TableCell>
                      <TableCell align="center">{customer.second}</TableCell>
                      <TableCell align="center">{customer.birth}</TableCell>
                      <TableCell align="center"><Button variant="contained" color="primary" onClick={() => {this.detailToggle(id)}} className={classes.button}>자세히</Button>
                      <Button variant="contained" color="secondary" onClick={()=>{this.delToggle(id)}} className={classes.button}>삭제</Button></TableCell>
                    </TableRow>
*/
//label="코스" type="text" name="course" <TextField label="코스" type="text" name="course" value={this.state.course} onChange={this.handleValueChange}/>

export default withStyles(styles)(customer);
