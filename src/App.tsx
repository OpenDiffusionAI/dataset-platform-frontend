import './App.css'
import SiteNavbar from "./components/SiteNavbar/SiteNavbar.tsx";
import HomeView from "./views/HomeView/HomeView.tsx";
import DatasetsView from "./views/DatasetsView/DatasetsView.tsx";
import SiteFooter from "./components/SiteFooter/SiteFooter.tsx";
import {useEffect, useState} from "react";
import {useLocation, Location} from "react-router-dom";
import DatasetDetailView from "./views/DatasetDetailView/DatasetDetailView.tsx";

function getPathParts(location: Location): string[] {
    return (
        location.pathname.startsWith("/") ?
            location.pathname.substring(1) :
            location.pathname
    ).split('/').filter(part => part !== '');
}

function App() {

    const location = useLocation();

    const [pathParts, setPathParts] = useState<string[]>(getPathParts(location))
    const [path, setPath] = useState<string>(location.pathname)


    useEffect(() => {

        const pathParts = getPathParts(location);

        setPath(location.pathname)
        setPathParts(pathParts)
        // console.log('Location changed!', location.pathname);
    }, [location]);

    return (<>
        <div className="min-h-screen flex flex-col">

          <SiteNavbar currentPage={path}/>

          {/*<HomeView/>*/}
            {
                pathParts.length === 0 ?
                    <HomeView/> :
                    pathParts[0] === 'datasets' ?
                        <DatasetsView/> :
                        (pathParts[0] === 'dataset' ?
                            <DatasetDetailView datasetId={pathParts[1]}/> : <></>)
            }

        </div>

        <SiteFooter/>
    </>)
}

export default App
