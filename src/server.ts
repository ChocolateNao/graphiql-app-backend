import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import GraphQLRequestBody from './models/GraphQLRequestBody.interface';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/graphql', async (req: Request<GraphQLRequestBody>, res: Response) => {
  const { headers, body } = req;
  const { apiUrl, graphqlQuery, dynamicHeaders, graphqlHeaders, variables }: GraphQLRequestBody = body;

  if (!apiUrl || !graphqlQuery) {
    return res.status(400).json({ error: 'Missing apiUrl or graphqlQuery in the request body' });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...dynamicHeaders,
      },
      body: JSON.stringify({ query: graphqlQuery, headers: graphqlHeaders, variables: variables }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});