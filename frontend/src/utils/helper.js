import { subDomainList } from "./constant";

export const getApps = () =>{
    const subdomain = getSubDomain(window.location.hostname);
    
    const mainApp = subDomainList.find((app) => app.main);
    if(subdomain ==="") return mainApp.app;

    const apps = subDomainList.find((app) => subdomain === app.subdomain);

    return apps? apps.app : mainApp.app;
}

export const getSubDomain = (location) => {
    const locationParts = location.split(".");
    const islocalhost = locationParts.slice(-1)[0] === "localhost";
    const sliceTail = islocalhost ? -1 : -2;
    return locationParts.slice(0, sliceTail).join(".");
}
