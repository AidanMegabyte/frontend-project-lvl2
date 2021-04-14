import * as path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const getFixturePath = (fixtureFileName) => path.resolve(process.cwd(), `__fixtures__/${fixtureFileName}`);
