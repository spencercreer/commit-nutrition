import { useState } from 'react'
import { Modal, Skeleton, Button } from 'antd'
import NutrientsChart from '../../../components/NutrientsChart'
import RecipeDetails from '../../../components/RecipeDetails'
import ServingDetails from '../../../components/ServingDetails'
import { useGet } from '../../../utils/API'
import { Card } from 'antd'

const tabList = [
    {
        key: 'recipe',
        tab: 'Recipe',
    },
    {
        key: 'serving',
        tab: 'Serving',
    },
]

const IngredientModal = ({ recipeId, visible, handleCloseModal }) => {
    const [activeTab, setActiveTab] = useState('recipe')
    const { data: recipeData, loading } = useGet(`/api/recipe/${recipeId}`)

    const onTab1Change = (key) => {
        setActiveTab(key)
    }

    console.log(recipeData)

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
                    title={loading ? <Skeleton loading paragraph={{ rows: 0 }} /> : `${recipeData.name} Details`}
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
                                tabList={tabList}
                                activeTabKey={activeTab}
                                onTabChange={(key) => {
                                    onTab1Change(key)
                                }}
                            >
                                {
                                    activeTab === 'recipe' ?
                                        <RecipeDetails recipeData={recipeData} />
                                        :
                                        <ServingDetails recipeData={recipeData} />
                                }
                                {/* make this different when loading */}
                                <NutrientsChart nutrients={{ calories: recipeData?.calories, carbs: recipeData?.carbs, protein: recipeData?.protein, fat: recipeData?.fat, sodium: recipeData?.sodium }} />
                            </Card>
                    }
                </Modal>
            }
        </>
    )
}

export default IngredientModal
