import { useData } from "../services/hooks/useData.tsx";
import { useEffect, useRef, useState } from 'react';
import Card from "../components/Card.tsx";

export default function PageIntersectionObserver() {
    const [page, setPage] = useState(1);
    const {items, isLoading, isError} = useData(page, 16);
    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                //console.log('call fetch data')
                setPage(page + 1)
            }
        }, {threshold: 1.0});

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [isLoading])


    return (<div>
        <div className="grid grid-cols-4 gap-4">
            {items.map((item: any, index) => {
                return <Card key={index} {...item}/>
            })}
        </div>
        <div ref={observerTarget}></div>
        <div className="mt-16">
            {isLoading ? <h2>Loading...</h2> : null}
            {isError ? <h2>Error during getting data</h2> : null}
        </div>
    </div>)
}