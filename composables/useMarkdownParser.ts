// composables/useMarkdownParser.ts
// Import package exports
import { createMarkdownParser, rehypeHighlight, createShikiHighlighter } from '@nuxtjs/mdc/runtime';
// Import desired Shiki themes and languages
import GithubDark from 'shiki/themes/github-dark-default.mjs';
import GithubLight from 'shiki/themes/github-light-default.mjs';
import HtmlLang from 'shiki/langs/html.mjs';
import MdcLang from 'shiki/langs/mdc.mjs';
import TsLang from 'shiki/langs/typescript.mjs';
import VueLang from 'shiki/langs/vue.mjs';
import YamlLang from 'shiki/langs/yaml.mjs';
import JSONLang from 'shiki/langs/json.mjs';
import JavaLong from 'shiki/langs/java.mjs';
import JavaScriptLang from 'shiki/langs/javascript.mjs';
import ShellLang from 'shiki/langs/shell.mjs';
import SQLLang from 'shiki/langs/sql.mjs';

export function useMarkdownParser() {
	let parser: Awaited<ReturnType<typeof createMarkdownParser>>;

	const parse = async (markdown: string) => {
		if (!parser) {
			parser = await createMarkdownParser({
				rehype: {
					plugins: {
						highlight: {
							instance: rehypeHighlight,
							options: {
								// Pass in your desired theme(s)
								theme: ['github-dark-default', 'github-light-default'],
								// Create the Shiki highlighter
								highlighter: createShikiHighlighter({
									bundledThemes: {
										'github-dark-default': GithubDark,
										'github-light-default': GithubLight,
									},
									// Configure the bundled languages
									bundledLangs: {
										html: HtmlLang,
										mdc: MdcLang,
										vue: VueLang,
										yml: YamlLang,
										yaml: YamlLang,
										ts: TsLang,
										typescript: TsLang,
										json: JSONLang,
										java: JavaLong,
										js: JavaScriptLang,
										javascript: JavaScriptLang,
										shell: ShellLang,
										sh: ShellLang,
										sql: SQLLang,
									},
								}),
							},
						},
					},
				},
			});
		}
		return parser(markdown);
	};

	return parse;
}
