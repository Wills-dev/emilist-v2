interface MaterialReviewSource {
  averageRating?: number | null;
  numberOfRatings?: number;
  reviews?: Array<{ rating: number }> | null;
}

export const materialReviewStats = (material: MaterialReviewSource) => {
  const reviews = Array.isArray(material.reviews) ? material.reviews : [];
  const ratings = reviews.map((review) => review?.rating).filter((rating) => Number.isFinite(rating));
  const averageRating = typeof material.averageRating === "number" && Number.isFinite(material.averageRating)
    ? material.averageRating
    : ratings.length ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length : 0;
  const noOfReviews = typeof material.numberOfRatings === "number" && Number.isFinite(material.numberOfRatings)
    ? material.numberOfRatings : reviews.length;
  return { averageRating, noOfReviews };
};
