import React from 'react';
import { Button, Input, Form } from 'antd';
import "../styles/UserItem.less"
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
      
    }

    render() {
      var styleObj = {
        display : this.props.formDisplay ? 'block':'none'
      };
      const { form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form ref="addUserForm" name="addUser" style={styleObj} className="user-item">
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