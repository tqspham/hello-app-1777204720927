export interface Sport {
  id: string;
  name: string;
}

const sports: Sport[] = [
  { id: '1', name: 'Basketball' },
  { id: '2', name: 'Soccer' },
  { id: '3', name: 'Tennis' },
  { id: '4', name: 'Football' },
  { id: '5', name: 'Baseball' },
  { id: '6', name: 'Hockey' },
];

export async function GET(): Promise<Response> {
  return Response.json({ sports });
}
