// React
import { useState } from 'react'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Button } from 'antd'
//Components
import FoodList from './components/FoodList'
import AddFoodModal from './components/AddFoodModal'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

const FoodPage = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <Sider
                width={200}
                className='site-layout-background'
                breakpoint='md'
                collapsedWidth='0'
            >
                <Menu
                    mode='inline'
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Foods'>
                        <Item key='1'><Link to={'/vegtables'} >Vegtables</Link></Item>
                        <Item key='2'><Link to={'/fruits'} >Fruits</Link></Item>
                        <Item key='3'><Link to={'/grains'} >Grains</Link></Item>
                        <Item key='4'><Link to={'/meats'} >Meats</Link></Item>
                        <Item key='5'><Link to={'/dairy'} >Dairy</Link></Item>
                        <Item key='6'><Link to={'/oils_fats'} >Oils & Fats</Link></Item>
                        <Item key='7'><Link to={'/seasonings'} >Seasonings</Link></Item>
                        <Item key='8'><Link to={'/other-foods'} >Other</Link></Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ margin: '10px 60px' }}>
                <Button
                    type='primary'
                    onClick={() => setModalVisible(true)}
                >
                    Add Food
                </Button>
                <FoodList />
                <AddFoodModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
    )
}

export default FoodPage