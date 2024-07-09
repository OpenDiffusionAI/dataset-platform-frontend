import { useState, useEffect } from 'react';
import { useLocation, Location } from 'react-router-dom';

function getPathParts(location: Location): string[] {
    return (
        location.pathname.startsWith("/") ?
            location.pathname.substring(1) :
            location.pathname
    ).split('/').filter(part => part !== '');
}

export function usePathParts() {
    const location = useLocation();

    const [pathParts, setPathParts] = useState<string[]>(getPathParts(location))
    const [path, setPath] = useState<string>(location.pathname)

    useEffect(() => {
        const pathParts = getPathParts(location);

        setPath(location.pathname)
        setPathParts(pathParts)
    }, [location]);

    return { path, pathParts };
}