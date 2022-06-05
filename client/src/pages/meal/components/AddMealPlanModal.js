import { useState } from 'react'
import { Modal, Row, Button, Form, Input, InputNumber, Select, Space, Alert, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// Utils
import { useGet, usePost } from '../../../utils/API'

const { Item } = Form
const { Option } = Select;

const AddMealPlanModal = ({ visible, handleCloseModal }) => {
  const [recipeData, setRecipeData] = useState([])
  const [form] = Form.useForm()
  const [recipeNutrients, setRecipeNutrients] = useState({ calories: null, carbs: null, protein: null, fat: null, sodium: null })
  const { data: foodData } = useGet('/api/foods')
  const [createRecipe] = usePost('/api/recipes')
  const [alert, setAlert] = useState()

  const onFinish = (values) => {
    createRecipe({ ...values, calories: recipeNutrients.calories, carbs: recipeNutrients.carbs, protein: recipeNutrients.protein, fat: recipeNutrients.fat, sodium: recipeNutrients.sodium })
      .then(res => {
        message.success(`${res.name} added successfully!`)
        form.resetFields()
        setAlert(null)
        setRecipeNutrients({ calories: null, carbs: null, protein: null, fat: null, sodium: null })
      })
      .catch(err => {
        setAlert('We were not able to save this recipe. Please try again.')
        console.log(err)
      })
  };

  const handleIngredientChange = () => {
    let { ingredients } = form.getFieldsValue()
    ingredients = ingredients.map(ingredient => {
      if (ingredient.foodId && ingredient.number_of_servings) {
        const food = foodData.find((food) => food._id === ingredient.foodId)
        const servings = ingredient.number_of_servings
        const calories = food.calories * servings
        const carbs = food.carbs * servings
        const protein = food.protein * servings
        const fat = food.fat * servings
        const sodium = food.sodium * servings
        return { ...food, calories, carbs, protein, fat, sodium, number_of_servings: servings }
      } else if (ingredient.foodId) {
        const food = foodData.find((food) => food._id === ingredient.foodId)
        return food
      } else {
        return ingredient
      }
    })

    let recipeCal = 0, recipeCarbs = 0, recipeProtein = 0, recipeFat = 0, recipeSodium = 0
    ingredients.forEach(ingredient => {
      if (ingredient._id && ingredient.number_of_servings) {
        recipeCal += ingredient.calories
        recipeCarbs += ingredient.carbs
        recipeProtein += ingredient.protein
        recipeFat += ingredient.fat
        recipeSodium += ingredient.sodium
      }
    })
    setRecipeNutrients({ calories: recipeCal, carbs: recipeCarbs, protein: recipeProtein, fat: recipeFat, sodium: recipeSodium })
    setRecipeData(ingredients)
  }

  // const formItemLayoutWithOutLabel = {
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //       offset: 0,
  //     }
  //   },
  // };

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
      title={'Create Meal Plan'}
      visible={visible}
      onCancel={handleCloseModal}
      footer={footerButtons}
      width={1000}
    >
      <>
        <Form
          // {...formItemLayoutWithOutLabel}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Item label='Breakfast'>
          <Form.List
              name="breakfast"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Row>
                        <Item
                          key={'food'}
                          name={[field.name, 'foodId']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing food',
                            },
                          ]}
                          style={{ width: '60%', }}
                        >
                          <Select
                            showSearch
                            placeholder="Food"
                            onChange={handleIngredientChange}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {foodData.map((food, i) => (
                              <Option key={i} value={food._id}>
                                {food.name}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                        <Item>
                          <Input
                            placeholder="Serving Size"
                            value={recipeData[field.key] ? `${recipeData[field.key].serving_size?.size} ${recipeData[field.key].serving_size?.unit}` : null}
                            disabled
                          />
                        </Item>
                        <Item
                          name={[field.name, 'number_of_servings']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing number of servings',
                            },
                          ]}
                        // style={{ width: '20%' }}
                        >
                          <InputNumber
                            placeholder="Number of Servings"
                            onChange={handleIngredientChange}
                          />
                        </Item>
                        <Item>
                          <MinusCircleOutlined onClick={() => {
                            remove(field.name)
                            handleIngredientChange()
                          }} />
                        </Item>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Breakfast Ingredient
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          </Item>
          <Item label='Lunch'>
          <Form.List
              name="lunch"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Row>
                        <Item
                          key={'food'}
                          name={[field.name, 'foodId']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing food',
                            },
                          ]}
                          style={{ width: '60%', }}
                        >
                          <Select
                            showSearch
                            placeholder="Food"
                            onChange={handleIngredientChange}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {foodData.map((food, i) => (
                              <Option key={i} value={food._id}>
                                {food.name}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                        <Item>
                          <Input
                            placeholder="Serving Size"
                            value={recipeData[field.key] ? `${recipeData[field.key].serving_size?.size} ${recipeData[field.key].serving_size?.unit}` : null}
                            disabled
                          />
                        </Item>
                        <Item
                          name={[field.name, 'number_of_servings']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing number of servings',
                            },
                          ]}
                        // style={{ width: '20%' }}
                        >
                          <InputNumber
                            placeholder="Number of Servings"
                            onChange={handleIngredientChange}
                          />
                        </Item>
                        <Item>
                          <MinusCircleOutlined onClick={() => {
                            remove(field.name)
                            handleIngredientChange()
                          }} />
                        </Item>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Lunch Ingredient
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          </Item>
          <Item label='Dinner'>
          <Form.List
              name="dinner"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Row>
                        <Item
                          key={'food'}
                          name={[field.name, 'foodId']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing food',
                            },
                          ]}
                          style={{ width: '60%', }}
                        >
                          <Select
                            showSearch
                            placeholder="Food"
                            onChange={handleIngredientChange}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {foodData.map((food, i) => (
                              <Option key={i} value={food._id}>
                                {food.name}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                        <Item>
                          <Input
                            placeholder="Serving Size"
                            value={recipeData[field.key] ? `${recipeData[field.key].serving_size?.size} ${recipeData[field.key].serving_size?.unit}` : null}
                            disabled
                          />
                        </Item>
                        <Item
                          name={[field.name, 'number_of_servings']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing number of servings',
                            },
                          ]}
                        // style={{ width: '20%' }}
                        >
                          <InputNumber
                            placeholder="Number of Servings"
                            onChange={handleIngredientChange}
                          />
                        </Item>
                        <Item>
                          <MinusCircleOutlined onClick={() => {
                            remove(field.name)
                            handleIngredientChange()
                          }} />
                        </Item>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Dinner Ingredient
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          </Item>
          <Item label='Snacks'>
            <Form.List
              name="snacks"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Row>
                        <Item
                          key={'food'}
                          name={[field.name, 'foodId']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing food',
                            },
                          ]}
                          style={{ width: '60%', }}
                        >
                          <Select
                            showSearch
                            placeholder="Food"
                            onChange={handleIngredientChange}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {foodData.map((food, i) => (
                              <Option key={i} value={food._id}>
                                {food.name}
                              </Option>
                            ))}
                          </Select>
                        </Item>
                        <Item>
                          <Input
                            placeholder="Serving Size"
                            value={recipeData[field.key] ? `${recipeData[field.key].serving_size?.size} ${recipeData[field.key].serving_size?.unit}` : null}
                            disabled
                          />
                        </Item>
                        <Item
                          name={[field.name, 'number_of_servings']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing number of servings',
                            },
                          ]}
                        // style={{ width: '20%' }}
                        >
                          <InputNumber
                            placeholder="Number of Servings"
                            onChange={handleIngredientChange}
                          />
                        </Item>
                        <Item>
                          <MinusCircleOutlined onClick={() => {
                            remove(field.name)
                            handleIngredientChange()
                          }} />
                        </Item>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Snack Ingredient
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          </Item>
          <Row>
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="cal"
              value={recipeNutrients.calories}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="g"
              value={recipeNutrients.carbs}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="g"
              value={recipeNutrients.protein}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="g"
              value={recipeNutrients.fat}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="mg"
              value={recipeNutrients.sodium}
              disabled
            />
          </Row>

          {
            alert && <Alert message={alert} type='error' />
          }
        </Form>
      </>
    </Modal>
  )
}

export default AddMealPlanModal