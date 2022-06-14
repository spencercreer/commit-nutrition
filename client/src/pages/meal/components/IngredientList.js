import { useState } from 'react'
import { Modal, Row, Col, Button, Form, Input, InputNumber, Select, DatePicker, Space, Alert, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// Utils
import { useGet, usePost } from '../../../utils/API'
import { layout, disabledDate } from '../../../utils/form';

const { Item } = Form
const { Option } = Select;

const MealList = () => {
  const [mealData, setMealData] = useState([])
  const [form] = Form.useForm()
  const [mealNutrients, setMealNutrients] = useState({ calories: null, carbs: null, protein: null, fat: null, sodium: null })
  const { data: foods } = useGet('/api/foods')
  const { data: recipeData } = useGet('/api/recipes')
  const [createMeal] = usePost('/api/meals')
  const [alert, setAlert] = useState()

  
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

  return (
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
                              {recipeData.map((recipe, i) => (
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
  )
}

export default MealList