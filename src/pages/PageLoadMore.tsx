import { useData } from "../services/hooks/useData.tsx";
import { useState } from 'react';
import Card from "../components/Card.tsx";

export default function PageLoadMore() {
    const [page, setPage] = useState(1);
    const {items, isLoading, isError} = useData(page);

    const onLoadMoreClick = () => {
        setPage(page + 1)
    }

    return (<div>
        <div className="grid grid-cols-4 gap-4">
            {items.map((item: any, index) => {
                return <Card key={index} {...item}/>
            })}
        </div>
        <div className="mt-16">
            {isLoading ? <h2>Loading...</h2> : null}
            {isError ? <h2>Error during getting data</h2> : null}
            <button onClick={onLoadMoreClick}
                    className="bg-indigo-500  hover:bg-indigo-600 px-6 py-2 cursor-pointer text-white">Load
                more
            </button>
        </div>
    </div>)
}