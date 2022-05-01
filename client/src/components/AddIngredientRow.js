import { useState, useEffect } from 'react'
import { Select, InputNumber, Button, Row, Col, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Option } = Select

const AddIngredientRow = ({ foods, setMealFormData }) => {
    const [food, setFood] = useState()
    const [servings, setServings] = useState()

    function onFoodChange(value) {
        setFood(foods[parseInt(value.key)])
    }

    function onServingChange(value) {
        setServings(value)
    }

    function addRow() {
        const newRow = {
            ...food, servings
        }
        setMealFormData(data => [...data, newRow])
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
                        <Button
                            style={{ marginRight: '5px' }}
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={addRow}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AddIngredientRow