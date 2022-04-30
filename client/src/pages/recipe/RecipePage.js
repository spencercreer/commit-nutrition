import { Link } from 'react-router-dom'
// Antd
import { Layout, Menu, Select } from 'antd'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu
const { Option } = Select

const RecipePage = () => {
    return (
        <>
            <Sider>
                <Menu
                    mode='inline'
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Dashboard'>
                        <Item key='1'><Link to={'/foods'} >Foods</Link></Item>
                        <Item key='2'><Link to={'/recipes'} >Recipes</Link></Item>
                        <Item key='3'><Link to={'/meals'} >Meals</Link></Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Content>
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </Content>
        </>
    )
}

export default RecipePage