import axios from 'axios';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
/*
  method = post | put | delete, type: string,
  endpoint = 'users', type:string,
  resGetter = (res) => res.data, function to set response from backend. type:function,
  options = { headers: { 'Content-Type': 'application/json' }}, to pass any headers, other configs etc. type: object
*/
const token = localStorage.getItem('token');

const useMutationApi = ({ method = 'post', endpoint, resGetter = (res) => res?.data?.data || res?.data, options }) => {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation({
    mutationFn: (data) => {
      return axios({
        url: endpoint,
        method,
        data,
        headers: token
          ? {
              Authorization: `Bearer ` + token,
            }
          : {},
        ...options,
      });
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);
    }
  }, [error]);

  return {
    data: resGetter(data),
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    failureCount,
    failureReason,
    mutate,
    mutateAsync,
    reset,
    status,
  };
};

export default useMutationApi;
