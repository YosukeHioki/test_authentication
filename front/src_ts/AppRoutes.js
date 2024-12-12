"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppRoutes;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const SignUp_1 = __importDefault(require("./components/SignUp"));
const LogIn_1 = __importDefault(require("./components/LogIn"));
function AppRoutes() {
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)("div", { children: "TEST" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signUp", element: (0, jsx_runtime_1.jsx)(SignUp_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/logIn", element: (0, jsx_runtime_1.jsx)(LogIn_1.default, {}) })] }));
}
