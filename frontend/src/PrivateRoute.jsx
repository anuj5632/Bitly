export default function PrivateRoute({children,publicPage}){
    const {token} = useStoreCOntext();

    if(publicPage){
        return token ? <Navigate to = "/dashboard" /> : children;
    }

    return !token ? <Navigate to = "/login" /> : children;
}