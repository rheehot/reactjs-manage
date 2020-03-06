import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import SnackBar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/tableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";

const databaseURL = "https://customer-5b5d0.firebaseio.com";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing(3),
    minWidth: 1080,
    overflowX: "auto"
  },
  card: {
    width: "250px",
    marginLeft: 18,
    marginRight: 4,
    marginTop: 10,
    marginBottom: 10
  },
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 10,
    marginBottom: 10
  },
  searchbar: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px"
  }
});

class product extends React.Component {
  constructor() {
    super();
    this.state = {
      products: {},
      dialogadd: false,
      dialogdel: false,
      addalert: false,
      delalert: false,
      dialogdetail: false,
      targetId: "",
      name: "",
      tag: "",
      productbuy: "",
      productsell: "",
      productcurrent: "",
      buydate: "",
      usedate: "",
      searchKeyword: ""
    };
  }

  //데이터 불러오기
  _get = async () => {
    fetch(`${databaseURL}/products.json`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(products => this.setState({ products: products }))
      .catch(err => console.log(err));
    const responce = await fetch(`${databaseURL}/products.json`);
    const body = await responce.json();
    return body;
  };

  //데이터 추가
  _post(product) {
    return fetch(`${databaseURL}/products.json`, {
      method: "POST",
      body: JSON.stringify(product)
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.state.products;
        this.setState({ products: nextState });
        this.componentDidMount();
        this.addAlertOpen();
      });
  }

  clear = () => {
    this.setState({
      name: "",
      tag: "",
      productbuy: "",
      productsell: ""
    });
  };

  handleDialogToggle = () =>
    this.setState(
      {
        dialogadd: !this.state.dialogadd
      },
      this.clear()
    );

  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleSumbit = () => {
    const product = {
      name: this.state.name,
      tag: this.state.tag,
      productbuy: this.state.productbuy,
      productsell: this.state.productsell,
      productcurrent: this.state.productbuy - this.state.productsell,
      usedate: this.state.usedate,
      selldate: this.state.selldate
    };
    this.handleDialogToggle();
    if (!product.name && !product.tag && !product.productbuy && !product.productsell) {
      return;
    }
    this._post(product);
  };

  addAlertOpen = () =>
    this.setState({
      addalert: true
    });

  addAlertClose = () =>
    this.setState({
      addalert: false
    });

  //디테일
  handleDetail = () =>
    this.setState({
      dialogdetail: !this.state.dialogdetail
      // detailTargetId: id || this.state.targetId,
    });

  //데이터 삭제
  _delete(id) {
    return fetch(`${databaseURL}/products/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        let nextState = this.state.products;
        delete nextState[id];
        this.setState({ products: nextState });
        this.componentDidMount();
        this.delAlertOpen();
      });
  }

  delToggle = id => {
    this.setState({
      delTargetId: id || this.state.targetId,
      dialogdel: !this.state.dialogdel
    });
  };

  handleDelete = () => {
    this.delToggle();
    this._delete(this.state.delTargetId);
  };

  delAlertOpen = () =>
    this.setState({
      delalert: true
    });

  delAlertClose = () =>
    this.setState({
      delalert: false
    });

  //데이터 갱신
  componentDidMount() {
    this._get();
  }

  //검색
  searchInput = e => {
    this.setState({ searchKeyword: e.target.value });
    console.log(this.state.searchKeyword);
  };

  //필터

  //렌더(표시)
  render() {
    const { classes } = this.props;
    const id = this.targetId;
    const cellList = ["구입일자", "구입수량", "사용일자", "사용수량", "재고현황", "설정"];
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <InputBase
            className={classes.searchbar}
            name="searchKeyword"
            onChange={this.searchInput}
            value={this.state.searchKeyword}
            placeholder="검색"
          ></InputBase>
          <ButtonGroup
            className={classes.button}
            variant="outlined"
            color="primary"
            aria-label="productTag"
          >
            <Button color="primary">전체</Button>
            <Button color="primary">바디</Button>
            <Button color="primary">페이스</Button>
            <Button color="primary">부자재</Button>
          </ButtonGroup>
        </Paper>
        <Grid container spacing={0} justify="flex-start">
          {this.state.products ? (
            Object.keys(this.state.products).map(id => {
              const product = this.state.products[id];
              return (
                <div key={id}>
                  <Grid item xs={12}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {product.tag}
                        </Typography>
                        <Typography variant="body2" component="p">
                          제품구입: {product.productbuy}
                        </Typography>
                        <Typography variant="body2" component="p">
                          제품사용: {product.productsell}
                        </Typography>
                        <Typography variant="body2" component="p">
                          제품재고: {product.productcurrent}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={this.handleDetail}>
                          자세히
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            this.delToggle(id);
                          }}
                        >
                          삭제
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </div>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Typography align="center">
                제품이 없거나 서버로부터 응답이 없습니다.
                <br />
                제품을 추가하시려면 아래 <AddIcon style={{ fontSize: 13 }} />
                버튼을 클릭하여 제품을 추가하십시오.
              </Typography>
            </Grid>
          )}
        </Grid>
        <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
          <AddIcon />
        </Fab>
        <Dialog open={this.state.dialogadd} onClose={this.handleDialogToggle}>
          <DialogTitle>제품 추가</DialogTitle>
          <DialogContent>
            <DialogContentText>제품을 추가합니다.</DialogContentText>
            <TextField
              label="이름"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleValueChange}
              required
            />
            <br />
            <TextField
              label="분류"
              type="text"
              name="tag"
              value={this.state.tag}
              onChange={this.handleValueChange}
              required
            />
            <br />
            <TextField
              label="구매"
              type="number"
              name="productbuy"
              value={this.state.productbuy}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="판매"
              type="number"
              name="productsell"
              value={this.state.productsell}
              onChange={this.handleValueChange}
            />
            <br />
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
        <Dialog open={this.state.dialogdel} onClose={this.delToggle}>
          <DialogTitle>경고</DialogTitle>
          <DialogContent>
            <Typography>제품을 삭제하시겠습니까?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                this.handleDelete(id);
              }}
            >
              예
            </Button>
            <Button variant="outlined" color="primary" onClick={this.delToggle}>
              아니오
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.dialogdetail} onClose={this.handleDetail}>
          <DialogTitle>제품정보</DialogTitle>
          <DialogContent>
            <TextField
              label="구매일자"
              type="date"
              name="buydate"
              InputLabelProps={{ shrink: true }}
              value={this.state.buydate}
              onChange={this.handleValueChange}
            />
            <TextField
              label="구매수량"
              type="number"
              name="productbuy"
              value={this.state.productbuy}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="사용일자"
              type="date"
              name="usedate"
              InputLabelProps={{ shrink: true }}
              value={this.state.usedate}
              onChange={this.handleValueChange}
            />
            <TextField
              label="사용수량"
              type="number"
              name="productsell"
              value={this.state.productsell}
              onChange={this.handleValueChange}
            />
            <br />
            <Table>
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
                <TableRow></TableRow>
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary">
              추가
            </Button>
            <Button variant="outlined" color="primary" onClick={this.handleDetail}>
              확인
            </Button>
          </DialogActions>
        </Dialog>
        <SnackBar open={this.state.addalert} autoHideDuration={3000} onClose={this.addAlertClose}>
          <Alert onClose={this.addAlertClose} severity="success">
            제품이 추가되었습니다.
          </Alert>
        </SnackBar>
        <SnackBar open={this.state.delalert} autoHideDuration={3000} onClose={this.delAlertClose}>
          <Alert onClose={this.delAlertClose} severity="success">
            제품이 삭제되었습니다.
          </Alert>
        </SnackBar>
      </div>
    );
  }
}

/*제품분류**/
/*
바디(오일,크림)
페이스
부자재

<Button color="primary">분류4</Button>
<Button color="primary">분류5</Button>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {cellList.map(c => {return <TableCell align="center" className={classes.tableHead} key={c}>{c}</TableCell>})}
                  </TableRow>
                </TableHead> 
                <TableBody>
                  <TableRow>

                </TableBody>
              </Table>




              let filter = this.state.products ? Object.keys(this.state.products).filter(id => {
            const product = this.state.products[id];
            return(
                <div key={id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">{product.name}</Typography>
                      <Typography className={classes.pos} color="textSecondary">{product.tag === '게임'}</Typography>
                      <Typography variant="body2" component="p">제품구입: {product.productbuy}</Typography>
                      <Typography variant="body2" component="p">제품사용: {product.productsell}</Typography>
                      <Typography variant="body2" component="p">제품재고: {product.productcurrent}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={this.handleDetail}>자세히</Button><Button size="small" onClick={() => {this.delToggle(id)}}>삭제</Button>
                    </CardActions>
                  </Card>
                </div>
            )
          }): <div/>
*/

export default withStyles(styles)(product);
