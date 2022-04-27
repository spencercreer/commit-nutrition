import { useState } from 'react';

import { createFood } from '../utils/API'


const FoodForm = () => {
    const [foodFormData, setFoodFormData] = useState({
        name: null,
        description: null,
        calories: null,
        carbs: null,
        protein: null,
        fat: null,
        sodium: null
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFoodFormData({ ...foodFormData, [name]: value })
    }

    const handleFormSubmit = async (event) => {
        try {
            const response = await createFood(foodFormData)

            if (!response.ok) {
                throw new Error('Create food error')
            }
        } catch (err) {
            console.error(err)
        }

        setFoodFormData({
            name: null,
            description: null,
            calories: null,
            carbs: null,
            protein: null,
            fat: null,
            sodium: null
        })
    }

    return (
        <Form onSubmit={handleFormSubmit}>
              {/* <Row>
            <Col sm={6}>
                <Select
                    showSearch
                    placeholder="Food"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="appld">Apple</Option>
                    <Option value="banana">Banana</Option>
                    <Option value="peach">Peach</Option>
                </Select>
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="g"
                    step="0.01"
                />
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="g"
                    step="0.01"
                />
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="g"
                    step="0.01"
                />
            </Col>
            <Col sm={4}>
                <InputNumber
                    style={{ marginRight: '5px' }}
                    addonAfter="mg"
                    step="0.01"
                />
            </Col>
            <Col sm={2}>
                <Button
                    style={{ marginRight: '5px' }}
                    type="primary"
                    icon={<PlusOutlined />}
                    // onClick={this.addRow}
                />
            </Col>
        </Row> */}
            <Label>Food Name</Label>
            <InputGroup className="mb-3">
                <FormControl
                    name="name"
                    onChange={handleInputChange}
                />
            </InputGroup>

            <Label>Description</Label>
            <InputGroup className="mb-3">
                <FormControl
                    name="description"
                    onChange={handleInputChange}
                />
            </InputGroup>

            <Label>Calories</Label>
            <InputGroup className="mb-3">
                <FormControl
                    name="calories"
                    onChange={handleInputChange}
                />
                <Text>cal</Text>
            </InputGroup>

            <Label>Carbs</Label>
            <InputGroup className="mb-3">
                <FormControl
                    name="carbs"
                    onChange={handleInputChange}
                />
                <Text>g</Text>
            </InputGroup>

            <Label>Protein</Label>
            <InputGroup className="mb-3">
                <FormControl
                    name="protein"
                    onChange={handleInputChange}
                />
                <Text>g</Text>
            </InputGroup>

            <Label>Fat</Label>
            <InputGroup className="mb-3">
                <FormControl
                    name="fat"
                    onChange={handleInputChange}
                />
                <Text>g</Text>
            </InputGroup>

            <Label>Sodium</Label>
            <InputGroup className="mb-3">
                <FormControl
                    name="sodium"
                    onChange={handleInputChange}
                />
                <Text>mg</Text>
            </InputGroup>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default FoodForm;