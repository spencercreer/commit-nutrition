import Chart from 'react-google-charts'

const NutrientsChart = ({ nutrients }) => {
    return (
        <Chart
            width={'100%'}
            height={'100%'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Calories', '%'],
                ['Carbs', nutrients.carbs * 4],
                ['Protein', nutrients.protein * 4],
                ['Fat', nutrients.fat * 9],
            ]}
            options={{
                title: 'Nutrients',
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    )
}

export default NutrientsChart