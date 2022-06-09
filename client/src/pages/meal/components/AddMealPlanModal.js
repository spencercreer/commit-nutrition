import { useState } from 'react'
import { Modal, Row, Col, Button, Form, Input, InputNumber, Select, DatePicker, Space, Alert, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// Utils
import { useGet, usePost } from '../../../utils/API'
import { layout, disabledDate } from '../../../utils/form';

const { Item } = Form
const { Option } = Select;

const AddMealPlanModal = ({ visible, handleCloseModal }) => {
  const [mealData, setMealData] = useState([])
  const [form] = Form.useForm()
  const [mealNutrients, setMealNutrients] = useState({ calories: null, carbs: null, protein: null, fat: null, sodium: null })
  const { data: foods } = useGet('/api/foods')
  const { data: recipes } = useGet('/api/recipes')
  const [createMeal] = usePost('/api/meals')
  const [alert, setAlert] = useState()

  const onFinish = (values) => {
    console.log(values)
    createMeal(values)
      .then(res => {
        message.success(`Meal plan added successfully!`)
        form.resetFields()
        setAlert(null)
        // setRecipeNutrients({ calories: null, carbs: null, protein: null, fat: null, sodium: null })
      })
      .catch(err => {
        setAlert('We were not able to save this recipe. Please try again.')
        console.log(err)
      })
  };

  const handleIngredientChange = (value) => {
    let { [value]: { ingredients } } = form.getFieldsValue()
    console.log(ingredients)
    ingredients = ingredients.map(ingredient => {
      if (ingredient.foodId && ingredient.number_of_servings) {
        const food = foods.find((food) => food._id === ingredient.foodId)
        const servings = ingredient.number_of_servings
        const calories = food.calories * servings
        const carbs = food.carbs * servings
        const protein = food.protein * servings
        const fat = food.fat * servings
        const sodium = food.sodium * servings
        return { ...food, calories, carbs, protein, fat, sodium, number_of_servings: servings }
      } else if (ingredient.foodId) {
        const food = foods.find((food) => food._id === ingredient.foodId)
        return food
      } else {
        return ingredient
      }
    })

    let mealCal = 0, mealCarbs = 0, mealProtein = 0, mealFat = 0, mealSodium = 0
    ingredients.forEach(ingredient => {
      if (ingredient._id && ingredient.number_of_servings) {
        mealCal += ingredient.calories
        mealCarbs += ingredient.carbs
        mealProtein += ingredient.protein
        mealFat += ingredient.fat
        mealSodium += ingredient.sodium
      }
    })
    setMealNutrients({ calories: mealCal, carbs: mealCarbs, protein: mealProtein, fat: mealFat, sodium: mealSodium })
    setMealData(ingredients)
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
      title={'Create Meal Plan'}
      visible={visible}
      onCancel={handleCloseModal}
      footer={footerButtons}
      width={1000}
    >
      <>
        <Form
          {...layout}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Item
            name='date'
            rules={[{ required: true }]}
          >
            <DatePicker disabledDate={disabledDate} />
          </Item>
          <Item label='Breakfast'>
            <Form.List
              name={["breakfast", "ingredients"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                    >
                      <Row>
                        <Col md={10}>
                          <Item
                            key='food'
                            name={[field.name, 'foodId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing food',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Food"
                              onChange={() => handleIngredientChange("breakfast")}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {foods.map((food, i) => (
                                <Option key={i} value={food._id}>
                                  {food.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                              onChange={() => handleIngredientChange("breakfast")}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item
                          // style={{ width: '5%' }}
                          >
                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              handleIngredientChange('breakfast')
                            }} />
                          </Item>
                        </Col>
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
            <Form.List
              name={["breakfast", "recipes"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                    >
                      <Row>
                        <Col md={10}>
                          <Item
                            key={'food'}
                            name={[field.name, 'recipeId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Recipe',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Recipe"
                              // onChange={handleIngredientChange}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {recipes.map((recipe, i) => (
                                <Option key={i} value={recipe._id}>
                                  {recipe.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              // value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                            // onChange={handleIngredientChange}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item
                          // style={{ width: '5%' }}
                          >
                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              // handleIngredientChange()
                            }} />
                          </Item>
                        </Col>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Breakfast Recipe
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          </Item>
          <Item label='Lunch'>
            <Form.List
              name={["lunch", "ingredients"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Row>
                        <Col md={10}>
                          <Item
                            key={'food'}
                            name={[field.name, 'foodId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing food',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Food"
                              onChange={() => handleIngredientChange("lunch")}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {foods.map((food, i) => (
                                <Option key={i} value={food._id}>
                                  {food.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                              onChange={() => handleIngredientChange("lunch")}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item>

                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              handleIngredientChange('lunch')
                            }} />
                          </Item>
                        </Col>
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
            <Form.List
              name={["lunch", "recipes"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                    >
                      <Row>
                        <Col md={10}>
                          <Item
                            key={'recipe'}
                            name={[field.name, 'recipeId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing recipe',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Recipe"
                              // onChange={handleIngredientChange}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {recipes.map((recipe, i) => (
                                <Option key={i} value={recipe._id}>
                                  {recipe.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                            // onChange={handleIngredientChange}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item
                          // style={{ width: '5%' }}
                          >
                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              // handleIngredientChange()
                            }} />
                          </Item>
                        </Col>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Lunch Recipe
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          </Item>
          <Item label='Dinner'>
            <Form.List
              name={["dinner", "ingredients"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Row>
                        <Col md={10}>
                          <Item
                            key={'food'}
                            name={[field.name, 'foodId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing food',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Food"
                              onChange={() => handleIngredientChange("dinner")}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {foods.map((food, i) => (
                                <Option key={i} value={food._id}>
                                  {food.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                              onChange={() => handleIngredientChange("dinner")}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item>

                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              handleIngredientChange('dinner')
                            }} />
                          </Item>
                        </Col>
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
            <Form.List
              name={["dinner", "recipes"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                    >
                      <Row>
                        <Col md={10}>
                          <Item
                            key={'recipe'}
                            name={[field.name, 'recipeId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing recipe',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Recipe"
                              // onChange={handleIngredientChange}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {recipes.map((recipe, i) => (
                                <Option key={i} value={recipe._id}>
                                  {recipe.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                            // onChange={handleIngredientChange}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item
                          // style={{ width: '5%' }}
                          >
                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              // handleIngredientChange()
                            }} />
                          </Item>
                        </Col>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Dinner Recipe
                    </Button>
                  </Item>
                </>
              )}
            </Form.List>
          </Item>
          <Item label='Snacks'>
            <Form.List
              name={["snacks", "ingredients"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                      <Space key={field.key}>
                      <Row>
                        <Col md={10}>
                          <Item
                            key={'food'}
                            name={[field.name, 'foodId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing food',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Food"
                              onChange={() => handleIngredientChange("snacks")}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {foods.map((food, i) => (
                                <Option key={i} value={food._id}>
                                  {food.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                              onChange={() => handleIngredientChange("snacks")}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item>

                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              handleIngredientChange('snacks')
                            }} />
                          </Item>
                        </Col>
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
            <Form.List
              name={["snacks", "recipes"]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                    >
                      <Row>
                        <Col md={10}>
                          <Item
                            key={'recipe'}
                            name={[field.name, 'recipeId']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing recipe',
                              },
                            ]}
                            style={{ width: 200, }}
                          >
                            <Select
                              showSearch
                              placeholder="Recipe"
                              // onChange={handleIngredientChange}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {recipes.map((recipe, i) => (
                                <Option key={i} value={recipe._id}>
                                  {recipe.name}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            style={{ width: '100%', }}
                          >
                            <Input
                              placeholder="Serving Size"
                              value={mealData[field.key] ? `${mealData[field.key].serving_size?.size} ${mealData[field.key].serving_size?.unit}` : null}
                              disabled
                            />
                          </Item>
                        </Col>
                        <Col md={6}>
                          <Item
                            name={[field.name, 'number_of_servings']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing number of servings',
                              },
                            ]}
                            style={{ width: '100%' }}
                          >
                            <InputNumber
                              placeholder="Number of Servings"
                            // onChange={handleIngredientChange}
                            />
                          </Item>
                        </Col>
                        <Col md={2}>
                          <Item
                          // style={{ width: '5%' }}
                          >
                            <MinusCircleOutlined onClick={() => {
                              remove(field.name)
                              // handleIngredientChange()
                            }} />
                          </Item>
                        </Col>
                      </Row>
                    </Space>
                  ))}
                  <Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Snack Recipe
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
              // value={recipeNutrients.calories}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="g"
              // value={recipeNutrients.carbs}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="g"
              // value={recipeNutrients.protein}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="g"
              // value={recipeNutrients.fat}
              disabled
            />
            <InputNumber
              style={{ width: '100%' }}
              addonAfter="mg"
              // value={recipeNutrients.sodium}
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