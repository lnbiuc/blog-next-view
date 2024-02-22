import markdownit from 'markdown-it';
import shikiji from '@shikijs/markdown-it';
import {
	transformerMetaHighlight,
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
} from '@shikijs/transformers';
import anchor from 'markdown-it-anchor';

// @ts-expect-error miss type
import video from '@vrcd-community/markdown-it-video';
import container from 'markdown-it-container';

// @ts-expect-error miss type
import { full as emoji } from 'markdown-it-emoji';

// @ts-expect-error miss type
import lazy_loading from 'markdown-it-image-lazy-loading';

// @ts-expect-error miss type
import todo from 'markdown-it-task-lists';

// @ts-expect-error miss type
import codeCopy from 'markdown-it-code-copy';

export async function render(source: string) {
	const md = markdownit();

	md.use(
		await shikiji({
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
			transformers: [
				transformerNotationDiff(),
				transformerNotationHighlight(),
				transformerNotationWordHighlight(),
				transformerNotationFocus(),
				transformerMetaHighlight(),
			],
		})
	);

	md.use(anchor);

	md.use(container);

	md.use(video);

	md.use(emoji);

	md.use(lazy_loading);

	md.use(todo);

	md.use(codeCopy, {
		iconClass:
			'i-carbon-copy w-30px h-30px text-violet opacity-50 hover:opacity-100 transition-all',
		iconStyle:
			'font-size: 1.5em;width: 20px;height: 20px;background-size: cover;display: inline-block;',
	});

	return await md.render(source.replace(/\\n/g, '\n'));
}
