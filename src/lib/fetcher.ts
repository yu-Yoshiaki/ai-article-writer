export class FetchError extends Error {
  info?: any;
  status?: number;
}

export const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = new FetchError('An error occurred while fetching the data.');
    error.info = await res.json().catch(() => null);
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export const fetcherWithAuth = async (url: string, token?: string) => {
  return fetcher(url, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};