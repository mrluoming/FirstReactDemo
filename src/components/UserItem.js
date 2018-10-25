import React from 'react';
class UserItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name:this.props.name,
        age:this.props.age,
        sex:this.props.sex,
        height:this.props.height
      };
     
    }
   
    componentDidMount() {
      
    }
   
    componentWillUnmount() {
      
    }
   
    updateData = () =>{
        
        console.log('UserItem.updateData,id:',this.props.id)
        console.log('this.refs.UserItem:',this.refs.UserItem)
        let newUser = {
            id:this.props.id,
            name:this.state.name,
            age:this.state.age,
            sex:this.state.sex,
            height:this.state.height
        }
        this.props.onUpdateUser(newUser)
    }
    delData = () =>{
        console.log('UserItem.delData,id:',this.props.id)
        this.props.onDelUser(this.props.id)
    }
    onChangeNameData = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    onChangeAageData = (e) => {
        this.setState({
            age: e.target.value
        });
    }
    onChangeSexData = (e) => {
        this.setState({
            sex: e.target.value
        });
    }
    onChangeHeightData = (e) => {
        this.setState({
            height: e.target.value
        });
    }

    render() {
      return (
 
        <div ref="UserItem" name="UserItem">
	        <h5>
                   姓名 <input type='text' name='name' defaultValue = {this.props.name} onChange={this.onChangeNameData}/>
                   年龄 <input type='text' name='age' defaultValue = {this.props.age} onChange={this.onChangeAageData}/>
                   性别 <input type='text' name='sex' defaultValue = {this.props.sex} onChange={this.onChangeSexData}/>
                   身高 <input type='text' name='height' defaultValue = {this.props.height} onChange={this.onChangeHeightData}/>
                   <button onClick={this.updateData}>更新</button>
                   <button onClick={this.delData}>删除</button>
            </h5>
	    </div>

      );
    }
  }
export default UserItem;