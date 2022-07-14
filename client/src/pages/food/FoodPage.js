// React
import { useState } from 'react'
// Components
import FoodList from './components/FoodList'
import AddFoodModal from './components/AddFoodModal'
// Antd
import { Layout, Row, Col, Menu, Button, Input, Select } from 'antd'
// Utils
import { foodCategories } from '../../utils/form'
import { useFilterGet } from '../../utils/API'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu
const { Option } = Select

const FoodPage = () => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [modalVisible, setModalVisible] = useState(false)
    const [{ data: foodData, loading }, filterFoods] = useFilterGet('/api/food')

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
        filterFoods(filter, event.target.value)
    }

    const handleFilterChange = (value) => {
        setFilter(value)
        filterFoods(value, search)
    }

    return (
        <>
            <Sider
                width={200}
                breakpoint='md'
                collapsedWidth='0'
                trigger={null}
            >
                <Menu
                    mode='inline'
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={[filter]}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Foods'>
                        <Item
                            key='all'
                            onClick={(event) => handleFilterChange(event.key)}
                        >
                            All
                        </Item>
                        {
                            foodCategories.map((foodCategory) => (
                                <Item
                                    key={foodCategory.value}
                                    onClick={(event) => handleFilterChange(event.key)}
                                >
                                    {foodCategory.label}
                                </Item>
                            ))
                        }
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ margin: '10px 60px' }}>
                <Row>
                    <Col xs={24} md={4} >
                        <Button
                            style={{ width: '100%', marginBottom: '10px' }}
                            type='primary'
                            onClick={() => setModalVisible(true)}
                        >
                            Add Food
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Search Foods'
                            onChange={handleSearch}
                        />
                    </Col>
                    <Col xs={24} md={0} >
                        <Select
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Filter Foods'
                            onChange={(event) => handleFilterChange(event)}
                        >
                            <Option
                                key='all'
                                value='all'
                            >
                                All
                            </Option>
                            {
                                foodCategories.map((foodCategory, i) => (
                                    <Option
                                        key={foodCategory.value}
                                        value={foodCategory.value}
                                    >
                                        {foodCategory.label}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
                <FoodList
                    loading={loading}
                    foodData={foodData}
                />
                {/* Make add, and update a page, and food info only modal */}
                <AddFoodModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
    )
}

export default FoodPage