"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { formateDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/navigation";

interface Props {
    buyers: BuyerType[],
    pagination: { page: number, limit: number, total: number, totalPages: number };
}

const BuyerTable = ({ buyers, pagination }: Props) => {
    const router = useRouter();


    return (
        <div className="px-5 py-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Property Type</TableHead>
                        <TableHead>Budget (min-max)</TableHead>
                        <TableHead>Timeline</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>UpdatedAt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        buyers.map((buyer) => (
                            <TableRow onClick={() => router.push(`/buyers/${buyer.id}`)} key={buyer.id} className="cursor-pointer">
                                <TableCell className="text-left">{buyer.fullname}</TableCell>
                                <TableCell className="text-left">{buyer.phone}</TableCell>
                                <TableCell className="text-left">{buyer.city}</TableCell>
                                <TableCell className="text-left">{buyer.property}</TableCell>
                                <TableCell className="text-left">{`$${buyer.budgetMin} - $${buyer.budgetMax}`}</TableCell>
                                <TableCell className="text-left">{buyer.timeline}</TableCell>
                                <TableCell className="text-left">{buyer.status}</TableCell>
                                <TableCell className="text-left">{formateDate(buyer.updatedAt as string)}</TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
            <Pagination className="mt-4">
                <PaginationContent>
                    {/* Previous button */}
                    <PaginationItem>
                        <PaginationPrevious
                            href={`/buyers?page=${Math.max(1, pagination.page - 1)}`}
                        />
                    </PaginationItem>

                    {/* Number of pages */}
                    {/* Numbered pages */}
                    {Array.from({ length: pagination.totalPages }).map((_, i) => {
                        const pageNum = i + 1
                        return (
                            <PaginationItem key={pageNum}>
                                <PaginationLink
                                    href={`/buyers?page=${pageNum}`}
                                    isActive={pageNum === pagination.page}
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}


                    {/* Next button */}
                    <PaginationItem>
                        <PaginationNext
                            href={`/buyers?page=${Math.min(
                                pagination.totalPages,
                                pagination.page + 1
                            )}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default BuyerTable