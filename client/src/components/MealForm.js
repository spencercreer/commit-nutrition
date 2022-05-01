import { useState, useEffect } from 'react'
import { Col, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddIngredientRow from './AddIngredientRow'
import IngredientRow from './IngredientRow'
// Utils
import { getFoods } from '../utils/API'

const MealForm = () => {
    const [mealFormData, setMealFormData] = useState([])
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
            <div style={{ margin: '10px' }}>
                <AddIngredientRow
                    foods={foods}
                    setMealFormData={setMealFormData}
                />
                {/* Should I make addIngredientRow and IngredientRow the same? */}
            </div>
            <div style={{ margin: '10px' }}>
                {
                    mealFormData.map((data, i) => (
                        <IngredientRow
                            key={i}
                            index={i}
                            foods={foods}
                            edit={false}
                            mealFormData={mealFormData}
                            setMealFormData={setMealFormData}
                        />
                    ))
                }
            </div>
            <Col sm={2}>
                {/* <Button
                    style={{ marginRight: '5px' }}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addRow}
                /> */}
            </Col>
        </>
    )
}

export default MealForm