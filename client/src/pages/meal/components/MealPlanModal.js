import { useState } from 'react'
import { Modal, Skeleton, Button } from 'antd'
import { useGet } from '../../../utils/API'
import { Card } from 'antd'
import NutrientsChart from '../../../components/NutrientsChart'

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
    const { data: mealData, loading } = useGet(`/api/meals/${recipeId}`)

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
                        loading ?
                            <Skeleton loading />
                            :
                            <Card
                                style={{
                                    width: '100%',
                                }}
                                bordered={false}
                            // tabList={tabList}
                            // activeTabKey={activeTab}
                            // onTabChange={(key) => {
                            //     onTab1Change(key)
                            // }}
                            >
                                {
                                    mealData?.breakfast?.ingredients?.map(ingredient => (
                                        <div>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.breakfast?.recipes?.map(ingredient => (
                                        <div>{ingredient.recipeId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.lunch?.ingredients?.map(ingredient => (
                                        <div>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.lunch?.recipes?.map(ingredient => (
                                        <div>{ingredient.recipeId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.dinner?.ingredients?.map(ingredient => (
                                        <div>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.dinner?.recipes?.map(ingredient => (
                                        <div>{ingredient.recipeId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.snacks?.ingredients?.map(ingredient => (
                                        <div>{ingredient.foodId.name}</div>
                                    ))
                                }
                                {
                                    mealData?.snacks?.recipes?.map(ingredient => (
                                        <div>{ingredient.recipeId.name}</div>
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