import { AxiosResponse } from "axios"
import { axiosInstance } from "../axios-instance"
import { Post } from "./postListSlice"

// {
//     "meta": {
//         "request_id": "OHNmU9Q6HSSOT4nlqJrZ6em6ID1IKfjn"
//     },
//     "data": {
//         "page": 1,
//         "posts": [
//             {
//                 "id": "post6252bab06289c_5eecbe5e",
//                 "from_name": "Britany Heise",
//                 "from_id": "user_4",
//                 "message": "feature lighter menu lighter feature trick prestige tie faithful clerk depression uncle address waist environmental prosecute chaos fling urine concept electronics skeleton representative survivor find terrify meet pedestrian brick witness shy race pavement",
//                 "type": "status",
//                 "created_time": "2022-04-10T05:18:39+00:00"
//             },
//         ]
//     }
// }

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
