/* 2019/12/24 🌲 */

/**
 *   ★
 *22/\56 0 6 2(6/2-0)
 *1/22\1
 */

const size = 40
const rightLeaf = '\\'
const leftLeaf = '/'
// const rules = 'pos'

const parts = (h: number, w: number) => {
	if (Math.random() < 0.03) return 'o'
	if (Math.random() < 0.03) return '&'
	if (Math.random() < 0.03) return 'i'
	if (Math.random() < 0.03) return 'J'
	if (h % 3 === 0) return 'v'
	if ((w + h) % 4 === 0) return '#'
	return ' '
}
const margin = (i: number) => ' '.repeat(Math.max(0, size - i))
const makeLine = (n: number) => {
	const draw = ' '.repeat(size * 2).split('')
	const lp = size - n
	const rp = size + n + 1

	for (let i = lp + 1; i < rp; i++) {
		draw[i] = parts(n, i)
	}
	draw[lp] = leftLeaf
	draw[rp] = rightLeaf

	return draw.join('')
}

const treeHead = margin(0) + '💩'
const treeMain = [...Array(size).keys()].map(makeLine)

console.log([treeHead, ...treeMain].join('\n'))
