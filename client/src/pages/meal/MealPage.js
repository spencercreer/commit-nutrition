// React
import { useState } from 'react'
import AddMealPlanModal from './components/AddMealPlanModal'
import LoadingCards from '../../components/LoadingCards'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Card, Button } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

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
    console.log(mealData)

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
            <Content style={{ margin: '10px 60px' }}>
                <Button
                    type='primary'
                    onClick={() => setModalVisible(true)}
                >
                    Add Meal Plan
                </Button>
                {/* <MealForm /> */}
                {/* Below will be moved to meal list */}
                {
                    loading ? 
                    <LoadingCards />
                    :
                    mealData?.map((meal, i) => (
                        <Card
                            key={i}
                            title={<div>Meal Plan: {meal.date}</div>}
                            actions={[
                                <EllipsisOutlined
                                    key='ellipsis'
                                    // onClick={() => handleOnClick(false)}
                                />,
                                <EditOutlined
                                    key='edit'
                                    // onClick={() => handleOnClick(true)}
                                />,
                            ]}
                        >
                            <div>
                                <div>Breakfast</div>
                                {
                                    meal.breakfast.map((ingredient, i) => (
                                        <div key={i}>{ingredient.foodId}</div>
                                    ))
                                }
                            </div>
                            <div>
                                <div>Lunch</div>
                                {
                                    meal.lunch.map((ingredient, i) => (
                                        <div key={i}>{ingredient.foodId}</div>
                                    ))
                                }
                            </div>
                            <div>
                                <div>Dinner</div>
                                {
                                    meal.dinner.map((ingredient, i) => (
                                        <div key={i}>{ingredient.foodId}</div>
                                    ))
                                }
                            </div>
                            <div>
                                <div>Snacks</div>
                                {
                                    meal.snacks.map((ingredient, i) => (
                                        <div key={i}>{ingredient.foodId}</div>
                                    ))
                                }
                            </div>
                        </Card>
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