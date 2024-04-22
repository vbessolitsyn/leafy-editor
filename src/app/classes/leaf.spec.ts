import { Leaf } from './leaf';

describe('Leaf', () => {
  it('should create an instance', () => {
    expect(new Leaf('01', 'title', '')).toBeTruthy();
  });
});
