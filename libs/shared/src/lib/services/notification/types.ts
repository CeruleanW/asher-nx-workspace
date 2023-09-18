export type Notification = {
  id: string;
  message: string;
  variant: 'primary' | 'danger' | 'warning' | 'success';
};