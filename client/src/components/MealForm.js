import { useState, useEffect } from 'react'
import { Col, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import IngredientRow from './IngredientRow'

import { getFoods } from '../utils/API'

const MealForm = () => {
    const [mealFormData, setMealFormData] = useState([
        {
            name: null,
            description: null,
            calories: null,
            carbs: null,
            protein: null,
            fat: null,
            sodium: null
        }
    ])
    const [foods, setFoods] = useState()

    useEffect(() => {
        let mounted = true;
        getFoods()
            .then(res => res.json())
            .then(items => {
                console.log(items)
                if (mounted) {
                    setFoods(items)
                }
            })
        return () => mounted = false;
    }, [])

    function onSearch(val) {
        console.log('search:', val)
    }

    function addRow() {
        const newRow = {
            name: null,
            description: null,
            calories: null,
            carbs: null,
            protein: null,
            fat: null,
            sodium: null
        }
        setMealFormData(data => [...data, newRow])
    }
    return (
        <>
            {
                mealFormData.map((data, i) => (
                    <IngredientRow
                        key={i}
                        foods={foods}
                    />
                ))
            }
            <Col sm={2}>
                <Button
                    style={{ marginRight: '5px' }}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={addRow}
                />
            </Col>
        </>
    )
}

export default MealForm