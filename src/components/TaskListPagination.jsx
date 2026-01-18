import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils'

const TaskListPagination = ({
  handleNext, 
  handlePrev,
  page,
  totalPages,
  handlePageChange
}) => {

  const generatePages = () => {
    const pages = []
    
    if(totalPages < 4){
      // show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if(page <= 2 ){
        pages.push(1, 2, 3, '...', totalPages)
      } else if(page >= totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages)
      } else {
        pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
      }
    }
    return pages
  }

  const pagesToShow = generatePages()
  return (
    <div className='flex justify-center mt-4'>
      <Pagination>
      <PaginationContent>

        {/* Next */}
        <PaginationItem>
          <PaginationPrevious 
            onClick={page === 1 ? undefined : handlePrev}
            className={cn(
              'cursor-pointer',
              page === 1 && 'opacity-80 pointer-events-none'
            )}
           />
        </PaginationItem>

        {/* Page Numbers */}
        { pagesToShow.map((p, index) => (
          <PaginationItem key={index}>
            { p === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink 
                isActive={p === page}
                onClick={() => handlePageChange(p)}
                className={cn(
                  'cursor-pointer',
                  p === page && 'bg-primary text-white hover:bg-primary-dark'
                )}
              >
                {p}
              </PaginationLink>
            ) }
          </PaginationItem>
        )) }

        {/* Privious */}
        <PaginationItem>
          <PaginationNext 
            onClick={page === totalPages ? undefined : handleNext}
            className={cn(
              'cursor-pointer',
              page === totalPages && 'opacity-80 pointer-events-none'
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
    
  )
}

export default TaskListPagination