import React from "react";

const PersonDetailPage = ({ params }: { params: { id: string } }) => {
  return <div>PersonDetailPage: {params.id}</div>;
};

export default PersonDetailPage;
