// React
import { useState } from 'react'
// Components
import RecipeList from './components/RecipeList'
import AddRecipeModal from './components/AddRecipeModal'
// Antd
import { Layout, Menu, Button } from 'antd'
// Utils
import { recipeCategories } from '../../utils/form'

const { Content, Sider } = Layout
const { SubMenu, Item } = Menu

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
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub1']}
                >
                    <SubMenu key='sub1' title='Recipes'>
                        <Item key={0}>All</Item>
                        {
                            recipeCategories.map((recipeCategory, i) => (
                                <Item key={i + 1}>{recipeCategory.label}</Item>
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