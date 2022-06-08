import { Modal, Form, Input, InputNumber, Select, message, Alert, Button } from 'antd'
import { useGet } from '../../../utils/API'

const { Item } = Form
const { Group } = Input
const { Option } = Select

const IngredientModal = ({ recipeId, visible, handleCloseModal }) => {
    // const { data: recipeData, loading } = useGet(`/api/recipes/${recipeId}`)
    // if (loading) {
    //     return <div>Hey y'all, we're Loading...</div>
    // }

    const footerButtons =
        [
            <Button
                key='back'
                onClick={handleCloseModal}
            >
                Exit
            </Button>,
            <Button
                key='submit'
                type='primary'
                htmlType='submit'
                style={{ width: '125px' }}
            // loading={loading}
            // onClick={() => form.submit()}
            >
                Submit
            </Button>,
        ]

    return (
        <Modal
            title={<div></div>}
            visible={visible}
            onCancel={handleCloseModal}
            footer={footerButtons}
        >

        </Modal>
    )
}

export default IngredientModal

