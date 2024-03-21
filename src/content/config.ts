import { defineCollection, z } from 'astro:content';

const components = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			image: image(),
			order: z.number()
		})
});

export const collections = { components };
