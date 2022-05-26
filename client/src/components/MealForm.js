import { useState, useEffect } from 'react'
import { Row, Col, Button, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddIngredientRow from '../pages/recipe/components/AddIngredientRow'
import IngredientRow from '../pages/recipe/components/IngredientRow'
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
                <Row>
                    <Col xs={14}>
                    </Col>
                    <Col xs={8}>
                        <Row>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="g"
                                    // value={food?.carbs * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="g"
                                    // value={food?.protein * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="g"
                                    // value={food?.fat * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={5}>
                                <InputNumber
                                    style={{ marginRight: '5px' }}
                                    addonAfter="mg"
                                    // value={food?.sodium * servings}
                                    disabled
                                />
                            </Col>
                            <Col md={4}>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default MealForm