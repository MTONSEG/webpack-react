import React from "react"
import './App.scss';
import img from './assets/images/1.jpg';
import imgWebp from './assets/images/1.jpg?as=webp';
import icon from './assets/icons/close.svg';
import png from './assets/images/loading.png';
import pngWebp from './assets/images/loading.png?as=webp';
import { Picture } from "./components/UI/Picture/Picture.jsx";

export function App() {
	return (
		<>
			<Picture img={img} webp={imgWebp} className="hello" alt="image" />
			<Picture img={png} webp={imgWebp} className="hello" />
			<h1 className="title">Hello, World</h1>
		</>
	)
}