import { useState, useEffect } from 'react'
import { Row, Col, Button, Input, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddIngredientRow from './AddIngredientRow'
import IngredientRow from './IngredientRow'
// Utils
import { getFoods, createRecipe } from '../../../utils/API'

const RecipeForm = () => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')
    //TODO: Change recipeFormData to recipeData
    const [recipeFormData, setRecipeFormData] = useState([])
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
        const ingredients = recipeFormData.map(ingredient => {
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
            <Row style={{ margin: '10px 60px' }}>
                <div>Recipe Name:</div>
                <Input
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </Row>
            <Row style={{ margin: '10px 60px' }}>
                <div>Recipe Description:</div>
                <Input
                    value={recipeDescription}
                    onChange={(e) => setRecipeDescription(e.target.value)}
                />
            </Row>
            <div style={{ margin: '10px 60px' }}>
                <AddIngredientRow
                    foods={foods}
                    setRecipeFormData={setRecipeFormData}
                />
                {/* Should I make addIngredientRow and IngredientRow the same? */}
            </div>
            <div style={{ margin: '10px 60px' }}>
                {
                    recipeFormData.map((data, i) => (
                        <IngredientRow
                            key={i}
                            index={i}
                            foods={foods}
                            edit={false}
                            recipeFormData={recipeFormData}
                            setRecipeFormData={setRecipeFormData}
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