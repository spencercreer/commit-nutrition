// Components
import NutrientsRow from "./NutrientsRow"
// Utils
import Fraction from "fraction.js"

const RecipeDetails = ({ recipeData }) => {

  const calculateAmount = (food) => {
    const amount = new Fraction(food?.foodId?.serving.size * food?.number_of_servings)
    return amount.toFraction()
  }

  return (
    <>
      {
        recipeData.ingredients.map((food, i) => (
          <div key={i}>{calculateAmount(food)} {food?.foodId?.serving.unit} {food?.foodId?.name}</div>
        ))
      }
      <div style={{ marginTop: '10px', marginBottom: '5px' }}>
        <div>Serving Size: {`${recipeData.serving?.size} ${recipeData.serving?.unit}`}</div>
        <div>Number of Servings: {recipeData.recipe_servings}</div>
        <div>Notes: {recipeData.notes}</div>
      </div>
      <NutrientsRow
        nutrients={{ calories: recipeData?.calories, carbs: recipeData?.carbs, protein: recipeData?.protein, fat: recipeData?.fat, sodium: recipeData?.sodium }}
      />
    </>
  )
}

export default RecipeDetails