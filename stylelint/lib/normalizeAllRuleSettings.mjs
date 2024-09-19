import getStylelintRule from './utils/getStylelintRule.mjs';
import normalizeRuleSettings from './normalizeRuleSettings.mjs';

/** @import {Config as StylelintConfig} from 'stylelint' */

/**
 * @param {StylelintConfig} config
 * @return {Promise<StylelintConfig>}
 */
export default async function normalizeAllRuleSettings(options, config) {
	if (!config.rules) return config;

	/** @type {StylelintConfig['rules']} */
	const normalizedRules = {};
	
	for (const [ruleName, rawRuleSettings] of Object.entries(config.rules)) {
		// filter out rules if --only is provided; e.g. --only "A" --only "B"
		if (options.only.length > 0 && !options.only.includes(ruleName)) {
			continue;
		}
		
		const rule = await getStylelintRule(ruleName, config);

		if (rule) {
			normalizedRules[ruleName] = normalizeRuleSettings(rawRuleSettings, rule);
		} else {
			normalizedRules[ruleName] = [];
		}
	}

	config.rules = normalizedRules;

	return config;
}
