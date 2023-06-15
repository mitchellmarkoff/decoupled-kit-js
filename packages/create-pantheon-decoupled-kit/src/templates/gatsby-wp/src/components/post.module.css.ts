import { TemplateFn } from '@cli/types';

const css: TemplateFn = ({ data, utils }) => /* CSS */ `.container {
	margin-top: var(--12);
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 0;
	max-width: var(--lg);
	min-width: var(--md);
}

.mainTitle {
	font-size: var(--14);
	font-weight: 800;
	margin-bottom: var(--10);
}

.date {
	font-size: var(--3);
	line-height: var(--8);
	color: var(--gray-600);
}

.img {
	border-radius: var(--2);
	width: 100%;
	aspect-ratio: 16/9;
	margin-left: auto;
	margin-right: auto;
}

.imgWrapper {
	width: max-content;
}

.link, .prev, .next {
	font-size: var(--5);
	text-decoration-line: underline;
	color: var(--black);
}

.prev, .next {
	font-weight: 500;
}

.next {
	margin-left: auto;
}

.prev {
	margin-right: auto;
}

.content, .paragraphContent {
	margin-top: var(--12);
}

.paragraphContent {
	${utils.if(data.tailwindcss, '@apply prose;')}
	overflow-wrap: break-word;
	font-size: var(--5);
}

.hr {
	width: 100%;
	margin-top: var(--10);
	margin-bottom: var(--10);
	margin-left: 0;
	margin-right: 0;
	opacity: 0.3;
}

.nav {
	display: flex;
	flex-wrap: wrap;
	padding: 0 var(--6);
}


/* lg breakpoint */
@media (max-width: 1024px) {
	.container {
		padding: var(--4);
		max-width: var(--md);
	}

	.mainTitle {
		font-size: var(--9);
	}
}
`;

export default css;
