import React from 'react'
import NutrientsRow from './NutrientsRow'
import NutrientsChart from './NutrientsChart'
import Fraction from 'fraction.js'

const ServingDetails = ({ recipeData }) => {
  const calculateAmount = (food) => {
    const amount = new Fraction(food?.foodId?.serving.size * food?.number_of_servings / recipeData?.recipe_servings)
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
                nutrients={{ calories: recipeData?.serving?.calories, carbs: recipeData?.serving?.carbs, protein: recipeData?.serving?.protein, fat: recipeData?.serving?.fat, sodium: recipeData?.serving?.sodium }}
            />
        </>
  )
}

export default ServingDetails
