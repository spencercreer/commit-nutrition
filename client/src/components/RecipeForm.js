import { useState, useEffect } from 'react'
import { Row, Col, Button, Input, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddIngredientRow from './AddIngredientRow'
import IngredientRow from './IngredientRow'
// Utils
import { getFoods, createRecipe } from '../utils/API'

const RecipeForm = () => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')
    //TODO: Change mealFormData to recipeData
    const [mealFormData, setMealFormData] = useState([])
    const [foods, setFoods] = useState()

    useEffect(() => {
        let mounted = true;
        getFoods()
            .then(items => {
                console.log(items)
                if (mounted) {
                    setFoods(items)
                }
            })
        return () => mounted = false;
    }, [])

    const handleCreateRecipe = () => {
        //Maybe refactor when I add an ingredient to only add the id when adding a new food
        const ingredients = mealFormData.map(ingredient => {
            return { foodId: ingredient._id}
        })
        createRecipe({
            name: recipeName,
            description: recipeDescription,
            ingredients
        })
            .then(recipe => {
                console.log(recipe)
            })
    }

    return (
        <>
            <Row>
                <div>Recipe Name:</div>
                <Input
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </Row>
            <Row>
                <div>Recipe Description:</div>
                <Input
                    value={recipeDescription}
                    onChange={(e) => setRecipeDescription(e.target.value)}
                />
            </Row>
            <div style={{ margin: '10px' }}>
                <AddIngredientRow
                    foods={foods}
                    setMealFormData={setMealFormData}
                />
                {/* Should I make addIngredientRow and IngredientRow the same? */}
            </div>
            <div style={{ margin: '10px' }}>
                {
                    mealFormData.map((data, i) => (
                        <IngredientRow
                            key={i}
                            index={i}
                            foods={foods}
                            edit={false}
                            mealFormData={mealFormData}
                            setMealFormData={setMealFormData}
                        />
                    ))
                }
                <Row>
                    <Col xs={14}>
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="g"
                                    // value={food?.carbs * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="g"
                                    // value={food?.protein * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="g"
                                    // value={food?.fat * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="mg"
                                    // value={food?.sodium * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={4}>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Button onClick={handleCreateRecipe}>Create Recipe</Button>
        </>
    )
}

export default RecipeForm