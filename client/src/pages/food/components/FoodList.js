// React
import { useState } from 'react';
// Components
import LoadingCards from '../../../components/LoadingCards'
import FoodModal from './FoodModal';
import NutrientsRow from '../../../components/NutrientsRow';
// Antd
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const FoodList = ({ loading, foodData }) => {
    const [selectedFoodId, setSelectedFoodId] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    const handleOnClick = (foodId) => {
        handleToggleModal()
        setSelectedFoodId(foodId)
    }

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <>
            {
                loading ?
                    <LoadingCards number={12} />
                    :
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