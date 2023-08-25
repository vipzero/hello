import { initializeApp } from 'firebase/app'
import {
	getFirestore,
	getDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
} from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDmBmOASz3gX6T_pEFRC4EFXsV26HT0Srw',
	authDomain: 'hello-anov0.firebaseapp.com',
	projectId: 'hello-anov0',
	storageBucket: 'hello-anov0.appspot.com',
	messagingSenderId: '566068378366',
	appId: '1:566068378366:web:7f58d30489cb0f9fe083af',
}
const app = initializeApp(firebaseConfig)

export type Team = {
	id: string
	name: string
	players: string[]
}

export type Battle = {
	win: boolean
	from: string
	to: string
}

export type Board = {
	teams: Team[]
	battles: Battle[]
}
const boardRef = () => doc(collection(db, 'boards'), 'board')

const db = getFirestore()
export const getBoards = async () => {
	return (await getDoc(boardRef())) as unknown as Board
}
export const subscribeBoards = (updateBoard: (board: Board) => void) => {
	return onSnapshot(boardRef(), (doc) => {
		updateBoard(doc.data() as unknown as Board)
	})
}

export const saveBoards = async (data: Board) => {
	await updateDoc(boardRef(), data)
}
