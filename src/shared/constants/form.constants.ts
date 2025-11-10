import { allocatableTokens } from './tokens.constants';

export const ALLOCATION_TOKENS_FORM_INPUT_ITEMS = Object.entries(
  allocatableTokens
).map(([key, token]) => ({
  value: key,
  label: token.symbol,
  icon: token.icon(),
}));
