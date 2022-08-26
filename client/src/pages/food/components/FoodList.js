// React
import { useState } from 'react';
// Components
import LoadingCards from '../../components/LoadingCards'
import FoodModal from './FoodModal';
import EditFoodModal from './EditFoodModal';
import NutrientsRow from '../../components/NutrientsRow';
// Antd
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const FoodList = ({ loading, foodData }) => {
    const [selectedFoodId, setSelectedFoodId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)

    const handleOnClick = (foodId) => {
        toggleModal()
        setSelectedFoodId(foodId)
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleEditClick = (foodId) => {
        toggleEditModal()
        setSelectedFoodId(foodId)
    }

    const toggleEditModal = () => {
        setEditModalVisible(!editModalVisible)
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
                                    onClick={() => handleEditClick(food._id)}
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
                <>
                    {/* Combine add, update, and food modals into one */}
                    <FoodModal
                        foodId={selectedFoodId}
                        visible={modalVisible}
                        handleCloseModal={toggleModal}
                    />
                    <EditFoodModal
                        foodId={selectedFoodId}
                        visible={editModalVisible}
                        handleCloseModal={toggleEditModal}
                    />
                </>
            }
        </>
    )
}

export default FoodList