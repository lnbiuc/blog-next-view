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
import '~/styles/md-alert.css';
import { alert } from '@mdit/plugin-alert';

import Card from '~/components/content/Card.vue';

export async function render(source: string) {
	const { content, md } = useNuxtMarkdown(source.replace(/\\n/g, '\n'), {
		components: {
			Card,
		},
		plugins: [
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
			}),
		],
	});

	md.value.use(anchor);

	md.value.use(mdcPlugin, {
		syntax: {
			inlineSpan: false,
		},
	});

	md.value.use(container);

	md.value.use(video, {
		bilibili: { width: '100%', height: '490' },
	});

	md.value.use(emoji);

	md.value.use(implicitFigures, {
		lazy: true,
		async: true,
		classes: 'w-full h-auto rounded-md shadow hover:shadow-lg transition-all',
		link: true,
	});

	md.value.use(todo);

	md.value.use(codeCopy, {
		iconClass:
			'i-carbon-copy w-30px h-30px text-violet opacity-50 hover:opacity-100 transition-all',
		iconStyle:
			'font-size: 1.5em;width: 20px;height: 20px;background-size: cover;display: inline-block;',
	});

	md.value.use(alert);

	md.value.renderer.rules.link_open = function (tokens: any, idx: any) {
		const token = tokens[idx];
		const href = token.attrGet('href');

		return `<a href="${href}" target="_blank" name="violet-link-inspect">`;
	};

	return content.value;
}
