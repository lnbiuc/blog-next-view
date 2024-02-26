import mdcPlugin from 'markdown-it-mdc';
import MarkdownIt from 'markdown-it';
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
	const md = MarkdownIt();

	// const {
	// 	config, // configs in use, currently for debuging purposes
	// 	content, // rendered content from markdown-it
	// 	md, // main parser/renderer
	// 	rendered, // rendered vue component based on `content`
	// } = useNuxtMarkdown(source.replace(/\\n/g, '\n'), {
	// 	components: {
	// 		Card,
	// 	},
	// 	plugins: [
	// 		anchor,
	// 		await shikiji({
	// 			themes: {
	// 				light: 'github-light',
	// 				dark: 'github-dark',
	// 			},
	// 			transformers: [
	// 				transformerNotationDiff(),
	// 				transformerNotationHighlight(),
	// 				transformerNotationWordHighlight(),
	// 				transformerNotationFocus(),
	// 				transformerMetaHighlight(),
	// 			],
	// 		}),
	// 	],
	// });
	md.use(anchor);

	md.use(
		await shikiji({
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		})
	);
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

	// md.value.use(lazy_loading);

	md.use(implicitFigures, {
		lazy: true,
		async: true,
		classes: 'w-full h-auto rounded-md shadow hover:shadow-lg transition-all',
	});

	md.use(todo);

	md.use(codeCopy, {
		iconClass:
			'i-carbon-copy w-30px h-30px text-violet opacity-50 hover:opacity-100 transition-all',
		iconStyle:
			'font-size: 1.5em;width: 20px;height: 20px;background-size: cover;display: inline-block;',
	});

	md.use(alert);

	const content = md.render(source.replace(/\\n/g, '\n'));

	return { content };
}
