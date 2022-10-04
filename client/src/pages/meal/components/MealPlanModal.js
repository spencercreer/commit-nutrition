import React, { useState } from 'react'
import { Modal, Skeleton, Button, Card } from 'antd'
import { useGet } from '../../../utils/API'

import NutrientsChart from '../../components/NutrientsChart'

// const tabList = [
//     {
//         key: 'recipe',
//         tab: 'Recipe',
//     },
//     {
//         key: 'serving',
//         tab: 'Serving',
//     },
// ]

const MealPlanModal = ({ recipeId, visible, handleCloseModal }) => {
  const [activeTab, setActiveTab] = useState('recipe')
  const { data: mealData, loading } = useGet(`/api/meal/${recipeId}`)

  // const onTab1Change = (key) => {
  //     setActiveTab(key)
  // }

  console.log(mealData)

  const footerButtons =
        [
            <Button
                key='back'
                onClick={handleCloseModal}
            >
                Exit
            </Button>
        ]

  return (
        <>
            {
                <Modal
                    title={loading ? <Skeleton loading paragraph={{ rows: 0 }} /> : `${mealData.name} Details`}
                    visible={visible}
                    onCancel={handleCloseModal}
                    footer={footerButtons}
                >
                    {
                        loading
                          ? <Skeleton loading />
                          : <Card
                                style={{
                                  width: '100%'
                                }}
                                bordered={false}
                            // tabList={tabList}
                            // activeTabKey={activeTab}
                            // onTabChange={(key) => {
                            //     onTab1Change(key)
                            // }}
                            >
                                {
                                    mealData?.breakfast?.ingredients?.map((ingredient, i) => (
                                        <div key={`breakfast_ingredient_${i}`}>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.breakfast?.recipes?.map((ingredient, i) => (
                                        <div key={`breakfast_recipe_${i}`}>{ingredient.recipeId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.lunch?.ingredients?.map((ingredient, i) => (
                                        <div  key={`lunch_ingredient_${i}`}>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.lunch?.recipes?.map((ingredient, i) => (
                                        <div key={`lunch_recipe_${i}`}>{ingredient.recipeId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.dinner?.ingredients?.map((ingredient, i) => (
                                        <div key={`dinner_ingredient_${i}`}>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.dinner?.recipes?.map((ingredient, i) => (
                                        <div key={`dinner_recipe_${i}`}>{ingredient.recipeId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.snacks?.ingredients?.map((ingredient, i) => (
                                        <div key={`snacks_ingredient_${i}`}>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.snacks?.recipes?.map((ingredient, i) => (
                                        <div key={`snacks_ingredient_${i}`}>{ingredient.recipeId.name}</div>
                                    ))
                                }
                                <NutrientsChart nutrients={{ calories: mealData?.calories, carbs: mealData?.carbs, protein: mealData?.protein, fat: mealData?.fat, sodium: mealData?.sodium }} />
                            </Card>
                    }
                </Modal>
            }
        </>
  )
}

export default MealPlanModal
