import React from 'react';
class UserItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         
      };
     
    }
   
    componentDidMount() {
      
    }
   
    componentWillUnmount() {
      
    }
   
    submitHandle = (e) =>{
      e.preventDefault();//取消默认事件，否则页面会被刷新重置
      if (this.refs.addUserForm.name.value && this.refs.addUserForm.name.value.trim() === ''
        || !this.refs.addUserForm.name.value) {
        return
      }
      else {
        var newUser = {
          name: this.refs.addUserForm.name.value,
          age: this.refs.addUserForm.age.value,
          sex: this.refs.addUserForm.sex.value,
          height: this.refs.addUserForm.height.value,
        };

        this.refs.addUserForm.reset();
        this.props.onAddUser(newUser);
      }
      
    }

    render() {
      var styleObj = {
        display : this.props.formDisplay ? 'block':'none'
      };
      return (
        <form ref="addUserForm" name="addUser" style={styleObj} onSubmit={this.submitHandle}>
              <div className="form-group">
                <label htmlFor="qtitle">添加用户</label>
                <br/>姓名 <input type='text' name='name'/>
                <br/>年龄 <input type='text' name='age' />
                <br/>性别 <input type='text' name='sex'/>
                <br/>身高 <input type='text' name='height' />
              </div>
              
              <button >确认</button>
              <button type="button"  onClick={this.props.onToggleForm}>取消</button>
            </form>
      );
    }
  }
export default UserItem;