"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignUp;
const jsx_runtime_1 = require("react/jsx-runtime");
// import React from 'react';
function SignUp() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "\u30B5\u30A4\u30F3\u30A2\u30C3\u30D7" }), (0, jsx_runtime_1.jsxs)("form", { action: "/signUp", method: "post", children: [(0, jsx_runtime_1.jsx)("label", { children: "\u30E6\u30FC\u30B6\u540D" }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "text", name: "user_name" }), (0, jsx_runtime_1.jsx)("label", { children: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9" }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "email", name: "email" }), (0, jsx_runtime_1.jsx)("label", { children: "\u30D1\u30B9\u30EF\u30FC\u30C9" }), (0, jsx_runtime_1.jsx)("input", { required: true, type: "password", name: "password" })] })] }));
}
