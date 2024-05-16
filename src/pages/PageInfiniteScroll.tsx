import { useData } from "../services/hooks/useData.tsx";
import { useEffect, useState } from 'react';
import Card from "../components/Card.tsx";

export default function PageInfiniteScroll() {
    const [page, setPage] = useState(1);
    const {items, isLoading, isError} = useData(page, 16);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollHeight < document.documentElement.offsetHeight - 20 || isLoading) {
            return;
        }
        setPage(page + 1)
    }
    useEffect(() => {
        setPage(page + 1)
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => removeEventListener("scroll", handleScroll);
    }, [isLoading]);

    return (<div>
        <div className="grid grid-cols-4 gap-4">
            {items.map((item: any, index) => {
                return <Card key={index} {...item}/>
            })}
        </div>
        <div className="mt-16">
            {isLoading ? <h2>Loading...</h2> : null}
            {isError ? <h2>Error during getting data</h2> : null}
        </div>
    </div>)
}