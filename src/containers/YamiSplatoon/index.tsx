import * as React from 'react'
import { connect } from 'react-redux'

import styled, { keyframes } from 'styled-components'

import { State as RootState } from '../../types'
import { TextField } from '@material-ui/core'
const Wrap = styled.div``
type Wepon = { name: string; start: number; end: number }
const data: Wepon[] = [
	{ name: 'わかば', start: 0, end: 7 },
	{ name: 'もみじ', start: 8, end: 15 },
	{ name: 'おちば', start: 16, end: 22 },
	{ name: 'スプシュ', start: 23, end: 30 },
	{ name: 'スシコラ', start: 31, end: 38 },
	{ name: 'スシベ', start: 39, end: 46 },
	{ name: '銀モデ', start: 47, end: 53 },
	{ name: '金モデ', start: 54, end: 61 },
	{ name: '銅モデ', start: 62, end: 69 },
	{ name: 'プライム', start: 70, end: 77 },
	{ name: 'プラコラ', start: 78, end: 84 },
	{ name: 'プラベ', start: 85, end: 92 },
	{ name: '52ガロン', start: 93, end: 100 },
	{ name: '52デコ', start: 101, end: 108 },
	{ name: '52別', start: 109, end: 115 },
	{ name: '96ガロン', start: 116, end: 123 },
	{ name: '96デコ', start: 124, end: 131 },
	{ name: 'ジェット', start: 132, end: 139 },
	{ name: 'ジェッカス', start: 140, end: 146 },
	{ name: '黒ZAP', start: 147, end: 154 },
	{ name: '赤ZAP', start: 155, end: 162 },
	{ name: 'ファミZAP', start: 163, end: 170 },
	{ name: 'L3リール', start: 171, end: 177 },
	{ name: 'L3D', start: 178, end: 185 },
	{ name: 'L3別', start: 186, end: 193 },
	{ name: 'H3リール', start: 194, end: 201 },
	{ name: 'H3D', start: 202, end: 208 },
	{ name: 'H3C', start: 209, end: 216 },
	{ name: 'ボトル', start: 217, end: 224 },
	{ name: 'ボトフォ', start: 225, end: 232 },
	{ name: 'シャプマ', start: 233, end: 239 },
	{ name: 'シマネ', start: 240, end: 247 },
	{ name: 'ボールド', start: 248, end: 255 },
	{ name: 'ボルネオ', start: 256, end: 263 },
	{ name: 'ボルシチ', start: 264, end: 270 },
	{ name: 'パブロ', start: 271, end: 278 },
	{ name: 'パヒュー', start: 279, end: 286 },
	{ name: 'パパブロ', start: 287, end: 294 },
	{ name: 'ホクサイ', start: 295, end: 301 },
	{ name: 'ホヒュー', start: 302, end: 309 },
	{ name: 'ホ別', start: 310, end: 317 },
	{ name: 'カーボン', start: 318, end: 325 },
	{ name: 'カボデコ', start: 326, end: 332 },
	{ name: 'ローラー', start: 333, end: 340 },
	{ name: 'ロラコラ', start: 341, end: 348 },
	{ name: 'ロラベ', start: 349, end: 356 },
	{ name: 'ヴァローラ', start: 357, end: 363 },
	{ name: 'ヴァリフォイ', start: 364, end: 371 },
	{ name: 'ダイナモ', start: 372, end: 379 },
	{ name: 'テスラ', start: 380, end: 387 },
	{ name: 'ダイナベ', start: 388, end: 394 },
	{ name: 'マニュ', start: 395, end: 402 },
	{ name: 'マニュコラ', start: 403, end: 410 },
	{ name: 'マニュベ', start: 411, end: 418 },
	{ name: 'スパッタリ', start: 419, end: 425 },
	{ name: 'スパヒュー', start: 426, end: 433 },
	{ name: 'スパクリ', start: 434, end: 441 },
	{ name: 'デュアル', start: 442, end: 449 },
	{ name: 'デュカス', start: 450, end: 456 },
	{ name: 'ケルビン', start: 457, end: 464 },
	{ name: 'ケルデコ', start: 465, end: 472 },
	{ name: 'ケル別', start: 473, end: 480 },
	{ name: 'クア黒', start: 481, end: 487 },
	{ name: 'クア白', start: 488, end: 495 },
	{ name: 'スクα', start: 496, end: 503 },
	{ name: 'スクβ', start: 504, end: 511 },
	{ name: 'スパγ', start: 512, end: 518 },
	{ name: 'スプチャ', start: 519, end: 526 },
	{ name: 'スプスコ', start: 527, end: 534 },
	{ name: 'チャーコラ', start: 535, end: 542 },
	{ name: 'スプスコラ', start: 543, end: 549 },
	{ name: 'チャー別', start: 550, end: 557 },
	{ name: 'スコ別', start: 558, end: 565 },
	{ name: 'リッター', start: 566, end: 573 },
	{ name: 'リッスコ', start: 574, end: 580 },
	{ name: 'リッカス', start: 581, end: 588 },
	{ name: 'リッカスコ', start: 589, end: 596 },
	{ name: '竹甲', start: 597, end: 604 },
	{ name: '竹乙', start: 605, end: 611 },
	{ name: '竹丙', start: 612, end: 619 },
	{ name: 'ソイチュ', start: 620, end: 627 },
	{ name: 'ソイカス', start: 628, end: 635 },
	{ name: 'ノヴァ', start: 636, end: 642 },
	{ name: 'ノヴァネオ', start: 643, end: 650 },
	{ name: 'ノヴァ別', start: 651, end: 658 },
	{ name: 'ホッブラ', start: 659, end: 666 },
	{ name: 'ホッカス', start: 667, end: 673 },
	{ name: 'ラピブラ', start: 674, end: 681 },
	{ name: 'ラピデコ', start: 682, end: 689 },
	{ name: 'ラピ別', start: 690, end: 697 },
	{ name: 'ラピエリ', start: 698, end: 704 },
	{ name: 'エリデコ', start: 705, end: 712 },
	{ name: 'ロンブラ', start: 713, end: 720 },
	{ name: 'ロンカス', start: 721, end: 728 },
	{ name: 'ロンネク', start: 729, end: 735 },
	{ name: 'クラブラ', start: 736, end: 743 },
	{ name: 'クラネオ', start: 744, end: 751 },
	{ name: 'バレスピ', start: 752, end: 759 },
	{ name: 'バレデコ', start: 760, end: 766 },
	{ name: 'バレリミ', start: 767, end: 774 },
	{ name: 'スプスピ', start: 775, end: 782 },
	{ name: 'スピコラ', start: 783, end: 790 },
	{ name: 'スピ別', start: 791, end: 797 },
	{ name: 'ハイドラ', start: 798, end: 805 },
	{ name: 'ハイカス', start: 806, end: 813 },
	{ name: 'クーゲル', start: 814, end: 821 },
	{ name: 'クーヒュー', start: 822, end: 828 },
	{ name: '銀ノチ', start: 829, end: 836 },
	{ name: '金ノチ', start: 837, end: 844 },
	{ name: 'バケスロ', start: 845, end: 852 },
	{ name: 'バケデコ', start: 853, end: 859 },
	{ name: 'バケソー', start: 860, end: 867 },
	{ name: 'ヒッセン', start: 868, end: 875 },
	{ name: 'ヒッヒュー', start: 876, end: 883 },
	{ name: 'スクスロ', start: 884, end: 890 },
	{ name: 'スクネオ', start: 891, end: 898 },
	{ name: 'スク別', start: 899, end: 906 },
	{ name: 'エクスロ', start: 907, end: 914 },
	{ name: 'エクカス', start: 915, end: 921 },
	{ name: 'オフロ', start: 922, end: 929 },
	{ name: 'フロデコ', start: 930, end: 937 },
	{ name: 'パラシェル', start: 938, end: 945 },
	{ name: 'パラソレ', start: 946, end: 952 },
	{ name: 'キャンプ', start: 953, end: 960 },
	{ name: 'キャンソレ', start: 961, end: 968 },
	{ name: 'キャンカモ', start: 969, end: 976 },
	{ name: 'スパガ', start: 977, end: 983 },
	{ name: 'スパソレ', start: 984, end: 991 },
	{ name: 'スパ別', start: 992, end: 999 },
]

export function YamiPrabe() {
	const [num, setNum] = React.useState<number>(0)
	return (
		<Wrap>
			<TextField
				type="number"
				value={num}
				onChange={e => {
					if (e.target) {
						setNum(Number(e.target.value))
					}
				}}
			></TextField>
			{data.map(wepon => (
				<div>
					{wepon.start <= num && num <= wepon.end && <li>{wepon.name}</li>}
				</div>
			))}
		</Wrap>
	)
}
