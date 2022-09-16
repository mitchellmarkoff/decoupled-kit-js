import React from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { useRouter } from 'next/router';
import { isNumber } from '../types/index';

interface ContentProps {
	title: string;
	imageProps?: ImageProps;
	content: string;
	date?: string;
}

/**
 *
 * @param props - The props needed for the ContentWithImage component
 * @param props.title - The title of your content
 * @param props.imageProps - All props the user wishes to pass to the next/image component. @see {@link https://nextjs.org/docs/api-reference/next/image} for all next/image documentation
 * @param props.content - Content from a CMS, usually a string of raw HTML. This string will be set as `dangerouslySetInnerHTML`
 * @param props.date - An optional date to be displayed on the post
 * @returns A component with a featured image and content passed by the user
 * @remarks
 * imageProps is an optional prop to be used if there is an image to be associated with the content.
 * If imageProps is used it is required that the user passes in values for src, width, and height.
 */
const ContentWithImage: React.FC<ContentProps> = ({
	title,
	imageProps,
	content,
	date,
}: ContentProps) => {
	const router = useRouter();

	// if (isString(imageProps?.height) && isString(imageProps?.width)) {
	// 	style = `h-${imageProps?.height} py-0.5 px-3 rounded text-white font-semibold text-xl border-2`};
	// };

	return (
		<div>
			<article className="prose lg:prose-xl mt-10 mx-auto">
				<h1>{title}</h1>
				{date ? <p className="text-sm text-gray-600">{date}</p> : null}

				<a onClick={() => router.back()} className="font-normal">
					Back &rarr;
				</a>
				{/* mx-auto */}
				<div className="mt-12 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-screen-lg">
					{imageProps ? (
						<div>
							{isNumber(imageProps.height) && isNumber(imageProps.width) ? (
								<div
									className={`h-[${imageProps.height}px] w-[${imageProps.width}px] rounded-lg shadow-lg overflow-hidden mx-auto`}
								>
									<Image {...imageProps} />
								</div>
							) : (
								<div className="rounded-lg shadow-lg overflow-hidden mx-auto">
									<Image {...imageProps} />
								</div>
							)}
						</div>
					) : null}
				</div>

				<div
					className="break-words mt-12"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</article>
			<div>
				<h1>Hello</h1>
			</div>
		</div>
	);
};

export default ContentWithImage;
