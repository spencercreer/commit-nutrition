// React
import { useState } from 'react'
import { Modal, Calendar, Skeleton, Button } from 'antd'
import { Card } from 'antd'
import { usePost } from '../utils/API'

const CalendarModal = ({ mealData, visible, handleCloseModal }) => {
    const [newDate, setNewDate] = useState()
    const [createMeal] = usePost('/api/meals')

    const loading = false
    const onChange = (value) => {
        console.log(value)
        setNewDate(value)
    }

    const handleSubmit = () => {
        console.log({
            ...mealData,
            _id: null,
            date: newDate,
        })
        createMeal({
            ...mealData,
            _id: null,
            date: newDate,
        })
            .then(res => {
                console.log(res)
                if (!res.success) {
                    //   setAlert('We found a meal plan with the same date. Edit the existing meal plan or change the date.')
                } else {
                    console.log('meal added')
                    //   message.success(`Meal plan added successfully!`)
                    //   resetForm()
                }
                // setLoading(false)
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
                // loading={loading}
                onClick={handleSubmit}
            >
                Submit
            </Button>,
        ]

    return (
        <Modal
            // title={loading ? <Skeleton loading paragraph={{ rows: 0 }} /> : `${mealData.name} Details`}
            visible={visible}
            onCancel={handleCloseModal}
            footer={footerButtons}
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
                        <Calendar
                            fullscreen={false}
                            onPanelChange={onChange}
                            onChange={onChange}
                        />
                    </Card>
            }
        </Modal>
    )
}

export default CalendarModal