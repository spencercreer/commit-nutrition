import { useState } from 'react'
import { Modal, Row, Col, Button, Form, Input, InputNumber, Select, Space, Alert, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// Utils
import { useGet, usePost } from '../../../utils/API'
import { recipeCategories } from '../../../utils/form';
import NutrientsRow from '../../../components/NutrientsRow';

const { Item } = Form
const { Group } = Input
const { Option } = Select;

const AddRecipeModal = ({ visible, handleCloseModal }) => {
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
    setRecipeNutrients({ calories: recipeCal.toFixed(2), carbs: recipeCarbs.toFixed(2), protein: recipeProtein.toFixed(2), fat: recipeFat.toFixed(2), sodium: recipeSodium.toFixed(2) })
    setRecipeData(ingredients)
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
      title={'Add Recipe'}
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
          <Item
            name='name'
            rules={[{ required: true }]}
          >
            <Input
              placeholder='Title'
            />
          </Item>
          <Item name='description'>
            <Input
              placeholder='Description'
            />
          </Item>
          <Item name="category">
            <Select
              showSearch
              placeholder='Category'
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {recipeCategories.map((category, i) => (
                <Option key={i} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Item>
          <Item >
            <Group compact>
              <Item
                name={['serving_size', 'size']}
                noStyle
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: '50%' }}
                  placeholder='Serving Size'
                />
              </Item>
              <Item
                name={['serving_size', 'unit']}
                noStyle
              >
                <Input
                  style={{ width: '50%' }}
                  placeholder='Unit'
                />
              </Item>
            </Group>
          </Item>
          <Item name='recipe_servings'>
            <Input
              placeholder='Number of Servings'
            />
          </Item>
          <Form.List
            name="ingredients"
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key}>
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
                      </Col>
                      <Col md={6}>
                        <Item
                          style={{ width: '100%', }}
                        >
                          <Input
                            placeholder="Serving Size"
                            value={recipeData[field.key]?.serving_size ? `${recipeData[field.key].serving_size.size} ${recipeData[field.key].serving_size.unit}` : null}
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
                        // style={{ width: '20%' }}
                        >
                          <InputNumber
                            placeholder="Number of Servings"
                            onChange={handleIngredientChange}
                          />
                        </Item>
                      </Col>
                      <Col md={2}>
                        <Item>
                          <MinusCircleOutlined onClick={() => {
                            remove(field.name)
                            handleIngredientChange()
                          }} />
                        </Item>
                      </Col>
                    </Row>
                  </Space>
                ))}

                <Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add ingredient
                  </Button>
                </Item>
              </>
            )}
          </Form.List>
          <NutrientsRow nutrients={recipeNutrients} />
          {
            alert && <Alert message={alert} type='error' />
          }
        </Form>
      </>
    </Modal>
  )
}

export default AddRecipeModal