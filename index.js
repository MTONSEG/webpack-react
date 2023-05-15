import React from "react";
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { App } from "./App.jsx";
import './styles/index.scss';
import { state } from "./state.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root'))
	.render(
		<BrowserRouter>
			<App store={state} />
		</BrowserRouter>
	);

