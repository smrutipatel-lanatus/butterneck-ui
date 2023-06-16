import axios from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

/*
  endpoint = 'users' type:string,
  resGetter = (res) => res.data, function to set response from backend. type:function,
  retrieveOnMount = true | false, If true then it will fetch data at component mount, type: boolean,
  options = { headers: { 'Content-Type': 'application/json' }, params: { user_id:1 } }, to pass any headers, params, etc. type: object
*/
const token = localStorage.getItem('token');

const useFetchApi = ({
  endpoint,
  resGetter = (res) => res?.data?.data || res?.data,
  retrieveOnMount = true,
  options,
  retry = 3,
  errorOff,
}) => {
  const {
    data,
    error,
    failureCount,
    isError,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isLoading,
    isPreviousData,
    isStale,
    isSuccess,
    refetch,
    remove,
    status,
  } = useQuery({
    queryKey: [endpoint],
    queryFn: () =>
      axios.get(
        endpoint,
        {
          headers: token
            ? {
                Authorization: `Bearer ` + token,
              }
            : {},
        },
        { ...options }
      ),
    enabled: retrieveOnMount,
    retry,
  });

  useEffect(() => {
    if (error && !errorOff) {
      toast.error(error?.response?.data?.message);
    }
  }, [error, errorOff]);

  return {
    data: resGetter(data),
    error,
    loading: isLoading,
    retrieve: refetch,
    failureCount,
    isPreviousData,
    isError,
    isFetchedAfterMount,
    isFetching,
    isIdle,
    isStale,
    isSuccess,
    remove,
    status,
  };
};
export default useFetchApi;
