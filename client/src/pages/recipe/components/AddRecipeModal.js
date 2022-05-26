// React
import { useState } from 'react'
// Antd
import { Modal, Form, Input, InputNumber, Select, message, Alert, Button } from 'antd'
// Utils
// import { createFood } from '../../../utils/API'
import { validateMessages, layout } from '../../../utils/form'
import RecipeForm from './RecipeForm'

const { Item } = Form
const { Group } = Input
const { Option } = Select

const AddRecipeModal = ({ visible, handleCloseModal }) => {
  const [form] = Form.useForm()
  const [alert, setAlert] = useState()

  const onFinish = async (values) => {
    console.log(values)
    // createFood(values)
      .then(res => {
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
      title={'Add Recipe'}
      visible={visible}
      onCancel={handleCloseModal}
      footer={footerButtons}
      width={1000}
    >
      {/* <Form
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
              <InputNumber
                placeholder='size'
              />
            </Item>
            <Item name={['serving_size', 'unit']} style={{ width: '100px', margin: '0px' }}>
              <Input
                placeholder='unit'
              />
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
        <Item name={'category'} label='Category'>
          <Select
            showSearch
            optionFilterProp="children"
            labelInValue
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value={'vegetables'} >Vegetables</Option>
            <Option value={'fruits'} >Fruits</Option>
            <Option value={'grains'} >Grains</Option>
            <Option value={'meat'} >Meat</Option>
            <Option value={'dairy'} >Dairy</Option>
            <Option value={'fats'} >Oils & Fats</Option>
            <Option value={'seasoning'} >Seasonings</Option>
            <Option value={'other'} >Other</Option>
          </Select>
        </Item>
        {
          alert && <Alert message={alert} type='error' />
        }
      </Form> */}
      <RecipeForm />

    </Modal>
  )
}

export default AddRecipeModal