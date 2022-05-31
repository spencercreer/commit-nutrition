import LoadingCards from '../../../components/LoadingCards'
// Antd
import { Card } from 'antd'
// Utils
import { useGet } from '../../../utils/API'

const RecipeList = () => {

    const { data: recipeData, loading } = useGet('/api/recipes')

    return (
        <>
            {
                loading ?
                    <LoadingCards />
                    :
                    recipeData?.map((recipe, i) => (
                        <Card
                            key={i}
                            title={<div>{recipe.name}</div>}
                        >
                            <p>Calories: {recipe.calories}</p>
                            <p>Carbs: {recipe.carbs}</p>
                            <p>Protein: {recipe.protein}</p>
                            <p>Fat: {recipe.fat}</p>
                            <p>Sodium: {recipe.sodium}</p>
                        </Card>
                    ))
            }
        </>
    )
}

export default RecipeList