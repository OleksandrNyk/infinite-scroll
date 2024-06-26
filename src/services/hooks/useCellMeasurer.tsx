import { useCallback, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { renderToString } from "react-dom/server";
import ResizeObserver from "resize-observer-polyfill";

/**
 * This custom hook is designed to replace the `<CellMeasurer />` component in `react-virtualized`
 * in `react-window`
 *
 * This hook returns props to be given to the `<VariableSizeList />` component in `react-window`
 *
 * `items` are react elements
 */
export default function useCellMeasurer({items}) {
    // create a ref to get the `div` element the `VariableSizeList` uses
    const innerRef = useRef(null);
    const shortId = nanoid();

    // create an unique to this cell measurer instance
    const id = shortId;

    // create a "hidden sizing element" in state.
    //
    // when the innerRef element mounts, the width of the innerRef will be used for width of
    // the hidden sizing element
    const [hiddenSizingEl, setHiddenSizingEl] = useState(null);

    // this width is used to determine whether or not the list needs to be re-rendered due to a resize
    const [width, setWidth] = useState(0);

    // `itemSize` is a function required by `VariableSizeList`. This function is called when it needs
    // get the height of the item inside it.
    // note: the result of this function is memoized by `react-window` so it will only be called once
    // to get the item size
    const itemSize = useCallback(index => {
        if (!hiddenSizingEl) return 0;

        // get the item (which is a react node)
        const item = items[index];
        // then render the react node to a string sychronusly with `react-dom/server`
        hiddenSizingEl.innerHTML = renderToString(item);

        // get and return the size of the hidden sizing element
        return hiddenSizingEl.clientHeight || 0;
    }, [hiddenSizingEl, items]);

    // this effects adds the hidden sizing element to the DOM
    useEffect(() => {
        /** @type {HTMLElement} */
        const innerEl = innerRef.current;
        if (!innerEl) return;
        if (hiddenSizingEl) return;

        const newHiddenSizingEl = document.createElement("div");

        const width = innerEl.clientWidth;
        newHiddenSizingEl.classList.add(`hidden-sizing-element-${id}`);
        newHiddenSizingEl.style.position = "absolute";
        newHiddenSizingEl.style.top = "0";
        newHiddenSizingEl.style.width = `${width}px`;
        newHiddenSizingEl.style.pointerEvents = "none";
        newHiddenSizingEl.style.visibility = "hidden";

        setHiddenSizingEl(newHiddenSizingEl);

        document.body.appendChild(newHiddenSizingEl);
    }, [hiddenSizingEl, id]);

    // this removes all hidden sizing elemnts on unmount
    useEffect(() => {
        // returning a function from `useEffect` is the "clean-up" phase
        return () => {
            const hiddenSizingElement = document.querySelector(`.hidden-sizing-element-${id}`);

            document.body.removeChild(hiddenSizingElement);
        };
    }, [id]);

    // this is used to watch for changes in the size of the list element and sets the width
    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;

        function handleResize() {
            const {width} = el.getBoundingClientRect();
            setWidth(width);
        }

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(el);

        return () => resizeObserver.disconnect();
    }, []);

    // this key is used to re-render the list when the dependncies array changes
    const key = shortId;

    // while there is no hidden sizing element, hide the list element
    const style = hiddenSizingEl ? undefined : {
        visibility: "hidden"
    };

    return {
        innerRef, itemSize, itemCount: items.length, key, style
    };
}