import { axiosInstance } from "../axios-instance"
import { Post } from "./postListSlice"

export async function getPostList(params: {
	slToken: string,
	page: number
}) {
	const { data } = await axiosInstance
		.get<{
			data: {
				page: number
				posts: Post[]
			}
		}>('/posts', {
			params: {
				sl_token: params.slToken,
				page: params.page,
			},
		})

	return data
}
