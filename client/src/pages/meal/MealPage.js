// React
import { useState } from 'react'
import AddMealPlanModal from './components/AddMealPlanModal'
import LoadingCards from '../../components/LoadingCards'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Row, Card, Button } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

// Utils
import { useGet } from '../../utils/API'
import moment from 'moment'

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
                                title={<div>Meal Plan: {moment(meal.date).format('dddd, MMMM Do YYYY')}</div>}
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
                                    <h6>Breakfast</h6>
                                    {
                                        meal.breakfast.ingredients.map((ingredient, i) => (
                                            <Row key={i}>
                                                <div>{ingredient.foodId.name}</div>
                                            </Row>
                                        ))
                                    }
                                    {
                                        meal.breakfast.recipes.map((ingredient, i) => (
                                            <Row key={i}>
                                                <div>{ingredient.recipeId?.name}</div>
                                            </Row>
                                        ))
                                    }
                                </div>
                                <div>
                                    <h6>Lunch</h6>
                                    {
                                        meal.lunch.ingredients.map((ingredient, i) => (
                                            <Row key={i}>
                                                <div>{ingredient.foodId.name}</div>
                                            </Row>
                                        ))
                                    }
                                </div>
                                <div>
                                    <h6>Dinner</h6>
                                    {
                                        meal.dinner.ingredients.map((ingredient, i) => (
                                            <Row key={i}>
                                                <div>{ingredient.foodId.name}</div>
                                            </Row>
                                        ))
                                    }
                                </div>
                                <div>
                                    <h6>Snacks</h6>
                                    {
                                        meal.snacks.ingredients.map((ingredient, i) => (
                                            <Row key={i}>
                                                <div>{ingredient.foodId.name}</div>
                                            </Row>
                                        ))
                                    }
                                </div>
                                <div>
                                    <h6>Meal Plan Totals</h6>
                                    <p>Calories: {meal.calories}cal</p>
                                    <p>Carbs: {meal.carbs}g</p>
                                    <p>Protein: {meal.protein}g</p>
                                    <p>Fat: {meal.fat}g</p>
                                    <p>Sodium: {meal.sodium}g</p>
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