import { useQuery } from "@tanstack/react-query"
import api from "../api/api"


export const useFetchMyShortUrls = (token, onError) => {
    return useQuery({
        queryKey: ["my-shorten-urls", token],
        queryFn: async () => {
            return await api.get(
                "/api/url/myurls",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        select: (data) => {
            const sortedData = data.data.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
            return sortedData;
        },
        staleTime: 5000,
        enabled: !!token,
    });
};

export const useFetchTotalClicks = (token, onError) => {
    return useQuery({
        queryKey: ["url-totalclick", token],
        queryFn: async () => {
            // Dynamic date range: last 30 days to today
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            
            const pad = (n) => n.toString().padStart(2, '0');
            // Format as ISO_LOCAL_DATE (yyyy-MM-dd) for /totalClicks endpoint
            const formatDate = (date) => 
                `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
            
            return await api.get(
                `/api/url/totalClicks?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        select: (data) => {
            const convertToArray = Object.keys(data.data).map((key) => ({
                clickDate: key,
                count: data.data[key],
            }));
            return convertToArray;
        },
        staleTime: 5000,
        enabled: !!token,
    });
};