import { HashRouter, Link, Navigate, Routes, Route, useNavigate, useParams } from 'react-router-dom';

const Router = ({ children, basename = '/rate-repository-app' }) => (
    <HashRouter basename={basename}>
        {children}
    </HashRouter>
)

export { Router, Link, Navigate, Routes, Route, useNavigate, useParams };