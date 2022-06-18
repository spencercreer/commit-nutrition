import { useState } from 'react'
import { Modal, Row, Col, Button, Form, Input, InputNumber, Select, DatePicker, Space, Alert, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// Utils
import { useGet, usePost } from '../../../utils/API'
import { layout, disabledDate } from '../../../utils/form';
import NutrientsRow from '../../../components/NutrientsRow';
import MealForm from './MealForm'

const { Item } = Form
const { Option } = Select;

const AddMealPlanModal = ({ visible, handleCloseModal }) => {
  const [mealData, setMealData] = useState([])
  const [form] = Form.useForm()
  const [mealNutrients, setMealNutrients] = useState({
    breakfast: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
    lunch: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
    dinner: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
    snacks: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
  })
  const { data: foods } = useGet('/api/foods')
  const { data: recipes } = useGet('/api/recipes')
  const [createMeal] = usePost('/api/meals')
  const [alert, setAlert] = useState()

  const onFinish = (values) => {
    console.log(values)
    createMeal({ ...values,
      breakfast: {...values.breakfast, ...mealNutrients.breakfast},
      lunch: {...values.lunch, ...mealNutrients.lunch},
      dinner: {...values.dinner, ...mealNutrients.dinner},
      snacks: {...values.snacks, ...mealNutrients.snacks},
      calories: mealNutrients.breakfast.calories + mealNutrients.lunch.calories + mealNutrients.dinner.calories + mealNutrients.snacks.calories,
      carbs: mealNutrients.breakfast.carbs + mealNutrients.lunch.carbs + mealNutrients.dinner.carbs + mealNutrients.snacks.carbs,
      protein: mealNutrients.breakfast.protein + mealNutrients.lunch.protein + mealNutrients.dinner.protein + mealNutrients.snacks.protein,
      fat: mealNutrients.breakfast.fat + mealNutrients.lunch.fat + mealNutrients.dinner.fat + mealNutrients.snacks.fat,
      sodium: mealNutrients.breakfast.sodium + mealNutrients.lunch.sodium + mealNutrients.dinner.sodium + mealNutrients.snacks.sodium,
    })
      .then(res => {
        message.success(`Meal plan added successfully!`)
        form.resetFields()
        setAlert(null)
        setMealNutrients({
          breakfast: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
          lunch: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
          dinner: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
          snacks: { calories: null, carbs: null, protein: null, fat: null, sodium: null },
        })
      })
      .catch(err => {
        setAlert('We were not able to save this meal. Please try again.')
        console.log(err)
      })
  };

  const handleIngredientChange = (value) => {
    let mealIngredients = form.getFieldsValue()[value].ingredients || []
    let mealRecipes = form.getFieldsValue()[value].recipes || []

    let ingredients = mealIngredients.concat(mealRecipes)
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
      } else if (ingredient.recipeId && ingredient.number_of_servings) {
        const recipe = recipes.find((recipe) => recipe._id === ingredient.recipeId)
        const servings = ingredient.number_of_servings
        console.log(recipe)
        const calories = recipe.serving.calories * servings
        const carbs = recipe.serving.carbs * servings
        const protein = recipe.serving.protein * servings
        const fat = recipe.serving.fat * servings
        const sodium = recipe.serving.sodium * servings
        return { ...recipe, calories, carbs, protein, fat, sodium, number_of_servings: servings }
      } else if (ingredient.recipeId) {
        const recipe = recipes.find((recipe) => recipe._id === ingredient.recipeId)
        return recipe
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
    setMealNutrients(mealNutrients => {return { ...mealNutrients, [value]: { calories: mealCal, carbs: mealCarbs, protein: mealProtein, fat: mealFat, sodium: mealSodium }}})
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
          <MealForm
            handleIngredientChange={handleIngredientChange}
            meal={{ label: 'Breakfast', value: 'breakfast' }}
            //mealData will need to change
            mealData={mealData}
            foods={foods}
            recipes={recipes}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            meal={{ label: 'Lunch', value: 'lunch' }}
            mealData={mealData}
            foods={foods}
            recipes={recipes}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            meal={{ label: 'Dinner', value: 'dinner' }}
            mealData={mealData}
            foods={foods}
            recipes={recipes}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            meal={{ label: 'Snacks', value: 'snacks' }}
            mealData={mealData}
            foods={foods}
            recipes={recipes}
          />
          <NutrientsRow nutrients={mealNutrients} />
          {
            alert && <Alert message={alert} type='error' />
          }
        </Form>
      </>
    </Modal>
  )
}

export default AddMealPlanModal