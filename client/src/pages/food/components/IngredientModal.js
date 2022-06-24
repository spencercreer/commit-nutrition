import { Modal, Form, Input, Skeleton, Select, Button } from 'antd'
import NutrientsChart from '../../../components/NutrientsChart'
import NutrientsRow from '../../../components/NutrientsRow'
import { useGet } from '../../../utils/API'

const IngredientModal = ({ recipeId, visible, handleCloseModal }) => {
    const { data: recipeData, loading } = useGet(`/api/recipes/${recipeId}`)

    console.log(recipeData)

    const footerButtons =
        [
            <Button
                key='back'
                onClick={handleCloseModal}
            >
                Exit
            </Button>,
            <Button
                key='submit'
                type='primary'
                htmlType='submit'
                style={{ width: '125px' }}
            // loading={loading}
            // onClick={() => form.submit()}
            >
                Submit
            </Button>,
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
                            recipeData.ingredients.map((food, i) => (
                                <div key={i}>{food?.foodId?.serving.size} {food?.foodId?.serving.unit} {food?.foodId?.name}</div>
                            ))
                    }
                    <NutrientsChart nutrients={{ calories: recipeData?.calories, carbs: recipeData?.carbs, protein: recipeData?.protein, fat: recipeData?.fat, sodium: recipeData?.sodium }} />
                    <NutrientsRow
                        nutrients={{ calories: recipeData?.calories, carbs: recipeData?.carbs, protein: recipeData?.protein, fat: recipeData?.fat, sodium: recipeData?.sodium }}
                    />
                    </Modal>
            }
        </>
    )

}

export default IngredientModal
