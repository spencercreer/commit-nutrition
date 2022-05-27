import { useState, useEffect } from 'react'
import { Row, Col, Button, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddIngredientRow from '../pages/recipe/components/AddIngredientRow'
import IngredientRow from '../pages/recipe/components/IngredientRow'
// Utils
import { useGet } from '../utils/API'

const MealForm = () => {
    const [mealFormData, setMealFormData] = useState([])

    const { data: foodData, loading }  = useGet('/api/foods')

    return (
        <>
            <div style={{ margin: '10px' }}>
                <AddIngredientRow
                    foods={foodData}
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
                            foods={foodData}
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