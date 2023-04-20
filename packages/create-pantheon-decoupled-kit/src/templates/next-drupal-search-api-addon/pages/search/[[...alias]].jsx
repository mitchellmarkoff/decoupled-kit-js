import { NextSeo } from 'next-seo';
import { isMultiLanguage } from '../../lib/isMultiLanguage.js';
import {
	getCurrentLocaleStore,
	globalDrupalStateStores,
} from '../../lib/stores';
import { getDrupalSearchResults } from '@pantheon-systems/drupal-kit';
import Layout from '../../components/layout';
import PageHeader from '../../components/page-header';
import Link from 'next/link';

export default function SearchPage({
	hrefLang,
	footerMenu,
	expectedResults,
	searchResults,
	multiLanguage,
	locale,
	error,
}) {
	return (
		<Layout footerMenu={footerMenu ? footerMenu : null}>
			<NextSeo
				title="Decoupled Next Drupal Demo"
				description="Generated by create-pantheon-decoupled-kit."
				languageAlternates={hrefLang || false}
			/>
			<PageHeader title="Search Results" />
			{error ? (
				<div className="flex flex-col mx-auto text-xl prose text-center mt-12">
					<span>An error occurred while fetching search results</span>
				</div>
			) : (
				<section className="prose lg:prose-xl mt-10 flex flex-col mx-auto max-h-screen">
					<div className="max-w-lg mx-auto lg:max-w-screen-lg">
						{searchResults?.length > 0 ? (
							<ul>
								{searchResults?.map(({ title, body, path }) => (
									<li className="prose justify-items-start mt-8" key={path?.pid}>
										<h2>{title}</h2>
										{body.summary ? (
											<div dangerouslySetInnerHTML={{ __html: body?.summary }} />
										) : null}
										<Link
											passHref
											href={`${
												multiLanguage ? `/${path?.langcode || locale}` : ''
											}${path.alias}`}
											className="font-normal underline"
										>
											Read more →
										</Link>
									</li>
								))}
							</ul>
						) : (
							<div className="mt-12 mx-auto max-w-[50vw]">
								<p className="text-xl text-center">
									{expectedResults
										? 'No Results Found'
										: 'Enter a term to start searching'}
								</p>
							</div>
						)}
					</div>
				</section>
			)}
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
	const {
		locales,
		locale,
		res,
		query: { alias },
	} = context;

	// if there is more than one language in context.locales,
	// assume multilanguage is enabled.
	const multiLanguage = isMultiLanguage(locales);
	const hrefLang = locales.map((locale) => {
		return {
			hrefLang: locale,
			href: origin + '/' + locale,
		};
	});

	const store = getCurrentLocaleStore(locale, globalDrupalStateStores);

	let expectedResults = false;

	try {
		const footerMenu = await store.getObject({
			objectName: 'menu_items--main',
			refresh: true,
			res: context.res,
			anon: true,
		});

		const searchTerm = alias ? [alias] : null;
		const searchResults = (
			await getDrupalSearchResults({
				apiUrl: process.env.BACKEND_URL,
				locale: locale,
				query: searchTerm,
				response: res,
			})
		).data.map((value) => {
			// restructure response to match expected article object structure
			return value.attributes;
		});

		// Differentiate between the user attempting a search or accessing the root /search
		if (searchTerm) {
			expectedResults = true;
		}

		return {
			props: {
				footerMenu,
				hrefLang,
				multiLanguage,
				locale,
				expectedResults,
				searchResults,
				error: false,
			},
		};
	} catch (error) {
		console.error('Unable to fetch search page: ', error);
		return {
			props: {
				error: true,
			},
		};
	}
}
