import React, { Component } from 'react';
import '../styles/App.less';
import UserList from './UserList';
import UserForm from '../components/UserForm';

import {Button} from 'antd'

class UserListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userlist: [
        {
          id: 1,
          name: 'test1',
          sex: '男',
          age: '30',
          height: '175'
        },
        {
          id: 2,
          name: 'test2',
          sex: '女',
          age: '30',
          height: '175'
        },
        {
          id: 3,
          name: 'test3',
          sex: '男',
          age: '20',
          height: '175'
        },
        {
          id: 4,
          name: 'test3',
          sex: '男',
          age: '20',
          height: '175'
        },
        {
          id: 5,
          name: 'test3',
          sex: '男',
          age: '20',
          height: '175'
        },
        {
          id: 6,
          name: 'test3',
          sex: '男',
          age: '20',
          height: '175'
        },
        {
          id: 7,
          name: 'test3',
          sex: '男',
          age: '20',
          height: '175'
        },
        {
          id: 8,
          name: 'test3',
          sex: '男',
          age: '20',
          height: '175'
        }
      ],
      formDisplay: false,
      maxID:8,

    };
    console.log('constructor,this.state.userlist:',this.state.userlist)

  }
  onToggleForm = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }
  onUpdateUser = (editUser) => {
    let newUserList = this.state.userlist
    for(let i = 0;i < this.state.userlist.length; i++){
      if(this.state.userlist[i].id === editUser.id){
        this.state.userlist[i] = editUser
      }
    }
    this.setState({
      userlist: newUserList,
    });
  }

  onAddUser = (newUser) => {
    newUser.id = this.state.maxID + 1;
    this.state.maxID = newUser.id
    let newUserList = this.state.userlist.concat(newUser);
    this.setState({
      userlist: newUserList,
    });
  }

  onDelUser = (newUserID) => {
    let newUserList = this.state.userlist
    for(let i = 0;i < this.state.userlist.length; i++){
      if(this.state.userlist[i].id === newUserID){
        this.state.userlist.splice(i,1)
        break
      }
    }
    this.setState({
      userlist: newUserList,
    });
  }

  render() {
    console.log('render,this.state.userlist:',this.state.userlist)
    return (
      <div className="App">
            <br />
            <UserList userlist={this.state.userlist}
              onUpdateUser={this.onUpdateUser}
              onDelUser={this.onDelUser}
            />
            <Button type="primary" onClick={this.onToggleForm} size="large" htmlType="submit"
              className="Add-user-button">Add</Button>
             <br />
            <UserForm
              onAddUser={this.onAddUser}
              formDisplay={this.state.formDisplay}
              onToggleForm={this.onToggleForm} />

          <br />        
      </div>
    );
  }
}

export default UserListContainer;
