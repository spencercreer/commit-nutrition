// React

// Components

// Antd
import { Layout, Menu, Card } from 'antd'
// Utils
import { useGet } from '../../utils/API'
import Fraction from 'fraction.js'
import moment from 'moment'


const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

const GroceryPage = () => {
  const { data: mealData, loading } = useGet('/api/meal/week')
  console.log(mealData)

  const calculateAmount = (food) => {
    const amount = new Fraction(food?.foodId?.serving.size * food?.number_of_servings)
    return amount.toFraction()
  }

  return (
    <Content style={{ margin: '15px' }}>
      {/* {
        loading ?
          <div>Loading</div>
          :
          <>
            <h2>This week's grocery list</h2>
            {
              mealData.map((meal, i) => (
                // Right now this is card for each day. The goal is to create one list for the whole week.
                <Card key={i}>
                  <h3>{moment(meal.date).format('MMMM Do YYYY')}</h3>
                  <>
                    {
                      meal.breakfast?.ingredients?.map((ingredient, j) => (
                        <div key={`breakfast_ing_${i}_${j}`}>{calculateAmount(ingredient)} {ingredient.foodId?.serving.unit} {ingredient.foodId?.name}</div>
                      ))
                    }
                  </>
                  <>
                    {
                      meal.breakfast?.recipes?.map((recipe, j) => (
                        <div key={`breakfast_rec_${i}_${j}`}>
                          <h6>{recipe.recipeId?.name}</h6>
                          {
                            recipe.ingredients?.map((ingredient) => {
                              <div key={`breakfast_rec_ing_${i}_${j}`}>{calculateAmount(ingredient)} {ingredient.foodId?.serving.unit} {ingredient.foodId?.name}</div>
                            })
                          }
                        </div>
                      ))
                    }
                  </>
                  <>
                    {
                      meal.lunch?.ingredients?.map((ingredient, j) => (
                        <div key={`lunch_ing_${i}_${j}`}>{calculateAmount(ingredient)} {ingredient.foodId?.serving.unit} {ingredient.foodId?.name}</div>
                      ))
                    }
                  </>
                  <>
                    {
                      meal.lunch?.recipes?.map((recipe, j) => (
                        <div key={`lunch_rec_${i}_${j}`}>
                          <h6>{recipe.recipeId?.name}</h6>
                        </div>
                      ))
                    }
                  </>
                  <>
                    {
                      meal.dinner?.ingredients?.map((ingredient, j) => (
                        <div key={`dinner_ing_${i}_${j}`}>{calculateAmount(ingredient)} {ingredient.foodId?.serving.unit} {ingredient.foodId?.name}</div>
                      ))
                    }
                  </>
                  <>
                    {
                      meal.dinner?.recipes?.map((recipe, j) => (
                        <div key={`dinner_rec_${i}_${j}`}>
                          <h6>{recipe.recipeId?.name}</h6>
                        </div>
                      ))
                    }
                  </>
                  <>
                    {
                      meal.snacks?.ingredients?.map((ingredient, j) => (
                        <div key={`snacks_ing_${i}_${j}`}>{calculateAmount(ingredient)} {ingredient.foodId?.serving.unit} {ingredient.foodId?.name}</div>
                      ))
                    }
                  </>
                  <>
                    {
                      meal.snacks?.recipes?.map((recipe, j) => (
                        <div key={`snacks_rec_${i}_${j}`}>
                          <h6>{recipe.recipeId?.name}</h6>
                        </div>
                      ))
                    }
                  </>
                </Card>
              ))
            }
          </>
      } */}
    </Content>
  )
}

export default GroceryPage