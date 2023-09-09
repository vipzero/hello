import { initializeApp } from 'firebase/app'
import {
	DocumentData,
	QueryDocumentSnapshot,
	SnapshotOptions,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	onSnapshot,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import { Board, Member } from './constants'
// import { members } from './seed'

const firebaseConfig = {
	apiKey: 'AIzaSyDmBmOASz3gX6T_pEFRC4EFXsV26HT0Srw',
	authDomain: 'hello-anov0.firebaseapp.com',
	projectId: 'hello-anov0',
	storageBucket: 'hello-anov0.appspot.com',
	messagingSenderId: '566068378366',
	appId: '1:566068378366:web:7f58d30489cb0f9fe083af',
}
const app = initializeApp(firebaseConfig)

const boardRef = () => doc(collection(db, 'boards'), 'board')
const membersRef = () =>
	collection(db, 'members').withConverter(memberConverter)

const db = getFirestore()
export const getBoards = async () => {
	return (await getDoc(boardRef())) as unknown as Board
}
export const subscribeBoards = (updateBoard: (board: Board) => void) => {
	return onSnapshot(boardRef(), (doc) => {
		updateBoard(doc.data() as unknown as Board)
	})
}

export const updateBoard = async (data: Board) => {
	await updateDoc(boardRef(), data)
}

export const getMembers = async () => {
	const snap = await getDocs(membersRef())
	// if (snap.docs.length === 0) {
	// 	saveMembers(members)
	// }
	return snap.docs.map((d) => d.data())
}

export const saveMembers = (members: Record<string, Member>) =>
	Promise.all(
		Object.entries(members).map(([id, member]) =>
			setDoc(doc(membersRef(), id), member)
		)
	)

const memberConverter = {
	toFirestore(member: Member): DocumentData {
		return {
			name: member.name,
			weapons: member.weapons,
		}
	},
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): Member {
		const data = snapshot.data(options)!
		return {
			name: data.name,
			weapons: data.weapons,
		}
	},
}
