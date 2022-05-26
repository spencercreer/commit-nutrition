import { useState, useEffect } from 'react'
import { Select, InputNumber, Button, Row, Col, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Option } = Select

const IngredientRow = ({ foods, index, edit, recipeFormData, setRecipeFormData }) => {
    const [food, setFood] = useState(recipeFormData[index])
    const [servings, setServings] = useState(food.servings)

    function onFoodChange(value) {
        setFood(foods[parseInt(value.key)])
        setRecipeFormData((data) => [...data.slice(0, index), { ...foods[parseInt(value.key)]}, ...data.slice(index + 1)])
    }

    function onServingChange(value) {
        setServings(value)
    }

    return (
        <Row>
            <Col xs={14}>
                <Select
                    style={{ width: '60%' }}
                    showSearch
                    placeholder="Food"
                    optionFilterProp="children"
                    labelInValue
                    defaultValue={food?.name}
                    disabled={!edit}
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
                <Input
                    style={{ width: '20%' }}
                    placeholder="Serving Size"
                    optionFilterProp="children"
                    value={food?.serving_size}
                    disabled
                />
                <InputNumber
                    style={{ width: '20%' }}
                    placeholder="Number of Servings"
                    value={servings}
                    disabled={!edit}
                    onChange={onServingChange}
                />
            </Col>
            <Col xs={8}>
                <Row>
                    <Col md={5}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="g"
                            value={food?.carbs * servings}
                            disabled
                        />
                    </Col>
                    <Col md={5}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="g"
                            value={food?.protein * servings}
                            disabled
                        />
                    </Col>
                    <Col md={5}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="g"
                            value={food?.fat * servings}
                            disabled
                        />
                    </Col>
                    <Col md={5}>
                        <InputNumber
                            style={{ marginRight: '5px' }}
                            addonAfter="mg"
                            value={food?.sodium * servings}
                            disabled
                        />
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default IngredientRow