import ErrorBoundary from "./components/ErrorBoundary.tsx";
import './App.css'
import './index.css'
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import PageLoadMore from "./pages/PageLoadMore.tsx";
import PageInfiniteScroll from "./pages/PageInfiniteScroll.tsx";
import PageIntersectionObserver from "./pages/PageIntersectionObserver.tsx";
// import PageVirtual from "./pages/PageVirtual.tsx";

export default function App() {
    return (<ErrorBoundary>
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
            <Route element={<Layout/>}>
                <Route path="/load-more" element={<PageLoadMore/>}/>
            </Route>
            <Route element={<Layout/>}>
                <Route path="/infinite-scroll" element={<PageInfiniteScroll/>}/>
            </Route>
            <Route element={<Layout/>}>
                <Route path="/intersection-observer" element={<PageIntersectionObserver/>}/>
            </Route>
            {/*<Route element={<Layout/>}>*/}
            {/*    <Route path="/virtual-window" element={<PageVirtual/>}/>*/}
            {/*</Route>*/}
        </Routes>
    </ErrorBoundary>)
}
