import { axiosInstance } from "../axios-instance"

export function auth(authParams: {
	email: string,
	name: string
}) {
	return axiosInstance
		.post('/register', {
			client_id: process.env.CLIENT_ID,
			...authParams
		})
}
