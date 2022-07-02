import { useState } from 'react';
import LoadingCards from '../../../components/LoadingCards'
import FoodModal from './FoodModal';
// Antd
import { Card, Input } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { useFilterGet } from '../../../utils/API'
import NutrientsRow from '../../../components/NutrientsRow';

const FoodList = () => {
    const [selectedFoodId, setSelectedFoodId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [{ data: foodData, loading }, filterFoods] = useFilterGet('/api/foods')

    const handleOnClick = (foodId) => {
        handleToggleModal()
        setSelectedFoodId(foodId)
    }

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleOnChange = (event) => {
        const filter = event.target.value;
        filterFoods(filter)
    }

    return (
        <>
            {
                loading ?
                    <LoadingCards number={12} />
                    :
                    <>
                        <Input
                            onChange={handleOnChange}
                        />
                        {
                            foodData?.map((food, i) => (
                                <Card
                                    key={i}
                                    title={<div>{food.name}</div>}
                                    actions={[
                                        <EllipsisOutlined
                                            key='ellipsis'
                                            onClick={() => handleOnClick(food._id)}
                                        />,
                                        <EditOutlined
                                            key='edit'
                                        />
                                    ]}
                                >
                                    <p>{food.serving?.calories} cal, {food.serving?.size} {food.serving?.unit}</p>
                                    <NutrientsRow
                                        nutrients={{ calories: food.serving?.calories, carbs: food.serving?.carbs, protein: food.serving?.protein, fat: food.serving?.fat, sodium: food.serving?.sodium }}
                                    />
                                </Card>
                            ))
                        }
                    </>
            }
            {
                selectedFoodId &&
                <FoodModal
                    foodId={selectedFoodId}
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            }
        </>
    )
}

export default FoodList