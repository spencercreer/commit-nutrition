import LoadingCards from '../../../components/LoadingCards'
// Antd
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
// Utils
import { useGet } from '../../../utils/API'

const FoodList = () => {

    const { data: foodData, loading } = useGet('/api/foods')

    return (
        <>
            {
                loading ?
                    <LoadingCards />
                    :
                    foodData?.map((food, i) => (
                        <Card
                            key={i}
                            title={<div>{food.name}</div>}
                            actions={[
                                <EllipsisOutlined
                                    key='ellipsis'
                                    // onClick={() => handleOnClick()}
                                />,
                                <EditOutlined
                                    key='edit'
                                    // onClick={() => handleOnClick(true)}
                                />,
                                // <Switch 
                                    // checked={active}
                                    // onChange={handleStatusChange}
                                // />,
                            ]}
                        >
                            <p>{food.serving?.calories} cal, {food.serving?.size} {food.serving?.unit}</p>
                            <p>Carbs: {food.serving?.carbs} g</p>
                            <p>Protein: {food.serving?.protein} g</p>
                            <p>Fat: {food.serving?.fat} g</p>
                            <p>Sodium: {food.serving?.sodium} mg</p>
                        </Card>
                    ))
            }
        </>
    )
}

export default FoodList