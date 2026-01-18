import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner'
import instance from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {

  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTasksCount, setActiveTasksCount] = useState(0)
  const [completeTasksCount, setCompleteTasksCount] = useState(0)
  const [filter, setFilter] = useState('ALL')
  const [dateQuery, setDateQuery] = useState('today')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchTasks()
  }, [dateQuery])

  useEffect(() => {
    setPage(1)
  }, [filter, dateQuery])

  const fetchTasks = async () => {
    try {
      const res = await instance.get('/tasks?filter=' + dateQuery)
      setTaskBuffer(res.data.tasks)
      setActiveTasksCount(res.data.activeCount)
      setCompleteTasksCount(res.data.completeCount)
      console.log(" Tasks fetched successfully: ", res.data)
      
    } catch (error) {
      console.error(" Error fetching tasks: ", error)
      toast.error("Error fetching tasks") 
    }
  }

  const filteredTasks = taskBuffer.filter((task) => {
    // if (filter === 'ALL') {
    //   return true
    // } else if (filter === 'ACTIVE') {
    //   return task.status === 'active'
    // } else if (filter === 'COMPLETED') {
    //   return task.status === 'completed'
    // }
    switch (filter) {
      case 'ACTIVE': 
        return task.status === 'active'
      case 'COMPLETED':
        return task.status === 'completed'
      default: 
        return true
    }
  })

  const handleTaskChanged = () => {
    fetchTasks()
  }

  const handleNext = () => {
    if(page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if(page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  )

  if (visibleTasks.length === 0) {
      handlePrev()
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit)
  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
    {/* Magenta Orb Grid Background */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "#020617",
        backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
      }}
    />
  {/* Your Content/Components */}
  <div className='container relative z-10 pt-8 mx-auto'>
     <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

      <Header />
      <AddTask handleNewTaskAdded = {handleTaskChanged} />
      <StatsAndFilters 
        filter={filter}
        setFilter={setFilter}
        activeTasksCount={activeTasksCount} 
        completeTasksCount={completeTasksCount}
       />
      <TaskList 
        filteredTasks={visibleTasks}
        filter={filter}
        handleTaskChanged={handleTaskChanged}
         />
      {/* Phân trang và lọc theo ngày */}
      <div className='flex flex-col items-center justify-between gap-6 sm:flex-row '>
       <TaskListPagination 
        page={page}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handlePageChange={handlePageChange}
       />
       <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
      </div>
      <Footer 
        activeTasksCount={activeTasksCount} 
        completeTasksCount={completeTasksCount}
       />

     </div>
    </div>
</div>
  )
}

export default HomePage