import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

//Icons
import { ImSearch } from "react-icons/im";
import { FaListUl } from "react-icons/fa";

//Components
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useProducts } from "../context/ProductsContext";
import { filterProducts, searchProducts, createQueryObject, getInitialQuery } from "../helpers/helper";

//Styles
import styles from "./ProductsPage.module.css"

const ProductsPage = () => {
    const products = useProducts();

    const [displayed, setDisplayed] = useState([]);

    const [search, setSearch] = useState("");

    const [query, setQuery] = useState({});

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setDisplayed(products)
        setQuery(getInitialQuery(searchParams));
    }, [products]);

    useEffect(() => {
        setSearchParams(query);
        setSearch(query.search || "");
        let finalProducts = searchProducts(products, query.search);
        finalProducts = filterProducts(finalProducts, query.category);
        setDisplayed(finalProducts);
    }, [query]);

    const clickHandler = () => {
        setQuery((query) => createQueryObject(query, { search }));
    };

    const categoriHandler = (event) => {
        const { tagName } = event.target;
        const category = event.target.innerText.toLowerCase();
        if (tagName !== "LI") return;
        setQuery((query) => createQueryObject(query, { category }));
    };


    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value.toLowerCase().trim())}
                />
                <button onClick={clickHandler}>
                    <ImSearch />
                </button>
            </div>

            <div className={styles.container}>
                {!displayed.length && <Loader />}
                <div className={styles.products}>
                    {displayed.map((p) => (
                        <Card key={p.id} data={p} />
                    ))}
                </div>
                <div>
                    <div>
                        <FaListUl />
                        <p>Categories</p>
                    </div>
                    <ul onClick={categoriHandler}>
                        <li>All</li>
                        <li>Electronics</li>
                        <li>Jewelery</li>
                        <li>Men's Clothing</li>
                        <li>Women's Clothing</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;