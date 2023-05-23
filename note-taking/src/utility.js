import {useState, useEffect} from 'react';


export function useDebounce (value, delay) {
    const [debounceValue, setDebounceValue] = useState();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(handler)
        };
    }, [value, delay]);

    return debounceValue;
}

export const removeHTMLTags = (str) => {
    return str.replace(/<[^>]*>?/gm, '');
}