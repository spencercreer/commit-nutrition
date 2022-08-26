// React
import { useState } from 'react'
import NutrientsRow from './NutrientsRow'
// Components
import MealPlanModal from '../meal/components/MealPlanModal'
import CalendarModal from './CalendarModal'
// Antd
import { Row, Card } from 'antd'
import { CalendarOutlined, EllipsisOutlined, StarOutlined, StarTwoTone } from '@ant-design/icons'
// Utils
import { usePost } from '../../utils/API'
import moment from 'moment'

const MealCard = ({ meal }) => {
    const [selectedRecipeId, setSelectedRecipeId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [calendarModalVisible, setCalendarModalVisible] = useState(false)
    const [starred, setStarred] = useState(meal?.starred)
    const [updateMeal] = usePost('api/meal/updateStar')

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

    const handleStarClick = () => {
        updateMeal({ 
            mealId: meal._id,
            starred: !starred
        })
        .then(res => {
            console.log(res)
        })
        setStarred(!starred)
    }

    return (
        <>
            <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {moment(meal?.date).format('dddd, MMMM Do YYYY')}
                        <div>
                            {
                                starred
                                    ?
                                    <StarTwoTone
                                        onClick={handleStarClick}
                                    />
                                    :
                                    <StarOutlined
                                        onClick={handleStarClick}
                                    />
                            }
                        </div>
                    </div>
                }
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
                    <h6 style={{ margin: "10px 0px 5px 0px" }}>Breakfast</h6>
                    {
                        meal?.breakfast?.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit} {ingredient.foodId?.name}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.breakfast?.recipes.map((ingredient, i) => (
                            <Row key={i}>
                                <a onClick={() => handleOnClick(ingredient.recipeId?._id)}>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</a>
                            </Row>
                        ))
                    }
                </div>
                <div>
                    <h6 style={{ margin: "10px 0px 5px 0px" }}>Lunch</h6>
                    {
                        meal?.lunch?.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.lunch?.recipes.map((ingredient, i) => (
                            <Row key={i}>
                                <a onClick={() => handleOnClick(ingredient.recipeId?._id)}>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</a>
                            </Row>
                        ))
                    }
                </div>
                <div>
                    <h6 style={{ margin: "10px 0px 5px 0px" }}>Dinner</h6>
                    {
                        meal?.dinner?.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.dinner?.recipes.map((ingredient, i) => (
                            <Row key={i}>
                                <a onClick={() => handleOnClick(ingredient.recipeId?._id)}>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</a>
                            </Row>
                        ))
                    }
                </div>
                <div>
                    <h6 style={{ margin: "10px 0px 5px 0px" }}>Snacks</h6>
                    {
                        meal?.snacks?.ingredients.map((ingredient, i) => (
                            <Row key={i}>
                                <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                            </Row>
                        ))
                    }
                    {
                        meal?.snacks?.recipes.map((ingredient, i) => (
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