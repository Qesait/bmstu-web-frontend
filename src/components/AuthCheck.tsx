import React, { ReactNode } from 'react';

interface AuthCheckProps {
    children: ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const expires_at_iso = localStorage.getItem("expires_at")
    const expires_at = expires_at_iso ? new Date(expires_at_iso) : null
    const access = expires_at && expires_at > new Date()

    return access ? (
        <>{children}</>
    ) : (
        <h2 className="text-center">Для доступа к данной странице нужно авторизоваться</h2>
    );
};

export default AuthCheck;
