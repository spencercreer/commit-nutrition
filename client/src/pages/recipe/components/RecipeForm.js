// import { useState, useEffect } from 'react'
// import { Row, Col, Button, Input, InputNumber } from 'antd'
// import { PlusOutlined } from '@ant-design/icons'
// import AddIngredientRow from './AddIngredientRow'
// import IngredientRow from './IngredientRow'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
// // Utils
// import { getFoods, createRecipe } from '../../../utils/API'

const RecipeForm = () => {
    //     const [recipeName, setRecipeName] = useState('')
    //     const [recipeDescription, setRecipeDescription] = useState('')
    //     //TODO: Change recipeFormData to recipeData
    //     const [recipeFormData, setRecipeFormData] = useState([])
    //     const [foods, setFoods] = useState()

    //     useEffect(() => {
    //         let mounted = true;
    //         getFoods()
    //             .then(items => {
    //                 console.log(items)
    //                 if (mounted) {
    //                     setFoods(items)
    //                 }
    //             })
    //         return () => mounted = false;
    //     }, [])

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 4,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 20,
            },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 20,
                offset: 4,
            },
        },
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
        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
            <Form.Item
                name='name'
                label='Recipe Name'
            >
                <Input
                // value={recipeName}
                // onChange={(e) => setRecipeName(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='description'
                label='Description'
            >
                <Input
                // value={recipeDescription}
                // onChange={(e) => setRecipeDescription(e.target.value)}
                />
            </Form.Item>
            <Form.List
                name="ingredients"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 2) {
                                return Promise.reject(new Error('At least 2 ingredients required'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Ingredients' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input ingredient information or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="passenger name"
                                        style={{
                                            width: '60%',
                                        }}
                                    />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{
                                    width: '60%',
                                }}
                                icon={<PlusOutlined />}
                            >
                                Add ingredient
                            </Button>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add('The head item', 0);
                                }}
                                style={{
                                    width: '60%',
                                    marginTop: '20px',
                                }}
                                icon={<PlusOutlined />}
                            >
                                Add ingredient to top
                            </Button>
                            <Form.ErrorList errors={errors} />
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