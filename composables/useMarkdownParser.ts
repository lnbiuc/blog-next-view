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
import MermaidLang from 'shiki/langs/mermaid.mjs';
import NginxLang from 'shiki/langs/nginx.mjs';
import DockerfileLang from 'shiki/langs/dockerfile.mjs';
import GraphQLLang from 'shiki/langs/graphql.mjs';
import MarkdownLang from 'shiki/langs/markdown.mjs';
import MDXLang from 'shiki/langs/mdx.mjs';
import BatLang from 'shiki/langs/bat.mjs';
import BashLang from 'shiki/langs/bash.mjs';
import IniLang from 'shiki/langs/ini.mjs';

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
										bash: BashLang,
										sql: SQLLang,
										mermaid: MermaidLang,
										nginx: NginxLang,
										Dockerfile: DockerfileLang,
										docker: DockerfileLang,
										dockerfile: DockerfileLang,
										graphql: GraphQLLang,
										gql: GraphQLLang,
										md: MarkdownLang,
										markdown: MarkdownLang,
										mdx: MDXLang,
										bat: BatLang,
										ini: IniLang,
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
