import { promises as fs } from 'fs';
import path from 'path';

export default async function saveNote(req, res) {
    if (req.method === 'POST') {
        const { title, content } = req.body;

        const htmlContent = `<h1>${title}</h1>\n<p>${content.replace(/\n/g, '</p>\n<p>')}</p>`;
        const filePath = path.join(process.cwd(), 'notes', `${title}.html`);

        try {
            await fs.writeFile(filePath, htmlContent, 'utf8');
            res.status(200).json({ message: 'Notiz erfolgreich gespeichert' });
        } catch (err) {
            res.status(500).json({ message: 'Fehler beim Speichern der Notiz' });
        }
    } else {
        res.status(405).json({ message: 'Methode nicht erlaubt' });
    }
}
