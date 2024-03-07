import mdcPlugin from 'markdown-it-mdc';

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

// import lazy_loading from 'markdown-it-image-lazy-loading';

// @ts-expect-error miss type
import implicitFigures from 'markdown-it-image-figures';

// @ts-expect-error miss type
import todo from 'markdown-it-task-checkbox';

// @ts-expect-error miss type
import codeCopy from 'markdown-it-code-copy';
import { alert } from '@mdit/plugin-alert';

import Card from '~/components/content/Card.vue';
import markdownit from 'markdown-it';

export async function render(source: string) {
	const md = markdownit();

	md.use(
		await shikiji({
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		})
	);

	md.use(anchor);

	md.use(mdcPlugin, {
		syntax: {
			inlineSpan: false,
		},
	});

	md.use(container);

	md.use(video, {
		bilibili: { width: '100%', height: '490' },
	});

	md.use(emoji);

	md.use(implicitFigures, {
		lazy: true,
		async: true,
		classes:
			'w-full h-auto rounded-md shadow hover:shadow-lg transition-all blog-content-image',
		link: true,
	});

	md.use(todo);

	md.use(codeCopy, {
		iconClass:
			'i-carbon-copy w-30px h-30px text-violet opacity-50 hover:opacity-100 transition-all',
		iconStyle:
			'font-size: 1.5em;width: 20px;height: 20px;background-size: cover;display: inline-block;',
	});

	md.use(alert);

	md.renderer.rules.link_open = function (tokens: any, idx: any) {
		const token = tokens[idx];
		const href = token.attrGet('href');

		return `<a href="${href}" target="_blank" name="violet-link-inspect">`;
	};

	return md.render(source.replace(/\\n/g, '\n'));
}
