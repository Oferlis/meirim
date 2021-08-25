const Exception = require('../../../api/model/exception');
const { getTagsResources } = require('../tags/tags_resources');

const taggingFunctions = [
	require('../tags/housing'),
	require('../tags/public'),
	require('../tags/ecological_bottlenecks/ecological_bottlenecks')
];


const getPlanTagger = async () => {
	const resources = await getTagsResources();

	return async (plan) => {
		const planTags = [];
		for (const tagFunction of taggingFunctions) {
			const result = await tagFunction.doesTagApply(plan, resources);

			if (result !== null) {
				planTags.push(result);
			}

		}
		return planTags;
	};
};


module.exports = {
	getPlanTagger
};