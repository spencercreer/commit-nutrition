// React
import { useState } from 'react'
// Components
import RecipeList from './components/RecipeList'
import AddRecipeModal from './components/AddRecipeModal'
// Antd
import { Layout, Row, Col, Menu, Button, Input, Select } from 'antd'
// Utils
import { recipeCategories } from '../../utils/form'
import { useFilterGet } from '../../utils/API'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu
const { Option } = Select

const RecipePage = () => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [modalVisible, setModalVisible] = useState(false)
    const [{ data: recipeData, loading }, filterRecipes] = useFilterGet('/api/recipes')

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
        filterRecipes(filter, event.target.value)
    }

    const handleFilterChange = (value) => {
        setFilter(value)
        filterRecipes(value, search)
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
                    <SubMenu key='sub1' title='Recipes'>
                        <Item
                            key='all'
                            onClick={(event) => handleFilterChange(event.key)}
                        >
                            All
                        </Item>
                        {
                            recipeCategories.map((recipeCategory) => (
                                <Item
                                    key={recipeCategory.value}
                                    onClick={(event) => handleFilterChange(event.key)}
                                >
                                    {recipeCategory.label}
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
                            Add Recipe
                        </Button>
                    </Col>
                    <Col xs={24} md={12}>
                        <Input
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Search Recipes'
                            onChange={handleSearch}
                        />
                    </Col>
                    <Col xs={24} md={0} >
                        <Select
                            style={{ width: '100%', marginBottom: '10px' }}
                            placeholder='Filter Recipes'
                            onChange={(event) => handleFilterChange(event)}
                        >
                            <Option
                                key='all'
                                value='all'
                            >
                                All
                            </Option>
                            {
                                recipeCategories.map((recipeCategory) => (
                                    <Option
                                        key={recipeCategory.value}
                                        value={recipeCategory.value}
                                    >
                                        {recipeCategory.label}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
                <RecipeList
                    loading={loading}
                    recipeData={recipeData}
                />
                <AddRecipeModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
    )
}

export default RecipePage