import { Form, Input, Select, Radio, Button } from 'antd';
// Utils
import { validateMessages } from '../../../utils/form';

const { Item } = Form
const { Group } = Input
const { Option } = Select;

const ProfileForm = () => {
    const onFinish = (values) => {

    };

    return (
        <Form
            // {...formItemLayoutWithOutLabel}
            // form={form}
            name='add-recipe'
            onFinish={onFinish}
            autoComplete="off"
        >
            <Item name="name" label='Name'>
                <Select
                    showSearch
                    placeholder='Name'
                >
                    <Option key='1' value='Spencer'>
                        Spencer
                    </Option>
                    <Option key='2' value='Lyndsey'>
                        Lyndsey
                    </Option>
                </Select>
            </Item>
            <Form.Item name="radio-group" label="Gender">
                <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                </Radio.Group>
            </Form.Item>
            <Item name="activity" label='Activity'>
                <Select
                    showSearch
                    placeholder='How much do you workout per week?'
                >
                    <Option key="1" value="1">Less than one hour of physical activity per week.</Option>
                    <Option key="2" value="2">One to three hours of physical activity per week.</Option>
                    <Option key="3" value="3">Four to six hours of physical activity per week.</Option>
                    <Option key="4" value="4">Seven to nine hours of physical activity per week.</Option>
                    <Option key="5" value="5">Ten or more hours of physical activity per week.</Option>
                </Select>
            </Item>
            <Item name="goal" label='Fitness Goal'>
                <Select
                    showSearch
                    placeholder='What is your fitness goal?'
                >
                    <Option key="1" value="1">Lose Fat</Option>
                    <Option key="2" value="2">Maintain Weight</Option>
                    <Option key="3" value="3">Build Muscle</Option>
                </Select>
            </Item>
            <Item name='goal-weight' label='Goal Weight'>
                <Input
                    placeholder='Goal Weight'
                />
            </Item>
            <Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Item>
        </Form>
    )
}

export default ProfileForm