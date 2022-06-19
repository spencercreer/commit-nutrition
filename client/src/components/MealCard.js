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
    title={<div>Meal Plan: {moment(meal?.date).format('dddd, MMMM Do YYYY')}</div>}
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
                    <div>{ingredient.foodId.name}</div>
                </Row>
            ))
        }
        {
            meal?.breakfast.recipes.map((ingredient, i) => (
                <Row key={i}>
                    <div>{ingredient.recipeId?.name}</div>
                </Row>
            ))
        }
    </div>
    <div>
        <h6>Lunch</h6>
        {
            meal?.lunch.ingredients.map((ingredient, i) => (
                <Row key={i}>
                    <div>{ingredient.foodId.name}</div>
                </Row>
            ))
        }
    </div>
    <div>
        <h6>Dinner</h6>
        {
            meal?.dinner.ingredients.map((ingredient, i) => (
                <Row key={i}>
                    <div>{ingredient.foodId.name}</div>
                </Row>
            ))
        }
    </div>
    <div>
        <h6>Snacks</h6>
        {
            meal?.snacks.ingredients.map((ingredient, i) => (
                <Row key={i}>
                    <div>{ingredient.foodId.name}</div>
                </Row>
            ))
        }
    </div>
    <NutrientsRow
        nutrients={{calories: meal?.calories, carbs: meal?.carbs, protein: meal?.protein, fat: meal?.fat, sodium: meal?.sodium}}
    />
</Card>
  )
}

export default MealCard