// React
import NutrientsRow from './NutrientsRow';
// Antd
import { Layout, Menu, Row, Card, Button } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

// Utils
import moment from 'moment'

const MealCard = ({ meal }) => {
    return (
        <Card
            // key={i}
            title={<div>{moment(meal?.date).format('dddd, MMMM Do YYYY')}</div>}
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
                    meal?.breakfast.ingredients.map((ingredient, i) => (
                        <Row key={i}>
                            <div>{ingredient.foodId?.name} {ingredient.foodId?.number_of_servings} {ingredient.foodId?.serving?.size} {ingredient.foodId?.serving?.unit}</div>
                        </Row>
                    ))
                }
                {
                    meal?.breakfast.recipes.map((ingredient, i) => (
                        <Row key={i}>
                            <div>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</div>
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
                            <div>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</div>
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
                            <div>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</div>
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
                            <div>{ingredient.recipeId?.name} {ingredient.recipeId?.number_of_servings} {ingredient.recipeId?.serving?.size} {ingredient.recipeId?.serving?.unit}</div>
                        </Row>
                    ))
                }
            </div>
            <NutrientsRow
                nutrients={{ calories: meal?.calories, carbs: meal?.carbs, protein: meal?.protein, fat: meal?.fat, sodium: meal?.sodium }}
            />
        </Card>
    )
}

export default MealCard