import { TQueryParam } from "@/types";
import { baseApi } from "./baseApi";

const challengeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create challenge mutation
    createChallenge: builder.mutation({
      query: (data) => ({
        url: "/challenges",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Challenge"],
    }),

    // Get all challenges query
    getAllChallenges: builder.query({
      query: (args: TQueryParam[] = []) => {
        const params = new URLSearchParams();
        args.forEach((arg) => {
          if (arg === undefined || arg === null || arg.value === undefined || arg.value === null) return;
          params.append(arg.name, String(arg.value));
        });

        return {
          url: `/challenges`,
          method: "GET",
          params,
        };
      },
      providesTags: ["Challenge"],
    }),
    getSingleChallenge: builder.query({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: "GET",
      }),
      providesTags: ["Challenge"],
    }),
    updateChallenge: builder.mutation({
      query: ({ id, data }) => ({
        url: `/challenges/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Challenge"],
    }),
    deleteChallenge: builder.mutation({
      query: (id) => ({
        url: `/challenges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Challenge"],
    }),
  }),
});

export const {
  useCreateChallengeMutation,
  useGetAllChallengesQuery,
  useGetSingleChallengeQuery,
  useUpdateChallengeMutation,
  useDeleteChallengeMutation,
} = challengeApi;
