interface FetchApiProps {
  url: string
  method: 'POST' | 'PUT' | 'GET' | 'DELETE'
  body?: any
}

export const fetchApi = async ({
  url,
  method,
  body
}: FetchApiProps) => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    console.log(response)
    throw new Error('Error to send data');
  }

  const jsonResponse = response.headers.get('content-type')?.includes('application/json')
  ? await response.json()
  : null;

  return jsonResponse;
}