// React
import { useState } from 'react'
// Components
import FoodList from './components/FoodList'
import AddFoodModal from './components/AddFoodModal'
// Antd
import { Layout, Menu, Button, Input } from 'antd'
// Utils
import { foodCategories } from '../../utils/form'
import { useFilterGet } from '../../utils/API'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

const FoodPage = () => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [modalVisible, setModalVisible] = useState(false)
    const [{ data: foodData, loading }, filterFoods] = useFilterGet('/api/foods')

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
        filterFoods(filter, event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.key)
        filterFoods(event.key, search)
    }

    return (
        <>
            <Sider
                width={200}
                className='site-layout-background'
                breakpoint='md'
                collapsedWidth='0'
            >
                <Menu
                    mode='inline'
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={[filter]}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Foods'>
                        <Item
                            key={'all'}
                            onClick={handleFilterChange}
                        >
                            All
                        </Item>
                        {
                            foodCategories.map((foodCategory) => (
                                <Item
                                    key={foodCategory.value}
                                    onClick={handleFilterChange}
                                >
                                    {foodCategory.label}
                                </Item>
                            ))
                        }
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ margin: '10px 60px' }}>
                <Button
                    style={{ marginBottom: '10px' }}
                    type='primary'
                    onClick={() => setModalVisible(true)}
                >
                    Add Food
                </Button>
                <Input
                    style={{ marginBottom: '10px' }}
                    placeholder='Search Foods'
                    onChange={handleSearch}
                />
                <FoodList
                    loading={loading}
                    foodData={foodData}
                />
                <AddFoodModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
    )
}

export default FoodPage