import { useState, useEffect } from 'react'
import { Select, InputNumber, Row, Col, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getFoods } from '../utils/API'

const { Option } = Select

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
    const [foodData, setFoodData] = useState()

    useEffect(() => {
        let mounted = true;
        getFoods()
            .then(res => res.json())
            .then(items => {
                console.log(items)
                if (mounted) {
                    setFoodData(items)
                }
            })
        return () => mounted = false;
    }, [])

    function onChange(value) {
        console.log(`selected ${value}`)
    }

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
                mealFormData.map((data) => (
                    <Row>
                        <Col sm={6}>
                            <Select
                                style={{width: '150px'}}
                                showSearch
                                placeholder="Food"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    foodData.map((food, i) => (
                                        <Option key= {i} value={food.name}>{food.name}</Option>

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