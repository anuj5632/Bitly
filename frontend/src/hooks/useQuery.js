import { useQuery } from "@tanstack/react-query"
import api from "../api/api"

export const useFetchTotalClicks = (token,onError) => {
    return useQuery("url-totalclick",
        async () => {
            return await api.get
        },
        {})
}