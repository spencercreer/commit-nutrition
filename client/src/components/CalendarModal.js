import { Modal, Calendar, Skeleton, Button } from 'antd'
import { Card } from 'antd'

const CalendarModal = ({ visible }) => {
   const loading = false
   const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return (
    <Modal
    // title={loading ? <Skeleton loading paragraph={{ rows: 0 }} /> : `${mealData.name} Details`}
    visible={visible}
    // onCancel={handleCloseModal}
    // footer={footerButtons}
>
    {
        loading ?
            <Skeleton loading />
            :
            <Card
                style={{
                    width: '100%',
                }}
                bordered={false}
            >
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </Card>
    }
</Modal>
  )
}

export default CalendarModal