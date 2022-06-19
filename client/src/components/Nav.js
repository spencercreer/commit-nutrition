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
        <Menu theme='dark' mode='horizontal' >
            <Item key='1'><Link to={'/'}><FontAwesomeIcon icon={faUser} size='lg' /></Link></Item>
            <Item key='2'><Link to={'/foods'}><FontAwesomeIcon icon={faCarrot} size='lg' /></Link></Item>
            <Item key='3'><Link to={'/recipes'} ><FontAwesomeIcon icon={faBowlFood} size='lg' /></Link></Item>
            <Item key='4'><Link to={'/meals'}><FontAwesomeIcon icon={faUtensils} size='lg' /></Link></Item>
            <Item key='5'><Link to={'/meals'}><FontAwesomeIcon icon={faCartShopping} size='lg' /></Link></Item>
        </Menu>
    </Header>
  )
}

export default Nav