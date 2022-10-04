import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCarrot, faBowlFood, faUtensils, faCartShopping } from '@fortawesome/free-solid-svg-icons'

const { Header } = Layout
const { Item } = Menu

const Nav = () => {
  return (
    <Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[window.location.pathname]}>
            <Item key='/'><Link to={'/'}><FontAwesomeIcon icon={faUser} size='lg' /></Link></Item>
            <Item key='/foods'><Link to={'/foods'}><FontAwesomeIcon icon={faCarrot} size='lg' /></Link></Item>
            <Item key='/recipes'><Link to={'/recipes'} ><FontAwesomeIcon icon={faBowlFood} size='lg' /></Link></Item>
            <Item key='/meals'><Link to={'/meals'}><FontAwesomeIcon icon={faUtensils} size='lg' /></Link></Item>
            <Item key='/grocery'><Link to={'/grocery'}><FontAwesomeIcon icon={faCartShopping} size='lg' /></Link></Item>
        </Menu>
    </Header>
  )
}

export default Nav
