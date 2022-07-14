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
          mealData.map((meal) => (
            <>
              <>
                {
                  meal.breakfast.ingredients?.map((ingredient, i) => (
                    <div key={i}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.breakfast.recipes?.map((recipe, i) => (
                    <div key={i}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.lunch.ingredients?.map((ingredient, i) => (
                    <div key={i}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.lunch.recipes?.map((recipe, i) => (
                    <div key={i}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.dinner.ingredients?.map((ingredient, i) => (
                    <div key={i}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.dinner.recipes?.map((recipe, i) => (
                    <div key={i}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
              <> 
                {
                  meal.snacks.ingredients?.map((ingredient, i) => (
                    <div key={i}>{ingredient.foodId?.name}</div>
                  ))
                }
              </>
              <>
                {
                  meal.snacks.recipes?.map((recipe, i) => (
                    <div key={i}>{recipe.recipeId?.name}</div>
                  ))
                }
              </>
            </>
          ))

      }
    </>
  )
}

export default GroceryPage