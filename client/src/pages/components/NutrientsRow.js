// Antd
import { Row, InputNumber } from "antd"

const NutrientsRow = ({ nutrients }) => {
    return (
        <Row>
            {/* <input
                value={nutrients.calories || ''}
                style={{ width: '100px', backgroundColor: 'lightBlue' }}
                disabled
            />
            <input
                value={'g'}
                style={{ width: '100px', backgroundColor: 'lightBlue' }}
                disabled
            />
            <input
                value={nutrients.calories || ''}
                style={{ width: '100px', backgroundColor: 'lightGreen' }}
                disabled
            />
            <input
                value={nutrients.calories || ''}
                style={{ width: '100px', backgroundColor: 'lightGreen' }}
                disabled
            />
            <input
                value={nutrients.calories || ''}
                style={{ width: '100px', backgroundColor: 'lightYellow' }}
                disabled
            />
            <input
                value={nutrients.calories || ''}
                style={{ width: '100px', backgroundColor: 'orange' }}
                disabled
            /> */}
            <InputNumber
                style={{ width: '100%' }}
                addonBefore='Calories'
                addonAfter="cal"
                value={nutrients.calories}
                disabled
            />
            <InputNumber
                style={{ width: '100%' }}
                addonBefore='Carbs'
                addonAfter="g"
                value={nutrients.carbs}
                disabled
            />
            <InputNumber
                style={{ width: '100%' }}
                addonBefore='Protein'
                addonAfter="g"
                value={nutrients.protein}
                disabled
            />
            <InputNumber
                style={{ width: '100%' }}
                addonBefore='Fat'
                addonAfter="g"
                value={nutrients.fat}
                disabled
            />
            <InputNumber
                style={{ width: '100%' }}
                addonBefore='Sodium'
                addonAfter="mg"
                value={nutrients.sodium}
                disabled
            />
        </Row>
    )
}

export default NutrientsRow