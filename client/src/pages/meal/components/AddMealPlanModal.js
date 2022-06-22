// React
import { useState } from 'react'
// Antd
import { Modal, Button, Form, Select, DatePicker, Alert, message } from 'antd';
// Components
import NutrientsRow from '../../../components/NutrientsRow';
import MealForm from './MealForm'
// Utils
import { useGet, usePost } from '../../../utils/API'
import { layout, defaultMealPlanState, disabledDate } from '../../../utils/form';

const { Item } = Form
const { Option } = Select;

const AddMealPlanModal = ({ visible, handleCloseModal }) => {
  const [form] = Form.useForm()
  const [mealData, setMealData] = useState(defaultMealPlanState)
  const { data: foods } = useGet('/api/foods')
  const { data: recipeData } = useGet('/api/recipes')
  const [createMeal] = usePost('/api/meals')
  const [alert, setAlert] = useState()

  const onFinish = (values) => {
    console.log(values)
    createMeal({
      ...mealData,
      calories: (mealData.breakfast.calories + mealData.lunch.calories + mealData.dinner.calories + mealData.snacks.calories).toFixed(2),
      carbs: (mealData.breakfast.carbs + mealData.lunch.carbs + mealData.dinner.carbs + mealData.snacks.carbs).toFixed(2),
      protein: (mealData.breakfast.protein + mealData.lunch.protein + mealData.dinner.protein + mealData.snacks.protein).toFixed(2),
      fat: (mealData.breakfast.fat + mealData.lunch.fat + mealData.dinner.fat + mealData.snacks.fat).toFixed(2),
      sodium: (mealData.breakfast.sodium + mealData.lunch.sodium + mealData.dinner.sodium + mealData.snacks.sodium).toFixed(2)
    })
      .then(res => {
        message.success(`Meal plan added successfully!`)
        form.resetFields()
        setAlert(null)
        setMealData(defaultMealPlanState)
      })
      .catch(err => {
        setAlert('We were not able to save this meal. Please try again.')
        console.log(err)
      })
  };

  const handleIngredientChange = (value) => {
    let ingredients = form.getFieldsValue()[value].ingredients || []

    ingredients = ingredients.map(ingredient => {
      if (ingredient.foodId && ingredient.number_of_servings) {
        const food = foods.find((food) => food._id === ingredient.foodId)
        const servings = ingredient.number_of_servings
        const calories = food.serving.calories * servings
        const carbs = food.serving.carbs * servings
        const protein = food.serving.protein * servings
        const fat = food.serving.fat * servings
        const sodium = food.serving.sodium * servings
        return { ...food, foodId: food._id, calories, carbs, protein, fat, sodium, number_of_servings: servings }
      } else if (ingredient.foodId) {
        const food = foods.find((food) => food._id === ingredient.foodId)
        return food
      } else if (ingredient.number_of_servings) {
        return ingredient
      }
      else {
        return null
      }
    }).filter(Boolean)

    let mealCal = 0, mealCarbs = 0, mealProtein = 0, mealFat = 0, mealSodium = 0
    ingredients?.forEach(ingredient => {
      if (ingredient._id && ingredient.number_of_servings) {
        mealCal += ingredient.calories
        mealCarbs += ingredient.carbs
        mealProtein += ingredient.protein
        mealFat += ingredient.fat
        mealSodium += ingredient.sodium
      }
    })
    setMealData(mealData => { return { ...mealData, [value]: { ...mealData[value], ingredients, calories: mealCal, carbs: mealCarbs, protein: mealProtein, fat: mealFat, sodium: mealSodium } } })
  }

  const handleRecipeChange = (value) => {
    let mealRecipes = form.getFieldsValue()[value].recipes || []

    mealRecipes = mealRecipes.map(mealRecipe => {
      if (mealRecipe.recipeId && mealRecipe.number_of_servings) {
        const recipe = recipeData.find((recipe) => recipe._id === mealRecipe.recipeId)
        const servings = mealRecipe.number_of_servings
        const calories = recipe.serving.calories * servings
        const carbs = recipe.serving.carbs * servings
        const protein = recipe.serving.protein * servings
        const fat = recipe.serving.fat * servings
        const sodium = recipe.serving.sodium * servings
        return { ...recipe, recipeId: recipe._id, calories, carbs, protein, fat, sodium, number_of_servings: servings }
      } else if (mealRecipe.recipeId) {
        const recipe = recipeData.find((recipe) => recipe._id === mealRecipe.recipeId)
        return recipe
      } else if (mealRecipe.number_of_servings) {
        return mealRecipe
      } else {
        return null
      }
    }).filter(Boolean)

    let mealCal = 0, mealCarbs = 0, mealProtein = 0, mealFat = 0, mealSodium = 0
    mealRecipes.forEach(mealRecipe => {
      if (mealRecipe._id && mealRecipe.number_of_servings) {
        mealCal += mealRecipe.calories
        mealCarbs += mealRecipe.carbs
        mealProtein += mealRecipe.protein
        mealFat += mealRecipe.fat
        mealSodium += mealRecipe.sodium
      }
    })
    setMealData(mealData => { return { ...mealData, [value]: { ...mealData[value], recipes: mealRecipes, calories: mealCal, carbs: mealCarbs, protein: mealProtein, fat: mealFat, sodium: mealSodium } } })
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
            handleRecipeChange={handleRecipeChange}
            meal={{ label: 'Breakfast', value: 'breakfast' }}
            mealData={mealData.breakfast}
            foods={foods}
            recipes={recipeData}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            handleRecipeChange={handleRecipeChange}
            meal={{ label: 'Lunch', value: 'lunch' }}
            mealData={mealData.lunch}
            foods={foods}
            recipes={recipeData}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            handleRecipeChange={handleRecipeChange}
            meal={{ label: 'Dinner', value: 'dinner' }}
            mealData={mealData.dinner}
            foods={foods}
            recipes={recipeData}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            handleRecipeChange={handleRecipeChange}
            meal={{ label: 'Snacks', value: 'snacks' }}
            mealData={mealData.snacks}
            foods={foods}
            recipes={recipeData}
          />
          <NutrientsRow nutrients={{
            calories: (mealData.breakfast.calories + mealData.lunch.calories + mealData.dinner.calories + mealData.snacks.calories).toFixed(2),
            carbs: (mealData.breakfast.carbs + mealData.lunch.carbs + mealData.dinner.carbs + mealData.snacks.carbs).toFixed(2),
            protein: (mealData.breakfast.protein + mealData.lunch.protein + mealData.dinner.protein + mealData.snacks.protein).toFixed(2),
            fat: (mealData.breakfast.fat + mealData.lunch.fat + mealData.dinner.fat + mealData.snacks.fat).toFixed(2),
            sodium: (mealData.breakfast.sodium + mealData.lunch.sodium + mealData.dinner.sodium + mealData.snacks.sodium).toFixed(2)
          }} />
          {
            alert && <Alert message={alert} type='error' />
          }
        </Form>
      </>
    </Modal>
  )
}

export default AddMealPlanModal