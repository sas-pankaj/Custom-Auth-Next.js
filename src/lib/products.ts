export async function getAllProducts() {
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) throw new Error('Fail to fetch products');
    
    const allProducts = await response.json();
    return allProducts;
}