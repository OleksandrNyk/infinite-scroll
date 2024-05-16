import { Link } from "react-router-dom";

export default function Head() {
    return (<div className="my-4 flex w-full flex-row items-center justify-between lg:my-8 lg:flex-row">
        <nav className="w-full">
            <ul className="flex flex-wrap items-center justify-between w-full">
                <li>
                    <Link to={`/`}>Home</Link>
                </li>
                <li>
                    <Link to={`/load-more`}>Load more on click</Link>
                </li>
                <li>
                    <Link to={`/infinite-scroll`}>Infinite Scroll</Link>
                </li>
                <li>
                    <Link to={`/intersection-observer`}>Intersection Observer</Link>
                </li>
                {/*<li>*/}
                {/*    <Link to={`/virtual-window`}>Virtual react-window</Link>*/}
                {/*</li>*/}
            </ul>
        </nav>
    </div>);
}
