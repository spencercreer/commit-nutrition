// Antd
import { Card } from 'antd'
// Utils
import { useGet } from '../../../utils/API'

const RecipeList = () => {

    const { data: recipeData, loading } = useGet('/api/recipes')

    return (
        <>
            {
                loading ? <div>Loading...</div>
                    :
                    recipeData?.map(recipe => (
                        <Card title={<div>{recipe.name}</div>}>
                            <p>Calories:</p>
                            <p>Carbs:</p>
                            <p>Protein:</p>
                            <p>Fat:</p>
                            <p>Sodium:</p>
                        </Card>
                    ))
            }
        </>
    )
}

export default RecipeList