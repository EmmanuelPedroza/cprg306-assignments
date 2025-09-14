"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const MyCustomLinks = ({name, path, fallbackURL}) => {
    const [isValidPath, setIsValidPath] = useState(null);
    const [finalPath, setFinalPath] = useState(path);
    
    // if assignment is not done yet, open in new tab
    const openInNewTab = {
        ...(isValidPath === false) && 
        {   
            target: "_blank", 
            rel: "noopener noreferrer"
        }
    }

    // checks if path is valid
    const validatePath = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' })
            if (response.ok) {
                setIsValidPath(true);
                setFinalPath(url);
            } else {
                setIsValidPath(false);
                setFinalPath(fallbackURL);
            }
        } catch (error) {
            setIsValidPath(false);
            setFinalPath(fallbackURL);
        }
    }

    useEffect( () => {
        validatePath(path);
    },[path, fallbackURL])

    return (
        <div className="mb-1">
            {
                isValidPath === null ? <p>Checking Assignment Path...</p> :   (
                <Link className="nav-link" href={finalPath} {...openInNewTab}>
                    {name} {isValidPath ? ": Done ✅" : ": Not Done Yet (Links to Assignment Page) ❌"}
                </Link>
                )
            }
        </div>
    );
}

export default MyCustomLinks;