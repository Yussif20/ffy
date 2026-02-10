import { baseApi } from "./baseApi";

const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContactUs: builder.mutation({
      query: (data) => ({
        url: "/contact-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactUs"],
    }),
  }),
});

export const { useCreateContactUsMutation } = contactUsApi;
