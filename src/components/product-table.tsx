import React, { Children, PropsWithChildren } from 'react'

export default function ProductTable({products}: {products: Array<any>}) {
  return (
    <table className='table-auto border-collapse border border-gray-400 w-1/2 min-h-2/6 overflow-hidden'>
        <thead className='bg-gray-400'>
            <tr>
                <TableHeading>S.No</TableHeading>
                <TableHeading>Brand</TableHeading>
                <TableHeading>Category</TableHeading>
                <TableHeading>Product Name</TableHeading>
                <TableHeading>Price</TableHeading>
                <TableHeading>Availability</TableHeading>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                    <TableData>{product.id}</TableData>
                    <TableData>{product.brand}</TableData>
                    <TableData>{product.category}</TableData>
                    <TableData>{product.title}</TableData>
                    <TableData><span>&#8377;</span>{Math.round(product.price)}</TableData>
                    <TableData>{product.availabilityStatus}</TableData>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export const TableHeading: React.FC<PropsWithChildren> = ({children}) => {
    return <th className='border border-gray-300 p-2'>{children}</th>
}
export const TableData: React.FC<PropsWithChildren> = ({children}) => {
    if (children === 'Low Stock') return <th className='border border-gray-300 text-red-500 p-2 capitalize'>{children}</th>
    return <th className='border border-gray-300 p-2 capitalize'>{children}</th>
}
