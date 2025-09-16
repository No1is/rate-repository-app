import { HashRouter, Link, Navigate, Routes, Route, useNavigate, useParams } from 'react-router-dom';

const Router = ({ children }) => (
    <HashRouter>
        {children}
    </HashRouter>
)

export { Router, Link, Navigate, Routes, Route, useNavigate, useParams };