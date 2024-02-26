import { defineMongooseModel } from '#nuxt/mongoose';

export const ArticleSchema = defineMongooseModel({
	name: 'Article',
	schema: {
		shortLink: {
			type: String,
			unique: true,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		cover: {
			type: String,
		},
		category: {
			type: String,
		},
		tags: {
			type: [String],
		},
		content: {
			type: String,
		},
		authorId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
		},
		views: {
			type: Number,
		},
		likes: {
			type: Number,
		},
		ogImage: {
			type: String,
		},
		link: {
			type: String,
		},
		html: {
			type: String,
		},
	},
	options: {
		timestamps: true,
	},
});
