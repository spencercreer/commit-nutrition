import { useState } from 'react'
import { Select, InputNumber, Row, Col } from 'antd'

const { Option } = Select

const IngredientRow = ({ foods }) => {

    const [foodData, setFoodData] = useState()
    
    function onChange(value) {
        console.log(`selected ${value}`)
    }

    return (
        <Row>
            <Col sm={6}>
                <Select
                    style={{ width: '150px' }}
                    showSearch
                    placeholder="Food"
                    optionFilterProp="children"
                    onChange={onChange}
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
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="g"
                    step="0.01"
                    disabled
                />
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="g"
                    step="0.01"
                    disabled
                />
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="g"
                    step="0.01"
                    disabled
                />
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="mg"
                    step="0.01"
                    disabled
                />
            </Col>
        </Row>
    )
}

export default IngredientRow