export default interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  teacher: boolean;
  created_at: string;
  updated_at: string;
}
