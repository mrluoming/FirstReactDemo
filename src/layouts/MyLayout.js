import React, { Component } from 'react';
import UserListContainer from '../containers/UserListContainer';
import Blank from '../containers/Blank';
import Calculator from '../components/Calculator'
import Clock from '../components/Clock'
import { LeftSideBar } from '../components/SideBar';
import {Layout} from 'antd'
import NavBar from '../components/NavBar'
import {PageRoute} from '../route'
const { Content } = Layout;
class MyLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user:{
        name:'test'
      },
      //记录当前路径
      location:{
        pathname:PageRoute.userlist.path,
      },
      //记录菜单集合
      menuArr:[
        {
          name: '用户列表',
          icon: 'dashboard',
          path: PageRoute.userlist.path,
        },
        {
          name: '工具',
          icon: 'desktop',
          path: PageRoute.blank.path,
          children: [
            {
              name: '水温计算器',
              path: PageRoute.calculator.path,
            }
          ]
        },
        {
          name: '时钟',
          icon: 'share-alt',
          path: PageRoute.clock.path,
        }
      ],
      //记录有效菜单
      flatMenu:[
        {
          name: '用户列表',
          icon: 'dashboard',
          path: PageRoute.userlist.path,
        },
        {
          
          name: '水温计算器',
          path: PageRoute.calculator.path,
           
        },
        {
          name: '时钟',
          icon: 'share-alt',
          path: PageRoute.clock.path,
        }
      ],
      //记录当前选中菜单
      currentMenu: {},

      collapsed:false,

    };
    //循环找出菜单的父子关联
    const loopMenu = (menu, pitem = {}) => {
      menu.forEach(item => {
        if (pitem.path) {
          item.parentPath = pitem.parentPath ? pitem.parentPath.concat(pitem.path) : [pitem.path];
        }
        if (item.children && item.children.length) {
          loopMenu(item.children, item);
        }
      });
    }
    loopMenu(this.state.menuArr);
  }

  

  componentWillReceiveProps(nextProps) {
    console.log('MyLayout,componentWillReceiveProps,nextProps:', nextProps)
    
  }

  getCurrentMenu = (pathname) => {
    const resultMenu = this.getMeunMatchKeys(this.state.menuArr, pathname)
    console.log('getCurrentMenu,pathname:',pathname)
    console.log('getCurrentMenu,resultMenu:',resultMenu)
    const menu = resultMenu;
    return menu;
  }

  getMeunMatchKeys = (flatMenu, path) => {

    for(let i=0;i<flatMenu.length;i++){
      if(flatMenu[i].path === path){
        return flatMenu[i]
      }
      if(flatMenu[i].children){
        for(let j=0; j<flatMenu[i].children.length;j++){
          if(flatMenu[i].children[j].path === path){
            return flatMenu[i].children[j]
          }
        }
      }
    }
  };
  
  //根据不同路径获取不同内容组件
  getContentByPath = (path) => {
    console.log('getContentByPath,path:', path)
    switch(path){
      case PageRoute.userlist.path:
      return (
        <UserListContainer />
      );
      case PageRoute.calculator.path:
      return (
        <Calculator />
      );
      case PageRoute.clock.path:
      return (
        <Clock />
      );
      default:
      return (
        <Blank />
      )
    }
  }

  clickMenu = (key)  =>{

    console.log('MyLayout,clickMenu,key:',key)
    if (this.state.location.pathname !== key) {
      this.setState({
        location: {
          pathname: key
        },
        currentMenu: this.getCurrentMenu(key) || {}
      });
    }
  }

  render() {

    console.log('render,currentMenu:',this.state.currentMenu)
    return (
      <Layout>
        
          <NavBar
          user={this.state.user}
          />
       
        <Layout>
          <LeftSideBar
            location={this.state.location}
            flatMenu={this.state.flatMenu}
            currentMenu={this.state.currentMenu}
            menu={this.state.menuArr}
            user={this.state.user}
            theme="darkgrey"
            clickMenu={this.clickMenu}
            collapsed={this.state.collapsed}
          />
          <Content >
            {this.getContentByPath(this.state.location.pathname)}
          </Content>
          
        </Layout>
        
      </Layout>
    );
  }
}

export default MyLayout;
