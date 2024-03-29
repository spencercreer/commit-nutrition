import moment from 'moment'

export const defaultMealPlanState = {
  breakfast: { ingredients: [], recipes: [], calories: null, carbs: null, protein: null, fat: null, sodium: null },
  lunch: { ingredients: [], recipes: [], calories: null, carbs: null, protein: null, fat: null, sodium: null },
  dinner: { ingredients: [], recipes: [], calories: null, carbs: null, protein: null, fat: null, sodium: null },
  snacks: { ingredients: [], recipes: [], calories: null, carbs: null, protein: null, fat: null, sodium: null },
  calories: null,
  carbs: null,
  protein: null,
  fat: null,
  sodium: null
}

export const servingUnits = [
  {
    value: 'cup'
  },
  {
    value: 'pint'
  },
  {
    value: 'quart'
  },
  {
    value: 'gallon'
  },
  {
    value: 'fl oz'
  },
  {
    value: 'liter'
  },
  {
    value: 'ml'
  },
  {
    value: 'Tbsp'
  },
  {
    value: 'tsp'
  },
  {
    value: 'kg'
  },
  {
    value: 'g'
  },
  {
    value: 'lb'
  },
  {
    value: 'oz'
  },
  {
    value: 'large'
  },
  {
    value: 'medium'
  },
  {
    value: 'small'
  }
]

export const foodCategories = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Vegetables',
    value: 'vegetables'
  },
  {
    label: 'Fruits',
    value: 'fruits'
  },
  {
    label: 'Grains',
    value: 'grains'
  },
  {
    label: 'Meats',
    value: 'meats'
  },
  {
    label: 'Protein',
    value: 'protein'
  },
  {
    label: 'Dairy',
    value: 'dairy'
  },
  {
    label: 'Oils & Fats',
    value: 'oils-fats'
  },
  {
    label: 'Sugars & Sweeteners',
    value: 'sugars'
  },
  {
    label: 'Seasonings',
    value: 'seasonings'
  },
  {
    label: 'Sauces',
    value: 'sauces'
  },
  {
    label: 'Other',
    value: 'other'
  }
]

export const recipeCategories = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Breakfast',
    value: 'breakfast'
  },
  {
    label: 'Lunch',
    value: 'lunch'
  },
  {
    label: 'Dinner',
    value: 'dinner'
  },
  {
    label: 'Snack',
    value: 'snack'
  },
  {
    label: 'Dessert',
    value: 'dessert'
  }
]

export const mealCategories = [
  {
    label: 'This Week',
    value: 'week'
  },
  {
    label: 'Starred',
    value: 'starred'
  },
  {
    label: 'Archived',
    value: 'archived'
  }
]

export const validateMessages = (field) => {
  return [{ required: true, message: `${field} is required` }]
}

export const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}

// const formItemLayoutWithOutLabel = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     }
//   },
// };

export const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}
