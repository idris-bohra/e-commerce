export function categorizeProducts(products) {
    return products.reduce((acc, product, index) => {
        const { category } = product;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push({ ...product, index });
        return acc;
    }, {});
}

export function searchProducts({ products, searchValue, minPrice, maxPrice, category }) {
    const data = products.map((product, index) => {
        const matchesSearchValue = ((searchValue == 'null' || searchValue == null) || searchValue.trim().length === 0) ? true : product.name.toLowerCase().includes(searchValue.toLowerCase());

        const productPrice = parseFloat(product.price);
        const withinPriceRange = ((minPrice != null || minPrice != "null") ? productPrice >= minPrice : true) && (maxPrice !== null ? productPrice <= maxPrice : true);

        const matchesCategory = category !== "null" ? product.category === category : true;

        if (matchesSearchValue && withinPriceRange && matchesCategory) {
            return { ...product, index };
        }
    }).filter(product => product !== undefined);

    return data;
}

export function getMinMaxPrice(products) {
    if (!products || products.length === 0) {
        return { minPrice: null, maxPrice: null };
    }

    const prices = products.map(product => parseFloat(product.price));

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { minPrice, maxPrice };
}