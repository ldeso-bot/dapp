export const CARBON_CLASSES_INFO_MAP = {
  '0xc83709888c975576c00000000000000000000311': {
    name: 'Ocean Alkalinity Enhancement (OAE)',
    category: 'Carbon Dioxide Removals',
  },
  '0xc83709888c975576c00000000000000000000312': {
    name: 'Enhanced Rock Weathering (ERW)',
    category: 'Carbon Dioxide Removals',
  },
  '0xc83709888c975576c00000000000000000000313': {
    name: 'Reducint Emissions from Deforestation and Forest Degredation (REDD)',
    category: 'Forestry',
  },
  '0xc83709888c975576c00000000000000000000314': {
    name: 'Mangroves (MNGRV)',
    category: 'Blue Carbon',
  },
};

export const isCarbonClassId = (
  id: string
): id is keyof typeof CARBON_CLASSES_INFO_MAP => {
  return id in CARBON_CLASSES_INFO_MAP;
};
