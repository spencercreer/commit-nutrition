// React
import { useState } from 'react'
import MealForm from '../../components/MealForm'
import AddMealPlanModal from './components/AddMealPlanModal'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Button } from 'antd'
// Utils
import { useGet } from '../../utils/API'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

const MealPage = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const { data: mealData, loading } = useGet('/api/meals')

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
                    <SubMenu key='sub1' title='COMMIT Nutrition'>
                        <Item key='1'><Link to={'/foods'} >Foods</Link></Item>
                        <Item key='2'><Link to={'/recipes'} >Recipes</Link></Item>
                        <Item key='3'><Link to={'/meals'} >Meals</Link></Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content>
                <Button
                    type='primary'
                    onClick={() => setModalVisible(true)}
                >
                    Add Meal Plan
                </Button>
                <div>MealPage</div>
                <MealForm />
                {
                    mealData?.map((meal, i) => (
                        <div key={i}>Calories: {meal.calories}</div>
                    ))
                }
                <AddMealPlanModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
    )
}

export default MealPage