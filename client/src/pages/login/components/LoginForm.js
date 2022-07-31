import { Link } from 'react-router-dom'
// Antd
import { Button, Form, Input } from 'antd'

const { Item } = Form
const { Password } = Input

const LoginForm = () => {

    const onFinish = (values) => {
        console.log('Success:', values)
        window.location.replace('/')
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            name='login'
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Item
                label='Username'
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Item>
            <Item
                label='Password'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Password />
            </Item>
            <Item
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                <Button type='primary' htmlType='submit'>
                    Log In
                </Button>
                <Link to={'/signup'} style={{marginLeft: '10px'}}>
                    Sign Up
                </Link>
            </Item>
        </Form>
    )
}

export default LoginForm
