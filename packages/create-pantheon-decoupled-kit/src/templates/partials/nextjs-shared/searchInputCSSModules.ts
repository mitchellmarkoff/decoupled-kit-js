export const searchInputCSSModules = () => /* css */ `.container {
	display: flex; 
	position: relative; 
	align-items: stretch; 
	width: 100%; 
	padding-top: var(--9);
}

.searchInput {
	padding-left: var(--3);
	padding-right: var(--3); 
	margin-right: calc(var(--0_5) * -1);
	background-color: transparent; 
	transition-duration: 200ms; 
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); 
	font-size: var(--4);
	line-height: var(--6); 
	font-weight: 400; 
	height: 100%; 
	border-top-left-radius: var(--1);
	border-bottom-left-radius: var(--1); 
	border-width: var(--px); 
	border-style: solid; 
	outline: 0; 
}

.searchInput:focus { 
	box-shadow: inset 0 0 0 1px rgb(59,113,202)
}

.searchBtn {
	display: flex; 
	position: relative; 
	padding-top: var(--2_5);
	padding-bottom: var(--2_5); 
	padding-left: var(--6);
	padding-right: var(--6); 
	color: #ffffff; 
	background-color: rgb(37 99 235) !important;
	align-items: center; 
	border-top-right-radius: var(--1);
	border-bottom-right-radius: var(--1); 
	box-shadow: var(--0) var(--1) var(--1_5) calc(var(--px) * -1) rgba(0, 0, 0, 0.1), var(--0) var(--0_5) var(--1) calc(var(--px) * -1) rgba(0, 0, 0, 0.06); 
}

.searchBtn:hover {
	box-shadow: var(--0) var(--2_5) var(--4) calc(var(--0_5) * -1) rgba(0, 0, 0, 0.1), var(--0) var(--1) var(--1_5) calc(var(--0_5) * -1) rgba(0, 0, 0, 0.05); 
	background-color: rgb(29 78 216);
}

.icon {
	width: var(--5); 
	height: var(--5); 
}

`;
