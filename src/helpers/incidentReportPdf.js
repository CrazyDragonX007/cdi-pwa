import moment from 'moment';
import { jsPDF } from 'jspdf';

/**
 * Builds a formatted PDF for one incident report row (same fields as the form / CSV export).
 */
export function downloadIncidentReportPdf(form) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const maxW = pageWidth - margin * 2;
  let y = 18;

  const safe = (v) => (v == null || v === '' ? '—' : String(v));

  const addTitle = (text) => {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  };

  const addSection = (title) => {
    if (y > 250) {
      doc.addPage();
      y = 18;
    }
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  };

  const addField = (label, value) => {
    const text = `${label}: ${safe(value)}`;
    const lines = doc.splitTextToSize(text, maxW);
    const blockH = lines.length * 5 + 3;
    if (y + blockH > 285) {
      doc.addPage();
      y = 18;
    }
    doc.setFont('helvetica', 'normal');
    doc.text(lines, margin, y);
    y += blockH;
  };

  addTitle('Incident Report');
  doc.setFontSize(9);
  doc.setTextColor(100);
  const generated = moment().format('MM/DD/YYYY hh:mm A');
  doc.text('Generated: ' + generated, margin, y);
  y += 8;
  doc.setTextColor(0);

  const reportId = form.id ?? form.incidentReportID ?? form.reportID;
  if (reportId != null) {
    addField('Report ID', reportId);
  }

  addSection('General');
  addField(
    'Date Submitted',
    form.dateTime ? moment(form.dateTime).format('MM/DD/YYYY') : '—'
  );
  addField('Incident ID', form.incidentID);
  addField('Name', form.name);
  addField('People involved', form.peopleInvolved);
  addField('Incident type', form.incidentType);
  addField('Location', form.location);


  addSection('Incident details');
  addField('Unsafe act / condition', form.unsafeAct);
  addField('Description', form.description);

  addSection('Signatures');
  addField('Employee signature', form.employeeSign);
  addField('Employee sign date', form.employeeSignDate);

  const fname =
    'incident-report-' +
    (reportId ?? 'export') +
    '-' +
    moment().format('YYYYMMDD-HHmm') +
    '.pdf';
  doc.save(fname);
}
