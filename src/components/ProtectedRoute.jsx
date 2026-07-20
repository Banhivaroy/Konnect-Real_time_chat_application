import { div } from 'framer-motion/client';
import React,{useState,useEffect} from 'react'
import { Navigate,useLocation } from 'react-router-dom'


function ProtectedRoute({ children }) {
    const [loading,setLoading] = useState(true);
    const [authenticated,setAuthenticated] = useState(false);
    const location = useLocation();

    useEffect (() =>{
        fetch(`${import.meta.env.VITE_BACKEND_URL}/me`,{
            credentials: "include"
        })
        .then((res) =>{
            if(res.ok){
                setAuthenticated(true);
            } else{
                setAuthenticated(false);
            }
        })
        .catch(() => setAuthenticated(false))
        .finally(() => setLoading(false))
    },[])
    if(loading) return (
        <div> Loading ......</div>
    )
    
    if(!authenticated){
        return (
            <Navigate
            to = "/login"
            state = {{ from : location}}
            replace 
            />
        )
    }
  return children;
}

export default ProtectedRoute
