// Antd
import { Card } from 'antd'
// Utils
import { useGet } from '../../../utils/API'

const FoodList = () => {

    const { data: foodData, loading } = useGet('/api/foods')

    return (
        <>
            {
                //TODO: Make loading cards
                loading ? <div>Loading...</div>
                    :
                    foodData?.map(food => (
                        <Card title={<div>{food.name}</div>}>
                            <p>Calories: {food.calories}</p>
                            <p>Carbs: {food.carbs}</p>
                            <p>Protein: {food.protein}</p>
                            <p>Fat: {food.fat}</p>
                            <p>Sodium: {food.sodium}</p>
                        </Card>
                    ))
            }
        </>
    )
}

export default FoodList