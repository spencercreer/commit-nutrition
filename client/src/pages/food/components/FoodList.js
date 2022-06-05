import LoadingCards from '../../../components/LoadingCards'
// Antd
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { useGet } from '../../../utils/API'

const FoodList = () => {

    const { data: foodData, loading } = useGet('/api/foods')

    return (
        <>
            {
                loading ?
                    <LoadingCards />
                    :
                    foodData?.map((food, i) => (
                        <Card
                            key={i}
                            title={<div>{food.name}</div>}
                            actions={[
                                <EllipsisOutlined
                                    key='ellipsis'
                                    // onClick={() => handleOnClick(false)}
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
                            <p>Calories: {food.calories} cal</p>
                            <p>Carbs: {food.carbs} g</p>
                            <p>Protein: {food.protein} g</p>
                            <p>Fat: {food.fat} g</p>
                            <p>Sodium: {food.sodium} mg</p>
                        </Card>
                    ))
            }
        </>
    )
}

export default FoodList