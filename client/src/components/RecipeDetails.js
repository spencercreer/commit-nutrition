import NutrientsRow from "./NutrientsRow"
import NutrientsChart from "./NutrientsChart"

const RecipeDetails = ({ recipeData }) => {
  return (
    <>
      {
        recipeData.ingredients.map((food, i) => (
          <div key={i}>{(food?.foodId?.serving.size * food?.number_of_servings).toFixed(3)} {food?.foodId?.serving.unit} {food?.foodId?.name}</div>
        ))
      }
      <div style={{ marginTop: '10px', marginBottom: '5px' }}>
        <div>Serving Size: {`${recipeData.serving?.size} ${recipeData.serving?.unit}`}</div>
        <div>Number of Servings: {recipeData.recipe_servings}</div>
      </div>
      <NutrientsRow
        nutrients={{ calories: recipeData?.calories, carbs: recipeData?.carbs, protein: recipeData?.protein, fat: recipeData?.fat, sodium: recipeData?.sodium }}
      />
    </>
  )
}

export default RecipeDetails