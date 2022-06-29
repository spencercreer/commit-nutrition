import { Row, Col, Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// Utils
import { validateMessages } from '../../../utils/form';

const { Item } = Form
const { Option } = Select;

const MealForm = ({ handleIngredientChange, meal, mealData, foods, recipes }) => {

  return (
    <Item label={meal.label}>
      <Form.List
        name={[meal.value, "ingredients"]}
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
                      rules={validateMessages('Food')}
                      style={{ width: 200, }}
                    >
                      <Select
                        showSearch
                        placeholder="Food"
                        onChange={() => handleIngredientChange(meal.value)}
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
                        value={mealData.ingredients[field.key]?.serving ? `${mealData.ingredients[field.key].serving.size} ${mealData.ingredients[field.key].serving.unit}` : null}
                        disabled
                      />
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item
                      name={[field.name, 'number_of_servings']}
                      rules={validateMessages('Number of Servings')}
                      style={{ width: '100%' }}
                    >
                      <InputNumber
                        placeholder="Number of Servings"
                        onChange={() => handleIngredientChange(meal.value)}
                      />
                    </Item>
                  </Col>
                  <Col md={2}>
                    <Item
                    // style={{ width: '5%' }}
                    >
                      <MinusCircleOutlined onClick={() => {
                        remove(field.name)
                        handleIngredientChange(meal.value)
                      }} />
                    </Item>
                  </Col>
                </Row>
              </Space>
            ))}
            <Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {`Add ${meal.label} Ingredient`}
              </Button>
            </Item>
          </>
        )}
      </Form.List>
      <Form.List
        name={[meal.value, "recipes"]}
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
                      key='recipe'
                      name={[field.name, 'recipeId']}
                      rules={validateMessages('Recipe')}
                      style={{ width: 200, }}
                    >
                      <Select
                        showSearch
                        placeholder="Recipe"
                        onChange={() => handleIngredientChange(meal.value)}
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
                        value={mealData.recipes[field.key]?.serving ? `${mealData.recipes[field.key].serving.size} ${mealData.recipes[field.key].serving.unit}` : null}
                        disabled
                      />
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item
                      name={[field.name, 'number_of_servings']}
                      rules={validateMessages('Number of Servings')}
                      style={{ width: '100%' }}
                    >
                      <InputNumber
                        min="0"
                        placeholder="Number of Servings"
                        onChange={() => handleIngredientChange(meal.value)}
                      />
                    </Item>
                  </Col>
                  <Col md={2}>
                    <Item
                    // style={{ width: '5%' }}
                    >
                      <MinusCircleOutlined onClick={() => {
                        remove(field.name)
                        handleIngredientChange(meal.value)
                      }} />
                    </Item>
                  </Col>
                </Row>
              </Space>
            ))}
            <Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                {`Add ${meal.label} Recipe`}
              </Button>
            </Item>
          </>
        )}
      </Form.List>
    </Item>
  )
}

export default MealForm