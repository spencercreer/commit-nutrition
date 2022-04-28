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
                console.log(items)
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
              
            </Card>
        ))}
        </>
    )
}

export default FoodList