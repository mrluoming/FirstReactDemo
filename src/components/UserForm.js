import React from 'react';
import { Button, Input, Form } from 'antd';
import "../styles/UserItem.css"
const FormItem = Form.Item
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
      this.props.form.validateFields((error, values) => {
        if (!error) {
          console.log('ok', values);
          var newUser = values;
          this.props.form.resetFields({});
          this.props.onAddUser(newUser);

        } else {
          console.log('error', error, values);
        }
      });
      return;

      //old code
      console.log('this.props:',this.props)
      console.log('this.refs:',this.refs)
      console.log('this.refs.addUserForm:',this.refs.addUserForm)
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
      const { loading, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form ref="addUserForm" name="addUser" style={styleObj} >
              <div>
              <br/>
                <label htmlFor="qtitle">添加用户</label>
                <FormItem>
                {getFieldDecorator('name', {
                  //initialValue: 'test',
                  rules: [{ required: true, message: '请输入您的用户名，示例test' }]
                })(
                  <Input className="user-input" type='text'/>
                )}
                </FormItem>

                <FormItem>
                {getFieldDecorator('age', {
                  initialValue: '18',
                  rules: [{ required: true, message: '请输入年龄' }]
                })(
                  <Input className="user-input" type='text'/>
                )}
                </FormItem>

                <FormItem>
                {getFieldDecorator('sex', {
                  initialValue: '男',
                  rules: [{ required: true, message: '请输入性别' }]
                })(
                  <Input className="user-input" type='text'/>
                )}
                </FormItem>

                <FormItem>
                {getFieldDecorator('height', {
                  initialValue: '170',
                  rules: [{ required: true, message: '请输入身高' }]
                })(
                  <Input className="user-input" type='text'/>
                )}
                </FormItem>

                
              </div>
              
              <Button onClick={this.submitHandle}>确认</Button>
              <Button  onClick={this.props.onToggleForm}>取消</Button>
        </Form>
      );
    }
  }
export default Form.create()(UserItem);