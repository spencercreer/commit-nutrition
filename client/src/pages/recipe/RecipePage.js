// React
import { useState } from 'react'
// Components
import RecipeList from './components/RecipeList'
import AddRecipeModal from './components/AddRecipeModal'
// Antd
import { Layout, Menu, Button, Input } from 'antd'
// Utils
import { recipeCategories } from '../../utils/form'
import { useFilterGet } from '../../utils/API'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

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

    const handleFilterChange = (event) => {
        setFilter(event.key)
        filterRecipes(event.key, search)
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
                    <SubMenu key='sub1' title='Recipes'>
                        <Item
                            key={'all'}
                            onClick={handleFilterChange}
                        >
                            All
                        </Item>
                        {
                            recipeCategories.map((recipeCategory) => (
                                <Item
                                    key={recipeCategory.value}
                                    onClick={handleFilterChange}
                                >
                                    {recipeCategory.label}
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
                    Add Recipe
                </Button>
                <Input
                    style={{ marginBottom: '10px' }}
                    placeholder='Search Recipes'
                    onChange={handleSearch}
                />
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