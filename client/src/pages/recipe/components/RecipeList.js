import { useState } from 'react';
import LoadingCards from '../../../components/LoadingCards'
import IngredientModal from '../../food/components/IngredientModal'
// Antd
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons'
// Utils
import { useGet } from '../../../utils/API'

const RecipeList = () => {
    const [selectedRecipeId, setSelectedRecipeId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const { data: recipeData, loading } = useGet('/api/recipes')

    const handleOnClick = (recipeId) => {
        handleToggleModal()
        setSelectedRecipeId(recipeId)
    }

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

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
                                    onClick={() => handleOnClick(recipe._id)}
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
                            <p>{(recipe.serving?.calories).toFixed()} cal, {recipe.serving?.size} {recipe.serving?.unit}</p>
                            <p>Carbs: {(recipe.serving?.carbs).toFixed()} g</p>
                            <p>Protein: {(recipe.serving?.protein).toFixed()} g</p>
                            <p>Fat: {(recipe.serving?.fat).toFixed()} g</p>
                            <p>Sodium: {(recipe.serving?.sodium).toFixed()} mg</p>
                        </Card>
                    ))
            }
            {
                selectedRecipeId &&
                <IngredientModal
                    recipeId={selectedRecipeId}
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            }
        </>
    )
}

export default RecipeList