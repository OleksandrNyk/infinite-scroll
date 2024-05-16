import { useState } from 'react';
import { useData } from "../services/hooks/useData.tsx";
import Card from "../components/Card.tsx";
import useCellMeasurer from "../services/hooks/useCellMeasurer.tsx";
import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeList as List } from 'react-window';


export default function PageVirtual() {
    const [page, setPage] = useState(1);
    const {items, isLoading, hasMore} = useData(page, 10);
    const cellMeasurerProps = useCellMeasurer({items});

    const isItemLoaded = (index: number) => index < items.length || !hasMore;

    const loadMoreItems = () => {
        if (isLoading || !hasMore) {
            return Promise.resolve;
        }
        return setPage(page + 1);
    }

    const Row = ({index, style}: any) => {
        if (!isItemLoaded(index)) {
            // You can return a loading indicator here
            return <div style={style}>Loading...</div>;
        }

        const item = items[index];
        return <Card key={index} style={style}/>;
    };
    const itemCount = hasMore ? items.length + 1 : items.length;


    return (<InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
    >
        {({onItemsRendered, ref}) => (<List
            height={600}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={'100%'}

        >
            {Row}
        </List>)}
    </InfiniteLoader>)
}