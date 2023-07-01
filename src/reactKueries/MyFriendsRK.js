
import axios from "axios"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchMyFriends = (id, token) => {
    return axios.get(`https://nice-plum-panda-tam.cyclic.app/myFriends/${id}`, {
        headers: {
            'Authorization': token
        }
    })
}
export const useMyFriendsRK = (id, token) => {
    return useQuery(['myfriends'], () => fetchMyFriends(id, token), {
        select: (data) => data.data
    })
}

const deleteFriend = ({ userId, targetId, token }) => {
    return axios.delete(`https://nice-plum-panda-tam.cyclic.app/deleteFriend/${userId}/${targetId}`, {
        headers: {
            'Authorization': token
        }
    })
}
export const useDeleteFriendRK = (userId) => {
    const kueryClient = useQueryClient()
    return useMutation(deleteFriend, {
        onMutate: async (newData) => {
            console.log("new data", newData)
            await kueryClient.cancelQueries(['myfriends'])
            const previousData = kueryClient.getQueryData(['myfriends'])
            kueryClient.setQueryData(['myfriends'], (oldData) => {

                const data = oldData.data.filter((val) =>
                    val.createrId._id != newData.targetId
                )
                console.log("updated data", data)

                // const data = oldData.data.map((val) => {
                //     if (val.createrId._id == newData.targetId) {
                //         val.likes.pop(newData.targetId)
                //         return val
                //     }
                //     else {
                //         return val
                //     }
                // })
                return { data }
            })
            return { previousData }
        },
        onError: (err, newData, context) => {
            kueryClient.setQueryData(['myfriends'], context.previousData)
        },
        onSettled: () => {
            kueryClient.invalidateQueries(['myfriends'])
        }

    })

}
