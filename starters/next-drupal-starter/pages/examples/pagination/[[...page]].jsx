import { DrupalState } from "@pantheon-systems/drupal-kit";

import {
  getCurrentLocaleStore,
  globalDrupalStateStores,
} from "../../../lib/stores";
import { BUILD_MODE } from "../../../lib/constants";
import examplePaginationData from "../../../__tests__/data/examplePaginationData.json";

import Paginator from "@pantheon-systems/nextjs-kit/paginator";
// import Paginator from "../../../components/paginator";
import Head from "next/head";
import Layout from "../../../components/layout";

// To use your configured backend, use:
// const drupalUrl = DRUPAL_URL

// Example paginated data set
const drupalUrl = "https://dev-ds-demo.pantheonsite.io";

export default function PaginationExampleTemplate({ data, footerMenu }) {
  // configurable itemsPerPage
  const itemsPerPage = 10;

  // Component that we can pass into Paginator.
  // Paginator will use this component to render the data to be paginated
  const RenderCurrentItems = ({ currentItems }) => {
    return currentItems.map((item) => {
      return (
        <article
          key={item.id}
          className="flex flex-col p-3 w-fit mx-auto mb-10"
        >
          <h2 className="justify-start my-auto text-2xl mb-2">{item.title}</h2>
          <p className="max-w-prose my-2">
            {item?.body.value.substr(0, 150)}...
          </p>
        </article>
      );
    });
  };

  return (
    <Paginator
      data={examplePaginationData}
      itemsPerPage={10}
      breakpoints={{ start: 6, end: 12, add: 6 }}
      routing
      Component={RenderCurrentItems}
    />
  );
}
