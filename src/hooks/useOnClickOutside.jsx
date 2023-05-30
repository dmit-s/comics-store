import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            if(!ref.current || Array.isArray(ref.current) ? ref.current.find(item => item === e.target) : ref.current.contains(e.target)) return;
            handler();
        };

        document.addEventListener('mousedown', listener, {capture: true});
        document.addEventListener('touchstart', listener, {capture: true});

        return () => {
            document.removeEventListener('mousedown', listener, {capture: true});
            document.removeEventListener('touchstart', listener, {capture: true});
        };
    }, [ref, handler]);
}