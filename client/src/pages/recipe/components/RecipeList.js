// React
import { useState, useEffect } from 'react'
import { Card } from 'antd'
// Utils
import { getRecipes } from '../../../utils/API'

const RecipeList = () => {
    const [recipes, setRecipes] = useState()

    useEffect(() => {
        let mounted = true;
        getRecipes()
            .then(items => {
                if (mounted) {
                    setRecipes(items)
                }
            })
        return () => mounted = false;
    }, [])

    return (
        <>
            {recipes?.map(recipe => (
                <Card title={<div>{recipe.name}</div>}>
                    <p>Calories:</p>
                    <p>Carbs:</p>
                    <p>Protein:</p>
                    <p>Fat:</p>
                    <p>Sodium:</p>
                </Card>
            ))}
        </>
    )
}

export default RecipeList