import React from "react";
import { Layout, Menu, Button } from "antd"; // Importing Ant Design components
import './custom.css'; // Import custom CSS for overriding styles
const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header >
    <div className="container mx-auto flex justify-between items-center flex-grow ">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="flex justify-center flex-grow bg-transparent"
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Books</Menu.Item>
        <Menu.Item key="3">FAQ</Menu.Item>
        <Menu.Item key="4">Chat</Menu.Item>
        <Menu.Item key="5">post</Menu.Item>
        <Menu.Item key="6">report</Menu.Item>
      </Menu>
      <Button type="primary" shape="round" className="ml-auto ant-menu-item-selected py-5">
        Sign In
      </Button>
    </div>
    </Header>
  );
};

export default AppHeader;