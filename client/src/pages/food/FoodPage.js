// React
import { useState } from 'react'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Button } from 'antd'
// Components
import FoodList from './components/FoodList'
import AddFoodModal from './components/AddFoodModal'
// Utils
import { foodCategories } from '../../utils/form'

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
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Foods'>
                        <Item key={0}>All</Item>
                        {
                            foodCategories.map((foodCategory, i) => (
                                <Item key={i + 1}>{foodCategory.label}</Item>
                            ))
                        }
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