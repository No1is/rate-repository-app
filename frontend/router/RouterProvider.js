import { Platform } from 'react-native';

let Router, Link, Navigate, Routes, Route, useNavigate, useParams;

if (Platform.OS === 'web') {
    const dom = require('react-router-dom')
    Router = ({ children }) => (
        <dom.HashRouter basename='/rate-repository-app'>{children}</dom.HashRouter>
    );
    ({ Link, Navigate, Routes, Route, useNavigate, useParams } = dom);
} else {
    const native = require('react-router-native');
    Router = native.NativeRouter;
    ({ Link, Navigate, Routes, Route, useNavigate, useParams } = native);
}

export { Router, Link, Navigate, Routes, Route, useNavigate, useParams };