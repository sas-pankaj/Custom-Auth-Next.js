import ProductChart from "@/components/product-chart";
import ProductTable from "@/components/product-table";
import { getAllProducts } from "@/lib/products";
import React, { Suspense } from "react";

export default async function page() {
  const products = await getAllProducts();

  return (
    <>
      <h1 className="text-center">Dashboar for Login user only</h1>
        <section className="p-8 h-2/5">
          <div className="flex justify-between">
            <ProductTable products={products.products}/>
            <ProductChart products={products.products}/>
          </div>
        </section>
    </>
  );
}

export function CustomErrorComponent() {
  return (
    <h2>Something went wrong</h2>
  )
}
