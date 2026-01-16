import React, { useState } from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import instance from '@/lib/axios';
import { toast } from 'sonner';

const TaskCard = ({ task, index, handleTaskChanged }) => {

  const [isEditing, setIsEditing] = useState(false)
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '')
  

  const deleteTask = async (taskId) => {
    try {
      await instance.delete(`/tasks/${taskId}`)
      toast.success('Task deleted successfully')
      handleTaskChanged()
      
    } catch (error) {
      console.error("Error deleting task:", error)
      toast.error("Error deleting task")
    }
  }

  const updateTask = async () => {
    try {
      setIsEditing(false)
      await instance.put(`/tasks/${task._id}`, { title: updateTaskTitle })
      toast.success('Task updated successfully')
      handleTaskChanged()
    } catch (error) {
      console.error("Error updating task:", error)
      toast.error("Error updating task")
    }
  }

  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status === 'active') {
        await instance.put(`/tasks/${task._id}`, { 
          status: 'completed',
          completedAt: new Date().toISOString()
        })
        toast.success(`Task ${task.title} marked as completed successfully`)
      }else {
        await instance.put(`/tasks/${task._id}`, { 
          status: 'active',
          completedAt: null
        })
        toast.success(`Task ${task.title} marked as active successfully`)
      }
      handleTaskChanged()
      }
     catch (error) {
      console.error("Error updating task:", error)
      toast.error("Error updating task")
    }
  }
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      updateTask()
  }}

  return (
   <Card className={cn(
    "p-4 bg-gradient-card boder-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animation-fade-in group",
    task.status === 'completed' & 'opacity-75'
   )}
    style={{ animationDelay: `${index * 50}ms` }}
   >
    <div className='flex items-center gap-4'>
      {/* Btn Circle */}
      <Button
        variant='ghost'
        size='icon'
        className={cn(
          "flex-shirnk-0 size-8 rounded-full transition-all duration-200 ",
          task.status === 'completed'
            ? "text-success hover:text-success/80"
            : "text-muted-foreground hover:text-primary"
        )}
        onClick={toggleTaskCompleteButton}
      >
        { task.status === 'completed' ? (
          <CheckCircle2 className='size-5' />
        ) : (
          <Circle className='size-5' />
        )}
      </Button>

      {/* Show or Edit Task Title */}
      <div className='flex-1 min-w-0'>
        { isEditing ? (
          <Input
            placeholder='Task Title'
            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
            type="text"
            value={updateTaskTitle}
            onChange={(e) => setUpdateTaskTitle(e.target.value)}
            onKeyPress={ handleKeyPress }
            onBlur = {() => {
              setIsEditing(false)
              setUpdateTaskTitle(task.title || "")
            }}
          />
        ) : (
          <p
            className= {cn(
              "text-base transition-all duration-200",
              task.status === 'completed'
                ? "line-through text-muted-foreground"
                : "text-foreground"
            )}
          >
            {task.title}
          </p>
        )}

       {/* Created At & Completed At */}
       <div className='flex items-center gap-2 mt-1'>
          <Calendar className='size-3 text-muted-foreground' />
          <span className='text-sm text-muted-foreground'>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          { task.completedAt && (
            <>
              <span className='text-xs text-muted-foreground'> - </span>
              <Calendar className='size-3 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>
            {new Date(task.completedAt).toLocaleDateString()}
          </span>
            </>
          )}
       </div>
      </div>


        {/* Btn Edit - Delete */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
         {/* Btn Edit */}
         <Button
          variant='ghost'
          size='icon'
          className='transition-colors flex-shirnk-0 size-8 text-muted-foreground hover:text-info'
          onClick={() => {
            setIsEditing(true), 
            setUpdateTaskTitle(task.title || '')
            }
          } 
         >
          <SquarePen className='size-4' />
         </Button>

        {/* Btn Delete */}
        <Button
          variant='ghost'
          size='icon'
          className='transition-colors flex-shirnk-0 size-8 text-muted-foreground hover:text-destructive'
          onClick={() => deleteTask(task._id)}
         >
          <Trash2 className='size-4' />
         </Button>

        </div>
    </div>
   </Card>
  )
}

export default TaskCard