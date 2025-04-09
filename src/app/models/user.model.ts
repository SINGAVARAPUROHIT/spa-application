export interface User {
  id: string;
  username: string;
  password: string;
  role: 'General User' | 'Admin';
  name: string;
}

export interface Record {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
}