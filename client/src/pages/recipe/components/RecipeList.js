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