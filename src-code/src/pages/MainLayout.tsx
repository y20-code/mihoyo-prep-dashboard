import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FieldTimeOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import { useNavigate,Outlet,useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const menuItems = [
    {
      key: '/dashboard',
      icon: <UserOutlined />,
      label: '任务栏',
    },
    {
      key: '/statistics',
      icon: <VideoCameraOutlined />,
      label: '统计',
    },{
      key: '/focus',
      icon: <FieldTimeOutlined />, // 记得引入图标
      label: '专注钟',
    },
  ]

  return (
    <Layout style={{minHeight:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          // items={[
          //   {
          //     key: '/dashboard',
          //     icon: <UserOutlined />,
          //     label: '任务栏',
          //   },
          //   {
          //     key: 'statistics',
          //     icon: <VideoCameraOutlined />,
          //     label: '统计',
          //   },
          //   {
          //     key: '3',
          //     icon: <UploadOutlined />,
          //     label: 'nav 3',
          //   },
          // ]}
          selectedKeys={[location.pathname]}
          onClick={({key}) =>{
            navigate(key);
          }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content */}
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;