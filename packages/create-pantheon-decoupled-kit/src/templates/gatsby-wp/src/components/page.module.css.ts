import { TemplateFn } from '@cli/types';

const css: TemplateFn = ({ data, utils }) => /* CSS */ `
.container {
	margin-top: var(--12);
	margin-bottom: 0;
	margin-left: auto;
	margin-right: auto;
	max-width: var(--lg);
	min-width: var(--md);
}

.mainTitle {
	font-size: var(--14);
	font-weight: 800;
	margin-bottom: var(--10);
}

.link {
	color: var(--black);
	font-size: var(--5);
	text-decoration-line: underline;
}

.date {
	font-size: var(--3);
	line-height: var(--8);
	color: var(--gray-600);
}

.content, .paragraphContent {
	margin-top: var(--12);
}

.paragraphContent {
	${utils.if(data.tailwindcss, '@apply prose;')}
	overflow-wrap: break-word;
	line-height: var(--8);
	font-size: var(--5);
}

.img {
	border-radius: var(--2);
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
	padding-left: var(--6);
	padding-right: var(--6);
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
	margin-right: auto;
}

.prev {
	margin-left: auto;
}

/* lg breakpoint */
@media (max-width: 1024px) {
	.container {
		padding: var(--4);
		max-width: var(--md);
	}

	.containerTitle {
		font-size: var(--9);
	}
}
`;

export default css;
