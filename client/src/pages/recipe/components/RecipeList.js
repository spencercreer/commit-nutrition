// React
import React, { useState } from 'react'
// Components
import LoadingCards from '../../components/LoadingCards'
import IngredientModal from '../../food/components/IngredientModal'
import NutrientsRow from '../../components/NutrientsRow'
// Antd
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons'

const RecipeList = ({ loading, recipeData }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [modalVisible, setModalVisible] = useState(false)

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
                loading
                  ? <LoadingCards number={12} />
                  : recipeData?.map((recipe, i) => (
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
                                />
                            ]}
                        >
                            <p>{recipe.serving?.calories} cal, {recipe.serving?.size} {recipe.serving?.unit}</p>
                            <NutrientsRow
                                nutrients={{ calories: recipe.serving?.calories, carbs: recipe.serving?.carbs, protein: recipe.serving?.protein, fat: recipe.serving?.fat, sodium: recipe.serving?.sodium }}
                            />
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
