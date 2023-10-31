import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    if (!user) {
        navigate("/signin");
        return null;
    }

    return <>{children}</>;
};

export default Protected;
