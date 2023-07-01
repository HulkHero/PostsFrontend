import axios from "axios"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


const fetchMyPosts = (id, token) => {
    return axios.get(`https://nice-plum-panda-tam.cyclic.app/myPosts/${id}`, {
        headers: {
            'Authorization': token
        }
    })

}

export const useMyPostsRK = (id, token) => {


    return useQuery(['myposts'], () => fetchMyPosts(id, token), {
        select: (data) => data.data
    })

}



const LikePost = ({ storyId, userId }) => {
    console.log("like post", storyId, userId)
    return axios.put(`https://nice-plum-panda-tam.cyclic.app/likePost/${storyId}/${userId}`)
}

export const useLikePostRK = (id) => {
    console.log("like sada", id)
    const kueryClient = useQueryClient()
    return useMutation(LikePost, {
        onMutate: async (newData) => {
            console.log("new data", newData)
            await kueryClient.cancelQueries(['myposts'])
            const previousData = kueryClient.getQueryData(['myposts'])
            kueryClient.setQueryData(['myposts'], (oldData) => {
                const data = oldData.data.map((val) => {
                    if (val._id == newData.storyId) {
                        val.likes.push(id)
                        return val
                    }
                    else {
                        return val
                    }
                })
                return { data }
            })
            return { previousData }
        },
        onError: (err, newData, context) => {
            kueryClient.setQueryData(['myposts'], context.previousData)
        },
        onSettled: () => {
            kueryClient.invalidateQueries(['myposts'])
        }

    })
}


// onSuccess: (newData) => {
//     //kueryClient.invalidateQueries(['myposts'])
//     kueryClient.setQueryData(['myposts'], (oldData) => {
//         console.log("old data", oldData.data)
//         console.log("new data", newData.data)

//         const data = oldData.data.map((val) => {
//             if (val._id == newData.data._id) {
//                 val.likes.push(id)
//                 return val
//             }
//             else {
//                 return val
//             }
//         }
//         )
//         console.log("after update data", data)
//         return { data: data }

//     })
// }


const disLikePost = ({ storyId, userId }) => {
    console.log("like post", storyId, userId)
    return axios.put(`https://nice-plum-panda-tam.cyclic.app/dislikePost/${storyId}/${userId}`)
}


export const useDisLikePostRK = (id) => {
    console.log("like sada", id)
    const kueryClient = useQueryClient()
    return useMutation(disLikePost, {
        onMutate: async (newData) => {
            console.log("new data", newData)
            await kueryClient.cancelQueries(['myposts'])
            const previousData = kueryClient.getQueryData(['myposts'])
            kueryClient.setQueryData(['myposts'], (oldData) => {
                const data = oldData.data.map((val) => {
                    if (val._id == newData.storyId) {
                        val.likes.pop(id)
                        return val
                    }
                    else {
                        return val
                    }
                })
                return { data }
            })
            return { previousData }
        },
        onError: (err, newData, context) => {
            kueryClient.setQueryData(['myposts'], context.previousData)
        },
        onSettled: () => {
            kueryClient.invalidateQueries(['myposts'])
        }

    })
}
