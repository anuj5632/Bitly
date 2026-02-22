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
            return await api.get(
                "/api/url/analytics/abc123?startDate=2024-12-01T00:00:00&endDate=2024-12-07T23:59:59",
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