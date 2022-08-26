import { getLatestPosts } from "../../lib/Posts";
import { NextSeo } from "next-seo";
import Paginator from "@pantheon-systems/nextjs-kit/paginator";
import Head from "next/head";
import { getUrlPath } from "../../lib/getUrlPath";
import { IMAGE_URL } from "../../lib/constants";
import Image from "next/image";
import { parse } from "html-react-parser";
import examplePaginationData from "../../../next-drupal-starter/__tests__/data/examplePaginationData.json";
import Layout from "../../components/layout";

export default function Page({ SSRPosts }) {
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
