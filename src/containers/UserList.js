import React from 'react';
import UserItem from '../components/UserItem'
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }




  render() {

    const userList = this.props.userlist;
    console.log('userList',userList)
    if (!Array.isArray(userList)) throw new Error('this.props.userlist必需是数组！');
    const self = this
    var userListComps = userList.map(function (q) {
      return <UserItem
        key = {q.id} 
        id = {q.id}
        name={q.name}
        sex={q.sex}
        age={q.age}
        height={q.height}

        onUpdateUser={self.props.onUpdateUser} 
        onDelUser={self.props.onDelUser} 
      />
    })

    return (
      <div id="userlist" className="">
        {userListComps}
      </div>
    )

  }
}
export default UserList;