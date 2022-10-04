import React, { Skeleton, Card } from 'antd'
const { Meta } = Card

const LoadingCards = ({ number, rows, height }) => {
  return (
    [...Array(number).keys()].map((i) => (
            <Card
                key={i}
                style={{ height }}
            >
                <Skeleton loading={true} paragraph={{ rows }} active>
                    <Meta />
                </Skeleton>
            </Card>
    ))
  )
}

export default LoadingCards
