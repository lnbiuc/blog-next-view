import { ArticleSchema } from '~/server/models/article.schema';

export default defineEventHandler(async event => {
	const id = event.context.params?.id;
	try {
		const result = await ArticleSchema.findOneAndUpdate(
			{ _id: id },
			{ $inc: { views: 1 } },
			{ new: true }
		);

		if (!result) throw new Error('article not found');

		return { success: true };
	} catch (error) {
		return error;
	}
});
