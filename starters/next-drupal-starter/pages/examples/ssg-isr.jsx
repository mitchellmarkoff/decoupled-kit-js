import { NextSeo } from "next-seo";
import { isMultiLanguage } from "../../lib/isMultiLanguage";
import {
  getCurrentLocaleStore,
  globalDrupalStateStores,
} from "../../lib/drupalStateContext";
import { BUILD_MODE } from "../../lib/constants";

import { ArticleGridItem, withGrid } from "../../components/grid";
import Layout from "../../components/layout";
import PageHeader from "../../components/page-header";

export default function SSGISRExampleTemplate({
  articles,
  footerMenu,
  hrefLang,
  multiLanguage,
}) {
  const ArticleGrid = withGrid(ArticleGridItem);

  return (
    <Layout footerMenu={footerMenu}>
      <NextSeo
        title="Decoupled Next Drupal Demo"
        description="Generated by create next app."
        languageAlternates={hrefLang || false}
      />
      <>
        <PageHeader title="Articles" />
        <div className="mt-8 prose lg:prose-xl max-w-lg mx-auto lg:grid-cols-3 lg:max-w-screen-lg">
          <p>
            <em>
              By default, this starter kit is optimized for SSR and Edge Caching
              on Pantheon. This example instead uses Incremental Static
              Regeneration and is provided as a reference for cases where
              Next.js static generation options would be beneficial.
            </em>
          </p>
        </div>
        <section>
          <ArticleGrid
            data={articles}
            contentType="articles"
            multiLanguage={multiLanguage}
          />
        </section>
      </>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const origin = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const { locales } = context;
  // if there is more than one language in context.locales,
  // assume multilanguage is enabled.
  const multiLanguage = isMultiLanguage(locales);
  const hrefLang = locales.map((locale) => {
    return {
      hrefLang: locale,
      href: origin + "/" + locale,
    };
  });

  try {
    const store = getCurrentLocaleStore(
      context.locale,
      globalDrupalStateStores
    );

    const articles = await store.getObject({
      objectName: "node--article",
      params: "include=field_media_image.field_media_image",
      refresh: !BUILD_MODE,
    });

    if (!articles) {
      throw new Error(
        "No articles returned. Make sure the objectName and params are valid!"
      );
    }

    const footerMenu = await store.getObject({
      objectName: "menu_items--main",
      refresh: !BUILD_MODE,
    });

    return {
      props: { articles, hrefLang, multiLanguage, footerMenu },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Unable to fetch data for articles page: ", error);
    return {
      notFound: true,
      revalidate: 5,
    };
  }
}
