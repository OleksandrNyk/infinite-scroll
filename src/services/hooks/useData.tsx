import { useEffect, useState } from "react";

interface Items {
    title: string;
    author_name: string;
    first_publish_year: string;
    cover_i: string;
    number_of_pages_median: string;
    ratings_average: string;
    first_sentence: [];
}


export const useData = (page = 1, limit = 20) => {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function fetchMoreData() {
            setIsLoading(true);
            setIsError(false);
            try {
                const responseItems = await fetch(`https://openlibrary.org/search.json?q=lord&offset=${page * limit - limit}&limit=${limit}&fields=title,author_name,first_publish_year,cover_i,number_of_pages_median,ratings_average,first_sentence`);

                const itemsJson = (await responseItems.json()) as Items;
                if (!ignore) {
                    setItems((prevItems) => [...prevItems, ...itemsJson.docs]);
                    itemsJson.data && itemsJson.data.length > 0 ? setHasMore(true) : setHasMore(false);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error)
                setIsError(error);
                setIsLoading(false);
            }
        }

        fetchMoreData()

        return () => {
            ignore = true;
        };
    }, [page]);


    return {
        isError, isLoading, items, hasMore
    }
}