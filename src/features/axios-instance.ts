import axios from "axios";

const axiosInstance = axios.create({
	baseURL: 'https://api.supermetrics.com/assignment',
});

axiosInstance.interceptors.request.use((config) => config, error => {
	return Promise.reject(error)
})

axiosInstance.interceptors.response.use((config) => config, error => {
	if (error.response.data.error.message === 'Invalid SL Token') {
		localStorage.removeItem('slToken')
	}

	return Promise.reject(error)
})

export { axiosInstance }
