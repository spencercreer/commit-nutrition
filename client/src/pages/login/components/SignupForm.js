// React
import React, { Link } from 'react-router-dom'
// Antd
import { Button, Form, Input } from 'antd'
// Utils
import { usePost } from '../../../utils/API'

const { Item } = Form
const { Password } = Input

const SignupForm = () => {
  const [createUser] = usePost('/api/user')

  const onFinish = (values) => {
    console.log(values)
    createUser(values)
      .then(res => {
        if (!res.success) {
          alert('We experienced an error with your signup. Please try again.')
        } else {
          window.location.replace('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
        <Form
            name='login'
            labelCol={{
              span: 4
            }}
            wrapperCol={{
              span: 16
            }}
            initialValues={{
              remember: true
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
                    message: 'Please input your username!'
                  }
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
                    message: 'Please input your password!'
                  }
                ]}
            >
                <Password />
            </Item>
            <Item
                wrapperCol={{
                  offset: 4,
                  span: 16
                }}
            >
                <Button type='primary' htmlType='submit'>
                    Sign Up
                </Button>
                <Link to={'/login'} style={{ marginLeft: '10px' }}>
                    Log In
                </Link>
            </Item>
        </Form>
  )
}

export default SignupForm
