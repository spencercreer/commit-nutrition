// React
import { useState } from 'react'
// Antd
import { Modal, Form, Input, InputNumber, Select, message, Alert, Button } from 'antd'
// Utils
import { usePost } from '../../../utils/API'
import { validateMessages, layout, foodCategories } from '../../../utils/form'

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
                name='add-student'
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Item name={'name'} label='Food Name' rules={[{ required: true }]}>
                    <Input />
                </Item>
                <Item name={'description'} label='Description'>
                    <Input />
                </Item>
                <Item label='Serving Size'>
                    <Group compact>
                        <Item name={['serving', 'size']} noStyle rules={[{ required: true, message: 'Serving Size is required' }]}>
                            <InputNumber
                                placeholder='size'
                            />
                        </Item>
                        <Item name={['serving', 'unit']} style={{ width: '100px', margin: '0px' }}>
                            <Input
                                placeholder='unit'
                            />
                        </Item>
                    </Group>
                </Item>
                <Item name={['serving', 'calories']} label='Calories' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='cal'
                    />
                </Item>
                <Item name={['serving', 'carbs']} label='Carbs' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='g'
                    />
                </Item>
                <Item name={['serving', 'protein']} label='Protein' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='g'
                    />
                </Item>
                <Item name={['serving', 'fat']} label='Fat' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='g'
                    />
                </Item>
                <Item name={['serving', 'sodium']} label='Sodium'>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='mg'
                    />
                </Item>
                <Item name={'category'} label='Category'>
                    <Select
                        showSearch
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