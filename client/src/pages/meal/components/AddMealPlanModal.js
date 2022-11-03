// React
import React, { useState } from 'react'
// Components
import NutrientsRow from '../../components/NutrientsRow'
import NutrientsChart from '../../components/NutrientsChart'
import MealForm from './MealForm'
// Antd
import { Modal, Button, Form, Select, DatePicker, Alert, message } from 'antd'
// Utils
import { useGet, usePost } from '../../../utils/API'
import { layout, defaultMealPlanState, disabledDate } from '../../../utils/form'
import moment from 'moment'

const { Item } = Form
const { Option } = Select

const AddMealPlanModal = ({ visible, handleCloseModal }) => {
  const [form] = Form.useForm()
  const [mealData, setMealData] = useState(defaultMealPlanState)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState()
  const { data: foodData } = useGet('/api/food')
  const { data: recipeData } = useGet('/api/recipe')
  const [createMeal] = usePost('/api/meal')

  const onFinish = (values) => {
    setLoading(true)
    const date = moment(form.getFieldsValue().date).format('L')
    const totalNutrients = getTotalNutrients()
    createMeal({
      date: moment(date).format(),
      ...mealData,
      ...totalNutrients
    })
      .then(res => {
        if (!res.success) {
          setAlert('We found a meal plan with the same date. Edit the existing meal plan or change the date.')
        } else {
          message.success('Meal plan added successfully!')
          resetForm()
        }
        setLoading(false)
      })
      .catch(err => {
        setAlert('We were not able to save this meal. Please try again.')
        console.log(err)
        setLoading(false)
      })
  }

  // //This may make it too ambiguous to replace handleIngredientChange mappings with one function
  // const mapMealPlanLines = (mealArray, data) => {
  //   return mealArray.map(item => {
  //     if (item.foodId && item.number_of_servings) {
  //       const food = data.find((food) => food._id === item.foodId)
  //       const servings = item.number_of_servings
  //       const calories = lineItem.serving.calories * servings
  //       const carbs = lineItem.serving.carbs * servings
  //       const protein = lineItem.serving.protein * servings
  //       const fat = lineItem.serving.fat * servings
  //       const sodium = lineItem.serving.sodium * servings
  //       return { ...lineItem, foodId: lineItem._id, calories, carbs, protein, fat, sodium, number_of_servings: servings }
  //     } else if (item.foodId) {
  //       const food = foodData.find((food) => food._id === item.foodId)
  //       return food
  //     } else if (item.number_of_servings) {
  //       return item
  //     }
  //     else {
  //       return null
  //     }
  //   }).filter(Boolean)
  // }

  const handleIngredientChange = (value) => {
    let ingredients = form.getFieldsValue()[value].ingredients || []
    let recipes = form.getFieldsValue()[value].recipes || []

    ingredients = ingredients.map(ingredient => {
      if (ingredient.foodId && ingredient.number_of_servings) {
        const food = foodData.find((food) => food._id === ingredient.foodId)
        const servings = ingredient.number_of_servings
        const calories = food.serving.calories * servings
        const carbs = food.serving.carbs * servings
        const protein = food.serving.protein * servings
        const fat = food.serving.fat * servings
        const sodium = food.serving.sodium * servings
        return { ...food, foodId: food._id, calories, carbs, protein, fat, sodium, number_of_servings: servings }
      } else if (ingredient.foodId) {
        const food = foodData.find((food) => food._id === ingredient.foodId)
        return food
      } else if (ingredient.number_of_servings) {
        return ingredient
      } else {
        return null
      }
    }).filter(Boolean)

    recipes = recipes.map(recipeIngredient => {
      if (recipeIngredient.recipeId && recipeIngredient.number_of_servings) {
        const recipe = recipeData.find((recipe) => recipe._id === recipeIngredient.recipeId)
        const servings = recipeIngredient.number_of_servings
        const calories = recipe.serving.calories * servings
        const carbs = recipe.serving.carbs * servings
        const protein = recipe.serving.protein * servings
        const fat = recipe.serving.fat * servings
        const sodium = recipe.serving.sodium * servings
        return { ...recipe, recipeId: recipe._id, calories, carbs, protein, fat, sodium, number_of_servings: servings }
      } else if (recipeIngredient.recipeId) {
        const recipe = recipeData.find((recipe) => recipe._id === recipeIngredient.recipeId)
        return recipe
      } else if (recipeIngredient.number_of_servings) {
        return recipeIngredient
      } else {
        return null
      }
    }).filter(Boolean)

    let mealCal = 0; let mealCarbs = 0; let mealProtein = 0; let mealFat = 0; let mealSodium = 0
    ingredients?.forEach(ingredient => {
      if (ingredient?._id && ingredient?.number_of_servings) {
        mealCal += ingredient.calories
        mealCarbs += ingredient.carbs
        mealProtein += ingredient.protein
        mealFat += ingredient.fat
        mealSodium += ingredient.sodium
      }
    })
    recipes?.forEach(recipe => {
      if (recipe?._id && recipe?.number_of_servings) {
        mealCal += recipe.calories
        mealCarbs += recipe.carbs
        mealProtein += recipe.protein
        mealFat += recipe.fat
        mealSodium += recipe.sodium
      }
    })
    setMealData(mealData => { return { ...mealData, [value]: { ...mealData[value], recipes, ingredients, calories: mealCal, carbs: mealCarbs, protein: mealProtein, fat: mealFat, sodium: mealSodium } } })
  }

  const getTotalNutrients = () => {
    return {
      calories: (mealData.breakfast.calories + mealData.lunch.calories + mealData.dinner.calories + mealData.snacks.calories).toFixed(2),
      carbs: (mealData.breakfast.carbs + mealData.lunch.carbs + mealData.dinner.carbs + mealData.snacks.carbs).toFixed(2),
      protein: (mealData.breakfast.protein + mealData.lunch.protein + mealData.dinner.protein + mealData.snacks.protein).toFixed(2),
      fat: (mealData.breakfast.fat + mealData.lunch.fat + mealData.dinner.fat + mealData.snacks.fat).toFixed(2),
      sodium: (mealData.breakfast.sodium + mealData.lunch.sodium + mealData.dinner.sodium + mealData.snacks.sodium).toFixed(2)
    }
  }

  const resetForm = () => {
    form.resetFields()
    setAlert(null)
    setMealData(defaultMealPlanState)
  }

  const handleCloseClick = () => {
    handleCloseModal()
    resetForm()
  }

  const footerButtons =
    [
      <Button
        key='back'
        onClick={handleCloseClick}
      >
        Exit
      </Button>,
      <Button
        key='submit'
        type='primary'
        htmlType='submit'
        style={{ width: '125px' }}
        loading={loading}
        onClick={() => form.submit()}
      >
        Submit
      </Button>
    ]

  return (
    <Modal
      title={'Create Meal Plan'}
      visible={visible}
      onCancel={handleCloseClick}
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
            mealData={mealData.breakfast}
            foods={foodData}
            recipes={recipeData}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            meal={{ label: 'Lunch', value: 'lunch' }}
            mealData={mealData.lunch}
            foods={foodData}
            recipes={recipeData}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            meal={{ label: 'Dinner', value: 'dinner' }}
            mealData={mealData.dinner}
            foods={foodData}
            recipes={recipeData}
          />
          <MealForm
            handleIngredientChange={handleIngredientChange}
            meal={{ label: 'Snacks', value: 'snacks' }}
            mealData={mealData.snacks}
            foods={foodData}
            recipes={recipeData}
          />
          <NutrientsRow
            nutrients={getTotalNutrients()}
          />
          {
            alert && <Alert message={alert} type='error' />
          }
        </Form>
        <NutrientsChart
          nutrients={getTotalNutrients()}
        />
      </>
    </Modal>
  )
}

export default AddMealPlanModal
