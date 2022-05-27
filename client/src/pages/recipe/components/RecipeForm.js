import { useState, useEffect } from 'react'
// import { Row, Col, Button, Input, InputNumber } from 'antd'
import AddIngredientRow from './AddIngredientRow'
// import IngredientRow from './IngredientRow'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// Utils
import { useGet, usePost } from '../../../utils/API'
import { recipeCategories } from '../../../utils/form';
import { Button, Form, Input, Select, Space, message } from 'antd';
const { Option } = Select;

const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
};

const RecipeForm = () => {
    //     //TODO: Change recipeFormData to recipeData
    //     const [recipeFormData, setRecipeFormData] = useState([])
    const [form] = Form.useForm();
    const { data: foodData, loading }  = useGet('/api/foods')
    const [createRecipe] = usePost('/api/recipes')

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        createRecipe(values)
        .then(res => {
            message.success(`${res.name} added successfully!`)
            form.resetFields()
            // setAlert(null)
        })
        .catch(err => {
            // setAlert('We were not able to save this recipe. Please try again.')
            console.log(err)
        })
    };

    
    const handleChange = () => {
        form.setFieldsValue({
            sights: [],
        });
    };
    
    //     const handleCreateRecipe = () => {
    //         //Maybe refactor when I add an ingredient to only add the id when adding a new food
    //         const ingredients = recipeFormData.map(ingredient => {
        //             return { foodId: ingredient._id}
        //         })
        //         createRecipe({
            //             name: recipeName,
            //             description: recipeDescription,
            //             ingredients
            //         })
            //             .then(recipe => {
                //                 console.log(recipe)
    //             })
    //     }
    
    return (
        <>
        <AddIngredientRow />
        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.Item
                name='name'
                label='Recipe Name'
                rules={[{ required: true }]}
                >
                <Input />
            </Form.Item>
            <Form.Item
                name='description'
                label='Description'
                >
                <Input />
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                >
                <Select options={recipeCategories} onChange={handleChange} />
            </Form.Item>
            <Form.List name="ingredients">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, curValues) =>
                                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                    }
                                    >
                                    {() => (
                                        <Form.Item
                                        {...field}
                                        name={[field.name, 'foodId']}
                                        rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing food',
                                                },
                                            ]}
                                            >
                                            <Select
                                                style={{ width: 130, }}
                                                showSearch
                                                placeholder="Food"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                >
                                                {foodData.map((food) => (
                                                    <Option key={food._id} value={food._id}>
                                                        {food.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="Number of Servings"
                                    name={[field.name, 'number_of_servings']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing number of servings',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add ingredient
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    );
    
    //     return (
        //         <>
        //             <Row style={{ margin: '10px 60px' }}>
        //                 <div>Recipe Name:</div>
        //                 <Input
        //                     value={recipeName}
        //                     onChange={(e) => setRecipeName(e.target.value)}
        //                 />
        //             </Row>
        //             <Row style={{ margin: '10px 60px' }}>
        //                 <div>Recipe Description:</div>
        //                 <Input
        //                     value={recipeDescription}
        //                     onChange={(e) => setRecipeDescription(e.target.value)}
        //                 />
        //             </Row>
        //             <div style={{ margin: '10px 60px' }}>
        //                 <AddIngredientRow
        //                     foods={foods}
        //                     setRecipeFormData={setRecipeFormData}
        //                 />
        //                 {/* Should I make addIngredientRow and IngredientRow the same? */}
        //             </div>
        //             <div style={{ margin: '10px 60px' }}>
        //                 {
            //                     recipeFormData.map((data, i) => (
                //                         <IngredientRow
                //                             key={i}
                //                             index={i}
                //                             foods={foods}
                //                             edit={false}
                //                             recipeFormData={recipeFormData}
                //                             setRecipeFormData={setRecipeFormData}
                //                         />
                //                     ))
                //                 }
                //                 <Row>
                //                     <Col xs={14}>
                //                     </Col>
                //                     <Col xs={8}>
                //                         <Row>
                //                             <Col md={5}>
                //                                 <InputNumber
                //                                     style={{ marginRight: '5px' }}
                //                                     addonAfter="g"
                //                                     // value={food?.carbs * servings}
                //                                     disabled
                //                                 />
                //                             </Col>
                //                             <Col md={5}>
    //                                 <InputNumber
    //                                     style={{ marginRight: '5px' }}
    //                                     addonAfter="g"
    //                                     // value={food?.protein * servings}
    //                                     disabled
    //                                 />
    //                             </Col>
    //                             <Col md={5}>
    //                                 <InputNumber
    //                                     style={{ marginRight: '5px' }}
    //                                     addonAfter="g"
    //                                     // value={food?.fat * servings}
    //                                     disabled
    //                                 />
    //                             </Col>
    //                             <Col md={5}>
    //                                 <InputNumber
    //                                     style={{ marginRight: '5px' }}
    //                                     addonAfter="mg"
    //                                     // value={food?.sodium * servings}
    //                                     disabled
    //                                 />
    //                             </Col>
    //                             <Col md={4}>
    //                             </Col>
    //                         </Row>
    //                     </Col>
    //                 </Row>
    //             </div>
    //             <Button 
    //                 type='primary'
    //                 htmlType='submit'
    //                 onClick={handleCreateRecipe}
    //             >Create Recipe</Button>
    //         </>
    //     )
    // }
    
}

export default RecipeForm
// const formItemLayout = {
//     labelCol: {
//         xs: {
//             span: 24,
//         },
//         sm: {
//             span: 4,
//         },
//     },
//     wrapperCol: {
//         xs: {
//             span: 24,
//         },
//         sm: {
//             span: 20,
//         },
//     },
// };
// const formItemLayoutWithOutLabel = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 20,
//             offset: 4,
//         },
//     },
// };