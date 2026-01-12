import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
  return (
    <div>
      <Card
        className="p-8 text-center boder-0 bg-gradient-card shadow-custom-md"
      >
        <div className='space-y-3'>
          <Circle className='mx-auto size-12 text-muted-foreground' />
          <div>
            <h3 className='font-midium text-foreground'>
              {
                filter === 'ALL'
                  ? 'You are no tasks'
                  : filter === "COMPLETED"
                  ? 'You are no completed tasks'
                  :'You are no tasks'
              }
            </h3>

            <p className='text-sm text-muted-foreground'>
                {
                  filter === 'ALL' ? ' Add new task to start your todo list.' : 
                  `Move "All" to see your tasks ${filter === "ACIVE" ? "completed" : "pending"}.`
                }
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TaskEmptyState