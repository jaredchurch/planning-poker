import type { VoteScale } from '../types/voting'

export const SCALES: VoteScale[] = [
  {
    id: 'fibonacci',
    label: 'Fibonacci',
    values: [1, 2, 3, 5, 8, 13, 21, 'More Info Needed'],
  },
  {
    id: 'tshirt',
    label: 'T-Shirt',
    values: ['XS', 'S', 'M', 'L', 'XL', '?', 'More Info Needed'],
  },
  {
    id: 'integers',
    label: 'Integers (1-10)',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'More Info Needed'],
  },
]

export function getScale(id: string): VoteScale | undefined {
  return SCALES.find((s) => s.id === id)
}
