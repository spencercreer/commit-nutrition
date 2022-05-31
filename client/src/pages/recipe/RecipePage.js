// React
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Components
import RecipeList from './components/RecipeList'
import AddRecipeModal from './components/AddRecipeModal'
// Antd
import { Layout, Menu, Select, Button } from 'antd'
// Utils
import { recipeCategories } from '../../utils/form'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu
const { Option } = Select

const RecipePage = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleToggleModal = () => {
        setModalVisible(!modalVisible)
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
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Recipes'>
                        {
                            recipeCategories.map((recipeCategory, i) => (
                                <Item key={i}>{recipeCategory.label}</Item>
                            ))
                        }
                    </SubMenu>
                </Menu>
            </Sider>
            <Content style={{ margin: '10px 60px' }}>
                <Button
                    type='primary'
                    onClick={() => setModalVisible(true)}
                >
                    Add Recipe
                </Button>
                <RecipeList />
                <AddRecipeModal
                    visible={modalVisible}
                    handleCloseModal={handleToggleModal}
                />
            </Content>
        </>
    )
}

export default RecipePage