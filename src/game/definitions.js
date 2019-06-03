export const Terrains = {
  ocean: {
    type: 'ocean',
    color: 'mediumblue',
    threshold: 0,
  },
  water: {
    type: 'water',
    color: 'blue',
    threshold: 0.3,
  },
  land: {
    type: 'land',
    color: 'forestgreen',
    threshold: 0.5,
  },
  mountain: {
    type: 'mountain',
    color: 'white',
    threshold: 0.8,
  },
}

export const TribesMeta = {
  count: 4,
  keys: ['kickoo', 'oumaji', 'bardur', 'hoodrick'],
}
export const Tribes = {
  kickoo: {
    type: 'kickoo',
    tech: ['fishing'],
    color: 'lawngreen',
    startingUnitType: 'warrior',
  },
  oumaji: {
    type: 'oumaji',
    tech: ['riding'],
    color: 'yellow',
    startingUnitType: 'rider',
  },
  bardur: {
    type: 'bardur',
    tech: ['hunting'],
    color: 'cadetblue',
    startingUnitType: 'warrior',
  },
  hoodrick: {
    type: 'hoodrick',
    tech: ['archery'],
    color: 'sandybrown',
    startingUnitType: 'archer',
  },
}

export const TechMeta = {
  count: 5,
}
export const Techs = {
  fishing: {
    type: 'fishing',
    cost: 5,
    unlocks: ['whailing', 'sailing'],
  },
  hunting: {
    type: 'hunting',
    cost: 5,
    unlocks: ['forestry', 'archery'],
  },
  riding: {
    type: 'riding',
    cost: 5,
    unlocks: ['trading'],
  },
  organization: {
    type: 'organization',
    cost: 5,
    unlocks: ['farming'],
  },
  climbing: {
    type: 'climbing',
    cost: 5,
    unlocks: ['mining'],
  },
  whailing: {
    type: 'whailing',
    cost: 7,
  },
  sailing: {
    type: 'sailing',
    cost: 7,
  },
  forestry: {
    type: 'forestry',
    cost: 7,
  },
  archery: {
    type: 'archery',
    cost: 7,
  },
  trading: {
    type: 'trading',
    cost: 7,
  },
  farming: {
    type: 'farming',
    cost: 7,
  },
  mining: {
    type: 'mining',
    cost: 7,
  },
}

export const Structures = {
  city: {
    type: 'city',
    graphic: '🏠',
  },
}

export const Resources = {
  camp: {
    type: 'camp',
    graphic: '⛺️',
  },
}

export const Units = {
  warrior: {
    type: 'warrior',
    graphic: '💂‍',
    range: 1,
    attack: 4,
    health: 10,
  },
  archer: {
    type: 'archer',
    graphic: '🧜‍',
    range: 1,
    attack: 3,
    health: 10,
  },
  rider: {
    type: 'rider',
    graphic: '🏇',
    range: 2,
    attack: 2,
    health: 10,
  },
}
