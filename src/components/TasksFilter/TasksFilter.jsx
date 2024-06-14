/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types'

export default function TasksFilter({ filter = 'all', onFilterChange = () => {} }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'all' ? 'selected' : ''} onClick={() => onFilterChange('all')}>
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}
