// React
import { useState, useEffect } from 'react'
import { Card } from 'antd'
// Utils
import { getFoods } from '../../../utils/API'

const FoodList = () => {
    const [foods, setFoods] = useState()

    useEffect(() => {
        let mounted = true;
        getFoods()
            .then(items => {
                if (mounted) {
                    setFoods(items)
                }
            })
        return () => mounted = false;
    }, [])

    return (
        <>
            {foods?.map(food => (
                <Card title={<div>{food.name}</div>}>
                    <p>Calories: {food.calories}</p>
                    <p>Carbs: {food.carbs}</p>
                    <p>Protein: {food.protein}</p>
                    <p>Fat: {food.fat}</p>
                    <p>Sodium: {food.sodium}</p>
                </Card>
            ))}
        </>
    )
}

export default FoodList