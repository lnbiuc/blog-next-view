import { defineMongooseModel } from '#nuxt/mongoose';

export const ScreenshotSchema = defineMongooseModel({
	name: 'Screenshot',
	schema: {
		url: {
			type: String,
			required: true,
			unique: true,
		},
		filePath: {
			type: String,
			required: true,
		},
	},
	options: {
		timestamps: true,
	},
});
