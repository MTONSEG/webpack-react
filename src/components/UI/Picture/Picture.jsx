import React from "react";

export function Picture({ img, webp, ...rest }) {

	console.log(img, webp, rest)

	let imageExt = (img.slice(-7).split('.')[1]).trim();
	let type = 'image/' + imageExt;

	if (imageExt != 'png') {
		type = 'image/jpeg';
	}

	console.log(type);

	return (
		<picture>
			<source srcSet={webp} type="image/webp" />
			<source srcSet={img} type="image/jpeg" />
			<img className={rest.className} src={img} alt={rest.alt} />
		</picture>
	)
}