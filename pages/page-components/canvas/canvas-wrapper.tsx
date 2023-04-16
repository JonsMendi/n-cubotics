import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('../organisms/dashboard'), {
  ssr: false,
});

export default CanvasWrapper;
