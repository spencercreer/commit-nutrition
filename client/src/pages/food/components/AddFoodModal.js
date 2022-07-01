// React
import { useState } from 'react'
// Antd
import { Modal, Form, Input, InputNumber, Select, AutoComplete, message, Alert, Button } from 'antd'
// Utils
import { usePost } from '../../../utils/API'
import { validateMessages, layout, foodCategories, servingUnits } from '../../../utils/form'

const { Item } = Form
const { Group } = Input
const { Option } = Select

const AddFoodModal = ({ visible, handleCloseModal }) => {
    const [form] = Form.useForm()
    const [alert, setAlert] = useState()
    const [createFood] = usePost('/api/foods')

    const onFinish = async (values) => {
        createFood(values)
            .then(res => {
                console.log(res)

                message.success(`${res.name} added successfully!`)
                form.resetFields()
                setAlert(null)
            })
            .catch(err => {
                setAlert('We were not able to save this food. Please try again.')
                console.log(err)
            })
    }

    const footerButtons =
        [
            <Button
                key='back'
                onClick={handleCloseModal}
            >
                Exit
            </Button>,
            <Button
                key='submit'
                type='primary'
                htmlType='submit'
                style={{ width: '125px' }}
                // loading={loading}
                onClick={() => form.submit()}
            >
                Submit
            </Button>,
        ]

    return (
        <Modal
            title={'Add Food'}
            visible={visible}
            onCancel={handleCloseModal}
            footer={footerButtons}
        >
            <Form
                {...layout}
                form={form}
                name='add-food'
                onFinish={onFinish}
            >
                <Item
                    name='name'
                    rules={validateMessages('Food Name')}
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
                            rules={validateMessages('Serving Size')}
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
                    rules={validateMessages('Calories')}
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
                    rules={validateMessages('Carbs')}
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
                    rules={validateMessages('Serving Size')}
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
                    rules={validateMessages('Calories')}
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
        </Modal>
    )
}

export default AddFoodModal