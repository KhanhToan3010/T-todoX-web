import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import instance from '@/lib/axios'

const HomePage = () => {

  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTasksCount, setActiveTasksCount] = useState(0)
  const [completeTasksCount, setCompleteTasksCount] = useState(0)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await instance.get('/tasks')
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
        filteredTasks={filteredTasks}
        filter={filter}
        handleTaskChanged={handleTaskChanged}
         />
      {/* Phân trang và lọc theo ngày */}
      <div className='flex flex-col items-center justify-between gap-6 sm:flex-row '>
       <TaskListPagination />
       <DateTimeFilter />
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