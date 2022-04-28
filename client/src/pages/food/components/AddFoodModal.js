// Antd
import { Modal, Form, Input, InputNumber, Select, DatePicker, message, Alert, Button } from 'antd'
// Utils
import { createFood } from '../../../utils/API'
import { validateMessages, layout } from '../../../utils/form'

const { Item } = Form
const { Group } = Input
const { Option } = Select

const AddFoodModal = ({ visible, handleCloseModal }) => {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        console.log(values)
        createFood(values)
            .then(res => console.log(res))
    }

    return (
        <Modal
            title={'Add Food'}
            visible={visible}
            onCancel={handleCloseModal}
        // footer={footerButtons}
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
                        <Item name={['serving_size', 'size']} noStyle rules={[{ required: true, message: 'Serving Size is required' }]}>
                            <InputNumber />
                        </Item>
                        <Item name={['serving_size', 'unit']} style={{ width: '100px', margin: '0px' }}>
                            <Input placeholder='Unit' />
                        </Item>
                    </Group>
                </Item>
                <Item name={'calories'} label='Calories' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='cal'
                    />
                </Item>
                <Item name={'carbs'} label='Carbs' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='g'
                    />
                </Item>
                <Item name={'protein'} label='Protein' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='g'
                    />
                </Item>
                <Item name={'fat'} label='Fat' rules={[{ required: true }]}>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='g'
                    />
                </Item>
                <Item name={'sodium'} label='Sodium'>
                    <InputNumber
                        min="0"
                        step="0.1"
                        addonAfter='mg'
                    />
                </Item>

                <Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Item>
                {
                    alert?.error && <Alert message={alert.text} type='error' />
                }
            </Form>
        </Modal>
    )
}

export default AddFoodModal