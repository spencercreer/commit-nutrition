import LoadingCards from '../../../components/LoadingCards'
// Antd
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
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
                            actions={[
                                <EllipsisOutlined
                                    key='ellipsis'
                                    // onClick={() => handleOnClick(false)}
                                />,
                                <EditOutlined
                                    key='edit'
                                    // onClick={() => handleOnClick(true)}
                                />,
                                // <Switch 
                                    // checked={active}
                                    // onChange={handleStatusChange}
                                // />,
                            ]}
                        >
                            <p>Calories: {recipe.calories} cal</p>
                            <p>Carbs: {recipe.carbs} g</p>
                            <p>Protein: {recipe.protein} g</p>
                            <p>Fat: {recipe.fat} g</p>
                            <p>Sodium: {recipe.sodium} mg</p>
                        </Card>
                    ))
            }
        </>
    )
}

export default RecipeList