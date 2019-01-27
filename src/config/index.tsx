const { NODE_ENV } = process.env

const isDev = NODE_ENV === 'development'

const configDevelopment = {
	admin: {
		name: 'admin',
		countMax: 100,
	},
}
const configProduction = {
	admin: {
		name: 'proadmin',
		countMax: 100,
	},
}

const config = {
	isDev,
	admin: { name: '', countMax: 0 },
	...(isDev ? configDevelopment : configProduction),
}

export default config
