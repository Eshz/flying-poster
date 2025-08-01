import { pdf } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';

export async function exportPosterAsPdf(posterData, designSettings) {
  console.log('[exportPosterAsPdf] called', { posterData, designSettings });
  const doc = <PdfDocument posterData={posterData} designSettings={designSettings} />;
  console.log('[exportPosterAsPdf] created PdfDocument');
  const asPdf = pdf();
  asPdf.updateContainer(doc);
  console.log('[exportPosterAsPdf] updated container');
  try {
    const blob = await asPdf.toBlob();
    console.log('[exportPosterAsPdf] got blob', blob);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${posterData.title ? posterData.title.replace(/\s+/g, '_') : 'poster'}.pdf`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('[exportPosterAsPdf] download triggered and cleaned up');
    }, 100);
  } catch (err) {
    console.error('[exportPosterAsPdf] error', err);
  }
} 