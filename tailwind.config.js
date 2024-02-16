/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",

		// path tremor node_modules
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		transparent: "transparent",
    	current: "currentColor",
		extend: {
			tremor: {
				
			}
		},
	},
	plugins: [],
};
