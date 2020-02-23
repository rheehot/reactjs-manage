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

const databaseURL="https://customer-5b5d0.firebaseio.com"

const styles = theme => ({
})

class product extends React.Component{

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
          alert("정보가 추가되었습니다.")
        });
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
          alert("정보가 삭제되었습니다.")
        });
      }

      //렌더(표시)
    render(){
        const {classes} = this.props
        return(
            <div></div>
        )
    }
}

export default product;