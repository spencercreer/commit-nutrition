import { useState, useEffect } from 'react'
import { Select, InputNumber, Row, Col, Input } from 'antd'

const { Option } = Select

const IngredientRow = ({ foods }) => {
    const [food, setFood] = useState()
    const [servings, setServings] = useState(1)

    function onFoodChange(value) {
        setFood(foods[parseInt(value.key)])
    }

    function onServingChange(value) {
        setServings(value)
    }

    const carbs = food?.carbs * servings
    const protein = food?.protein * servings
    const fat = food?.fat * servings
    const sodium = food?.sodium * servings

    return (
        <Row>
            <Col xs={18}>
                <Select
                    style={{ width: '300px' }}
                    showSearch
                    placeholder="Food"
                    optionFilterProp="children"
                    labelInValue
                    onChange={onFoodChange}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        foods?.map((food, i) => (
                            <Option key={i} value={food?.name}>{food?.name}</Option>
                        ))
                    }
                </Select>
                <Select
                    style={{ width: '150px' }}
                    showSearch
                    placeholder="Serving Size"
                    optionFilterProp="children"
                    labelInValue
                    // onChange={onChange}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        foods?.map((food, i) => (
                            <Option key={i} value={food?.name}>{food?.name}</Option>
                        ))
                    }
                </Select>
                <InputNumber
                    style={{ width: '150px' }}
                    placeholder="Number of Servings"
                    defaultValue={1}
                    onChange={onServingChange}
                    
                />
            </Col>
            <Col xs={6}>
                <Row>
                    <Col md={6}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="g"
                            value={carbs}
                            disabled
                        />
                    </Col>
                    <Col md={6}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="g"
                            value={protein}
                            disabled
                        />
                    </Col>
                    <Col md={6}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="g"
                            value={fat}
                            disabled
                        />
                    </Col>
                    <Col md={6}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="mg"
                            value={food?.sodium}
                            disabled
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default IngredientRow