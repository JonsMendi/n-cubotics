import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('../../pages/page-components/organisms/dashboard'), {
  ssr: false,
});

export default CanvasWrapper;
