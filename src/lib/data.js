export const FilterType = {
  ALL: 'all',
  ACTIVE: 'pending',
  COMPLETED: 'completed',
}

export const options = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value:'week',
    label: 'This Week',
  },
  {
    value: 'month',
    label: 'This Month',
  },
  {
    value: 'all',
    label: 'All',
  }
]

export const visibleTaskLimit = 4