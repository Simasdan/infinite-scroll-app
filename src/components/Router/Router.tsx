import React, { useEffect, useState } from 'react'

interface Route {
    path: string;
    component: React.ComponentType;
}

interface RouterProps {
    routes: Route[]
}

const Router = ({ routes }: RouterProps) => {

    const [currentPath, setCurrentPath] = useState<string>(window.location.pathname)

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationChange)
        window.addEventListener('locationchange', onLocationChange);

        return () => {
            window.addEventListener('popstate', onLocationChange);
            window.removeEventListener('locationchange', onLocationChange)
        }
    }, [])

    const CurrentComponent = routes.find(route => route.path === currentPath)?.component;

    return CurrentComponent ? <CurrentComponent/> : <div>404 Not Found</div>
}

export default Router