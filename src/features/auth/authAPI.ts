import { axiosInstance } from "../axios-instance"

export function auth(authParams: {
	email: string,
	name: string
}) {
	return axiosInstance
		.post('/register', {
			// TODO: move to const
			client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
			...authParams
		})
}
