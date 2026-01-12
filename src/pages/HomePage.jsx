import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

const HomePage = () => {

  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTasksCount, setActiveTasksCount] = useState(0)
  const [completedTasksCount, setCompletedTasksCount] = useState(0)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/tasks')
      setTaskBuffer(res.data.tasks)
      setActiveTasksCount(res.data.activeCount)
      setCompletedTasksCount(res.data.completeCount)
      console.log(" Tasks fetched successfully: ", res.data)
      
    } catch (error) {
      console.error(" Error fetching tasks: ", error)
      toast.error("Error fetching tasks") 
    }
  }

  const filteredTasks = taskBuffer.filter((task) => {
    if (filter === 'ALL') {
      return true
    } else if (filter === 'ACTIVE') {
      return task.status === 'active'
    } else if (filter === 'COMPLETED') {
      return task.status === 'completed'
    }
  })
  return (
    <div className="relative w-full min-h-screen bg-white">
  {/* Dual Gradient Overlay Swapped Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
      `,
      backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
    }}
  />
     {/* Your Content/Components */}

     <div className='container relative z-10 pt-8 mx-auto'>
     <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

      <Header />
      <AddTask />
      <StatsAndFilters 
        filter={filter}
        setFilter={setFilter}
        activeTasksCount={activeTasksCount} 
        completedTasksCount={completedTasksCount}
       />
      <TaskList filteredTasks={filteredTasks} filter={filter} />
      {/* Phân trang và lọc theo ngày */}
      <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
       <TaskListPagination />
       <DateTimeFilter />
      </div>
      <Footer 
        activeTasksCount={activeTasksCount} 
        completedTasksCount={completedTasksCount}
       />

     </div>
    </div>
</div>
   
  )
}

export default HomePage