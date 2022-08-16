// Antd
import { Select } from 'antd'

const { Option } = Select

const FilterSelect = ({ defaultValue, handleFilterChange, categories }) => {
    return (
        <Select
            style={{ width: '100%', marginBottom: '10px' }}
            defaultValue={defaultValue}
            onChange={(event) => handleFilterChange(event)}
        >
            {
                categories.map(({ label, value }) => (
                    <Option
                        key={`${value}_select`}
                        value={value}
                    >
                        {label}
                    </Option>
                ))
            }
        </Select>
    )
}

export default FilterSelect
