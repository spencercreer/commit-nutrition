// React
import React, { useState } from 'react'
// Antd
import { Form, Input, InputNumber, Select, AutoComplete, Alert } from 'antd'

const { Item } = Form
const { Group } = Input
const { Option } = Select

const EditFoodModal = () => {
  const [form] = Form.useForm()
  const [alert, setAlert] = useState()

  const onFinish = async (values) => {
    // form.setFieldsValue()
    console.log(values)
  }

  return (
        <Form
            // {...layout}
            form={form}
            name='user-info'
            onFinish={onFinish}
            // initialValues={foodData}
        >
            <Item
                name='name'
                // rules={validateMessages('Food Name')}
            >
                <Input
                    placeholder='Food Name'
                />
            </Item>
            <Item name='description'>
                <Input
                    placeholder='Description'
                />
            </Item>
            <Item>
                <Group compact>
                    <Item
                        name={['serving', 'size']}
                        noStyle
                        // rules={validateMessages('Serving Size')}
                    >
                        <InputNumber
                            style={{ width: '50%' }}
                            min="0"
                            placeholder='Serving Size'
                        />
                    </Item>
                    <Item
                        name={['serving', 'unit']}
                        noStyle
                    >
                        <AutoComplete
                            style={{ width: '50%' }}
                            placeholder='Unit'
                            options={servingUnits}
                            filterOption={(inputValue, option) =>
                              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Item>
                </Group>
            </Item>
            <Item
                name={['serving', 'calories']}
                // rules={validateMessages('Calories')}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min="0"
                    step="0.1"
                    addonBefore='Calories'
                    addonAfter='cal'
                />
            </Item>
            <Item
                name={['serving', 'carbs']}
                // rules={validateMessages('Carbs')}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min="0"
                    step="0.1"
                    addonBefore='Carbs'
                    addonAfter='g'
                />
            </Item>
            <Item
                name={['serving', 'protein']}
                // rules={validateMessages('Serving Size')}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min="0"
                    step="0.1"
                    addonBefore='Protein'
                    addonAfter='g'
                />
            </Item>
            <Item
                name={['serving', 'fat']}
                // rules={validateMessages('Calories')}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min="0"
                    step="0.1"
                    addonBefore='Fat'
                    addonAfter='g'
                />
            </Item>
            <Item
                name={['serving', 'sodium']}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min="0"
                    step="0.1"
                    addonBefore='Sodium'
                    addonAfter='mg'
                />
            </Item>
            <Item name='category'>
                <Select
                    showSearch
                    placeholder='Category'
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        foodCategories.map((foodCategory, i) => (
                            <Option
                                key={i}
                                value={foodCategory.value}
                            >
                                {foodCategory.label}
                            </Option>
                        ))
                    }
                </Select>
            </Item>
            {
                alert && <Alert message={alert} type='error' />
            }
        </Form>
  )
}

export default EditFoodModal
