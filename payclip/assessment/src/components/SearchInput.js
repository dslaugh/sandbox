import React from "react";

export default function SearchInput(props) {
	return <input type="text" id="search" onKeyUp={ props.onKeyUp } placeholder="Search..." />;
}
