export type BoxResponseDTO = {
  _id: string;
  cards: string[];
  created_date: string;
  draw_pointer: number;
  draw_sequence: number[];
  last_access_date: string;
  last_updated_date: string;
  name: string;
  owner: string;
  shared_with: string[];
  tags?: string[];
};
