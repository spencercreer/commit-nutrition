// React
import { useState } from 'react'
// Antd
import { Modal, Card, Calendar, Button, Alert, message } from 'antd'
// Utils
import { usePost } from '../../utils/API'
import moment from 'moment'

const CalendarModal = ({ mealData, visible, handleCloseModal }) => {
  const [newDate, setNewDate] = useState()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState()
  const [createMeal] = usePost('/api/meal')

  const onChange = (value) => {
    setNewDate(value)
  }

  const handleSubmit = () => {
    setLoading(true)
    createMeal({
      ...mealData,
      _id: null,
      date: moment(newDate).format('L')
    })
      .then(res => {
        if (!res.success) {
          setAlert('We found a meal plan with the same date. Edit the existing meal plan or change the date.')
        } else {
          message.success('Meal plan added successfully!')
        }
        setLoading(false)
      })
      .catch(err => {
        setAlert('We were not able to save this meal plan. Please try again.')
        console.log(err)
        setLoading(false)
      })
  }

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
                loading={loading}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        ]

  return (
        <Modal
            // title={loading ? <Skeleton loading paragraph={{ rows: 0 }} /> : `${mealData.name} Details`}
            visible={visible}
            onCancel={handleCloseModal}
            footer={footerButtons}
        >
            <Card
                style={{
                  width: '100%'
                }}
                bordered={false}
            >
                <Calendar
                    fullscreen={false}
                    onPanelChange={onChange}
                    onChange={onChange}
                />
            </Card>
            {
                alert && <Alert message={alert} type='error' />
            }
        </Modal>
  )
}

export default CalendarModal
