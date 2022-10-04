import React from 'react'
import { Modal, Skeleton, Button } from 'antd'
import NutrientsChart from '../../components/NutrientsChart'
import NutrientsRow from '../../components/NutrientsRow'
import { useGet } from '../../../utils/API'

const FoodModal = ({ foodId, visible, handleCloseModal }) => {
  const { data: foodData, loading } = useGet(`/api/foods/${foodId}`)

  console.log(foodData)

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
                    title={loading ? <Skeleton loading paragraph={{ rows: 0 }} /> : `${foodData.name} Details`}
                    visible={visible}
                    onCancel={handleCloseModal}
                    footer={footerButtons}
                >
                    {
                        loading
                          ? <Skeleton loading />
                          : <NutrientsChart nutrients={{ calories: foodData?.serving.calories, carbs: foodData?.serving.carbs, protein: foodData?.serving.protein, fat: foodData?.serving.fat, sodium: foodData?.serving.sodium }} />
                    }
                    <NutrientsRow
                        nutrients={{ calories: foodData?.serving.calories, carbs: foodData?.serving.carbs, protein: foodData?.serving.protein, fat: foodData?.serving.fat, sodium: foodData?.serving.sodium }}
                    />
                </Modal>
            }
        </>
  )
}

export default FoodModal
