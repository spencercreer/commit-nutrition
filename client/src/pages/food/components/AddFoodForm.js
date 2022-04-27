// Antd
import { Modal, Form, Input, Select, DatePicker, message, Alert, Button } from 'antd'
// Utils
import { createFood } from '../../../utils/API'
import { validateMessages, layout } from '../../../utils/form'

const { Item } = Form
const { Option } = Select

const AddFoodForm = () => {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        console.log(values)
        createFood(values)
            .then(res => console.log(res))
    }

    return (
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
            <Item name={'calories'} label='Calories' rules={[{ required: true }]}>
                <Input />
            </Item>
            <Item name={'carbs'} label='Carbs' rules={[{ required: true }]}>
                <Input />
            </Item>
            <Item name={'protein'} label='Protein' rules={[{ required: true }]}>
                <Input />
            </Item>
            <Item name={'fat'} label='Fat' rules={[{ required: true }]}>
                <Input />
            </Item>
            <Item name={'sodium'} label='Sodium'>
                <Input />
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
    )
}

export default AddFoodForm