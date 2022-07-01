import { Skeleton, Card } from 'antd'
const { Meta } = Card

const LoadingCards = ({ number }) => {
    return (
        [...Array(number).keys()].map((i) => (
            <Card
                key={i}
            // style={{ width: 400, marginTop: 16, marginLeft: 10, marginRight: 10, display: 'inline-block' }}
            >
                <Skeleton loading={true} active>
                    <Meta />
                </Skeleton>
            </Card>
        ))
    )
}

export default LoadingCards