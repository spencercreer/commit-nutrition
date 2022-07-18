import { useGet } from "../../utils/API"

const GroceryPage = () => {
  const { data: mealData, loading } = useGet('/api/meal/week')
  console.log(mealData)

  return (
    <>
      {
        loading ?
          <div>Loading</div>
          :
          mealData.map((meal, i) => (
            <div key={i}>
              <>
                {
                  meal.breakfast.ingredients?.map((ingredient, j) => (
                    <div key={`breakfast_ing_${i}_${j}`}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.breakfast.recipes?.map((recipe, j) => (
                    <div key={`breakfast_rec_${i}_${j}`}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.lunch.ingredients?.map((ingredient, j) => (
                    <div key={`lunch_ing_${i}_${j}`}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.lunch.recipes?.map((recipe, j) => (
                    <div key={`lunch_rec_${i}_${j}`}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.dinner.ingredients?.map((ingredient, j) => (
                    <div key={`dinner_ing_${i}_${j}`}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.dinner.recipes?.map((recipe, j) => (
                    <div key={`dinner_rec_${i}_${j}`}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
              <> 
                {
                  meal.snacks.ingredients?.map((ingredient, j) => (
                    <div key={`snacks_ing_${i}_${j}`}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.snacks.recipes?.map((recipe, j) => (
                    <div key={`snacks_rec_${i}_${j}`}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
            </div>
          ))

      }
    </>
  )
}

export default GroceryPage