// React
import { useState } from 'react';
import NutrientsRow from './NutrientsRow';
// Components
import MealPlanModal from '../pages/meal/components/MealPlanModal'
import CalendarModal from './CalendarModal';
// Antd
import { Row, Card } from 'antd'
import { CalendarOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import moment from 'moment'

const MealCard = ({ meal }) => {
    const [selectedRecipeId, setSelectedRecipeId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [calendarModalVisible, setCalendarModalVisible] = useState(false)

    const handleOnClick = (recipeId) => {
        handleToggleModal()
        setSelectedRecipeId(recipeId)
    }

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const toggleCalendarModal = () => {
        setCalendarModalVisible(!calendarModalVisible)
    }

    return (
        <>
            <Card
                // key={i}
                title={<div>{moment(meal?.date).format('dddd, MMMM Do YYYY')}</div>}
                actions={[
                    <EllipsisOutlined
                        key='ellipsis'
                        onClick={() => handleOnClick(meal._id)}
                    />,
                    <CalendarOutlined
                        key='edit'
                        onClick={() => setCalendarModalVisible(true)}
                    />,
                ]}
            >
                <div>
                    <h6>Breakfast</h6>
                    {
                        meal?.breakfast.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.breakfast.recipes.map((ingredient, i) => (
                            <Row key={i}>
                                <a onClick={() => handleOnClick(ingredient.recipeId?._id)}>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</a>
                            </Row>
                        ))
                    }
                </div>
                <div>
                    <h6>Lunch</h6>
                    {
                        meal?.lunch.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.lunch.recipes.map((ingredient, i) => (
                            <Row key={i}>
                                <a onClick={() => handleOnClick(ingredient.recipeId?._id)}>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</a>
                            </Row>
                        ))
                    }
                </div>
                <div>
                    <h6>Dinner</h6>
                    {
                        meal?.dinner.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.dinner.recipes.map((ingredient, i) => (
                            <Row key={i}>
                                <a onClick={() => handleOnClick(ingredient.recipeId?._id)}>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</a>
                            </Row>
                        ))
                    }
                </div>
                <div>
                    <h6>Snacks</h6>
                    {
                        meal?.snacks.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.snacks.recipes.map((ingredient, i) => (
                            <Row key={i}>
                                <a onClick={() => handleOnClick(ingredient.recipeId?._id)}>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</a>
                            </Row>
                        ))
                    }
                </div>
                <NutrientsRow
                    nutrients={{ calories: meal?.calories, carbs: meal?.carbs, protein: meal?.protein, fat: meal?.fat, sodium: meal?.sodium }}
                />
            </Card>
            {
                selectedRecipeId &&
                <>
                    <MealPlanModal
                        recipeId={selectedRecipeId}
                        visible={modalVisible}
                        handleCloseModal={handleToggleModal}
                    />
                </>
            }
            <CalendarModal
                visible={calendarModalVisible}
                mealData={meal}
                handleCloseModal={toggleCalendarModal}
            />
        </>
    )
}

export default MealCard