import moment from 'moment'

export const foodCategories = [
    {
        label: 'Vegtables',
        value: 'vegtables',
    },
    {
        label: 'Fruits',
        value: 'fruits',
    },
    {
        label: 'Grains',
        value: 'grains',
    },
    {
        label: 'Meats',
        value: 'meats',
    },
    {
        label: 'Protein',
        value: 'protein',
    },
    {
        label: 'Dairy',
        value: 'dairy',
    },
    {
        label: 'Oils & Fats',
        value: 'oils-fats',
    },
    {
        label: 'Sugars & Sweeteners',
        value: 'sugars',
    },
    {
        label: 'Seasonings',
        value: 'seasonings',
    },
    {
        label: 'Sauces',
        value: 'sauces',
    },
    {
        label: 'Other',
        value: 'other',
    },
]

export const recipeCategories = [
    {
        label: 'Breakfast',
        value: 'breakfast',
    },
    {
        label: 'Lunch',
        value: 'lunch',
    },
    {
        label: 'Dinner',
        value: 'dinner',
    },
    {
        label: 'Snack',
        value: 'snack',
    },
    {
        label: 'Dessert',
        value: 'dessert'
    }
]

export const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

export const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 },
};


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
    return current && current < moment().endOf('day');
  };