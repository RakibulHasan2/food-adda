import { CourseDetailClient } from './CourseDetailClient';

// Generate static params for all course IDs
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' }
  ];
}

const CourseDetailPage = ({ params }: { params: { id: string } }) => {
  return <CourseDetailClient params={params} />;
};

export default CourseDetailPage;