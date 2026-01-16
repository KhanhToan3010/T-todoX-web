import React from 'react'

const Footer = ({ completeTasksCount = 0, activeTasksCount = 0}) => {
  return (
    <div>
      <>
        { completeTasksCount + activeTasksCount > 0 && (
          <div className='text-center'>
            <p className='text-sm text-muted-foreground'>
              { completeTasksCount > 0 && (
                <>
                  🎉 Good job! You have completed {completeTasksCount} tasks, {
                    activeTasksCount > 0 && `Just ${activeTasksCount} more to go!`
                  } 
                </>
              )}

              { completeTasksCount === 0 && activeTasksCount > 0 && (
                <>
                  🚀 Let's get started! You have {activeTasksCount} tasks to complete.
                </>
              )}
            </p>
          </div>
        )}
      </>
    </div>
  )
}

export default Footer