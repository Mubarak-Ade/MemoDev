import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { useFilterStore } from '@/store/FilteStore'
import clsx from 'clsx'

interface PaginatinBarProps {
    totalPages: number
}
export const PaginationBar = ({ totalPages }: PaginatinBarProps) => {
    const currentPage = useFilterStore(s => s.page)
    const safeTotalPages = Math.max(0, totalPages)
    const pageNumber = Array.from({ length: safeTotalPages }, (_, i) => i + 1)

    const setPage = useFilterStore((s) => s.setPage)

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1)
        }
        
    }

    const goToNextPage = () => {
        if (safeTotalPages > 0 && currentPage < safeTotalPages) {
            setPage(currentPage + 1)
        }
    }

    return (
        <div className="mt-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem onClick={goToPrevPage}>
                        <PaginationPrevious
                            className="p-5"
                            aria-disabled={currentPage <= 1}
                        >
                            Prev
                        </PaginationPrevious>
                    </PaginationItem>
                    {pageNumber.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={currentPage === page}
                                className={clsx(currentPage === page ? 'bg-primary' : '')}
                                onClick={() => setPage(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            className="p-5"
                            onClick={goToNextPage}
                            aria-disabled={safeTotalPages === 0 || currentPage >= safeTotalPages}
                        >
                            Next
                        </PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
