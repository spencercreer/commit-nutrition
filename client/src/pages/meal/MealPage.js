import MealForm from '../../components/MealForm'

import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

const MealPage = () => {
    return (
        <>
        <Sider>
        <Menu
        mode='inline'
        style={{ height: '100%', borderRight: 0 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
      >
        <SubMenu key='sub1' title='COMMIT Nutrition'>
            <Item key='1'><Link to={'/foods'} >Foods</Link></Item>
            <Item key='2'><Link to={'/recipes'} >Recipes</Link></Item>
            <Item key='3'><Link to={'/meals'} >Meals</Link></Item>
        </SubMenu>
        </Menu>
        </Sider>
        <Content>
            <MealForm />
        </Content>
        </>
    )
}

export default MealPage