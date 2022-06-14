import { Modal, Form, Input, Skeleton, Select, Button } from 'antd'
import { useGet } from '../../../utils/API'

const IngredientModal = ({ recipeId, visible, handleCloseModal }) => {
    const { data: recipeData, loading } = useGet(`/api/recipes/${recipeId}`)

    console.log(recipeData)

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
        <>
            {
                    <Modal
                        title={loading ? <Skeleton loading paragraph={{ rows: 0 }} /> : `${recipeData.name} Details`}
                        visible={visible}
                        onCancel={handleCloseModal}
                        footer={footerButtons}
                    >
                        {
                            loading ?
                            <Skeleton loading />
                            :
                            <div>Heyoo</div>
                        }

                    </Modal>
            }
        </>
    )

}

export default IngredientModal
