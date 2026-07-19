export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewAuthor {
  _id?: string;
  displayImage?: string;
  firstName?: string;
  lastName?: string;
}

export interface Review {
  _id?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  helpfulCount?: number;
  helpfulUsers?: string[];
  user?: ReviewAuthor;
}
