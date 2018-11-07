/**
 * 来源
 * https://github.com/ant-design/ant-design-pro/blob/master/src/components/SiderMenu/SiderMenu.js
 */
import React, { Component } from 'react';
import cx from 'classnames';
import { Menu, Layout } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Icon from '../Icon';
import './style/index.less';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} antd />;
  }
  return icon;
};

export const getMeunMatchKeys = (flatMenu, path) => {
  return flatMenu.filter(item => {
    return pathToRegexp(item.path).test(path);
  });
};

class LeftSideBar extends Component {
  static defaultProps = {
    fixed: true,
    theme: ''
  };

  constructor(props) {
    super(props);
    console.log('constructor,props:', props);
    this.state = {
      openKeys: props.currentMenu ? props.currentMenu.parentPath : []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('LeftSideBar,componentWillReceiveProps,nextProps:', nextProps);
    if ('currentMenu' in nextProps) {
      
      this.setState({
        openKeys: nextProps.currentMenu.parentPath || []
      });
    }
  }

  handleClick = (item) => {
    console.log('LeftSideBar.handleClick,item', item)
    this.props.clickMenu(item.key)
  }
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;

    
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a >
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <a
        replace={ (itemPath === this.props.location.pathname) ? 'true':'false'}
      >
        {icon}
        <span>{name}</span>
      </a>
    );
    
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    }
  };
  /**
   * 获得菜单子节点
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return ItemDom;
      })
      .filter(item => item);
  };

  // conversion Path
  // 转化路径
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/').replace(/\/:\w+\??/, '');
    }
  };

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const pathname = this.props.location.pathname;
    console.log('getSelectedMenuKeys,pathname:',pathname)
    const selectMenu = getMeunMatchKeys(this.props.flatMenu, pathname)[0];
    return selectMenu ? [selectMenu.path] : [];
  };

  isMainMenu = key => {
    return this.props.menu.some(
      item => key && (item.key === key || item.path === key)
    );
  };

  handleOpenChange = openKeys => {
    console.log('before handleOpenChange,openKeys:', this.state.openKeys)
    console.log('before handleOpenChange,param openKeys:', openKeys)
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    console.log('moreThanOne:', moreThanOne)
    console.log('lastOpenKey:', lastOpenKey)
    console.log('[...openKeys]:', [...openKeys])
    const reulstOpenKeys = (moreThanOne ? [lastOpenKey] : [...openKeys])
    console.log('reulstOpenKeys:', reulstOpenKeys)
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
    });
    console.log('after handleOpenChange,openKeys:', this.state.openKeys)
  };

  render() {
    const {
      fixed,
      theme,
      collapsed,
      onCollapse,

      leftCollapsedWidth,
      showHeader,
      menu,
  
    } = this.props;
    console.log('collapsed:',collapsed)
    const classnames = cx('sidebar-left', 'sidebar-default', {
      affix: !!fixed,
      'sidebar-left-sm': collapsed,
      'show-header': collapsed ? false : showHeader,
      'sidebar-left-close': leftCollapsedWidth === 0,
      [theme]: !!theme
    });

    const { openKeys } = this.state;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {
          selectedKeys
        }
      : {
          openKeys,
          selectedKeys
        };
    console.log('openKeys:', openKeys)
    console.log('selectedKeys:', selectedKeys)
    console.log('menuProps:', menuProps)
    return (
      <Sider
        className={classnames}
        width={230}
        collapsedWidth={leftCollapsedWidth + 0.1}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="lg"
        trigger={null}
      >
        <div className="sidebar-left-content">
          
          <Menu
            onClick={this.handleClick}
            inlineCollapsed={collapsed}
            onOpenChange={this.handleOpenChange}
            mode="inline"
            theme={theme}
            {...menuProps}
          >
            {this.getNavMenuItems(menu)}
          </Menu>
          
        </div>
      </Sider>
    );
  }
}

export default LeftSideBar;
