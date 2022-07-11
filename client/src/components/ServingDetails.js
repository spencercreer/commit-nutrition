import NutrientsRow from "./NutrientsRow"
import NutrientsChart from "./NutrientsChart"

const ServingDetails = ({ recipeData }) => {
    return (
        <>
            {
                recipeData.ingredients.map((food, i) => (
                    <div key={i}>{(food?.foodId?.serving.size * food?.number_of_servings / recipeData?.recipe_servings).toFixed(3)} {food?.foodId?.serving.unit} {food?.foodId?.name}</div>
                ))
            }
            <div style={{ marginTop: '10px', marginBottom: '5px' }}>
                <div>Serving Size: {`${recipeData.serving?.size} ${recipeData.serving?.unit}`}</div>
                <div>Number of Servings: {recipeData.recipe_servings}</div>
                <div>Notes: {recipeData.notes}</div>
            </div>
            <NutrientsRow
                nutrients={{ calories: recipeData?.serving?.calories, carbs: recipeData?.serving?.carbs, protein: recipeData?.serving?.protein, fat: recipeData?.serving?.fat, sodium: recipeData?.serving?.sodium }}
            />
        </>
    )
}

export default ServingDetails