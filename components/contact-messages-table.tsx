import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ContactMessage } from '@/types/contact-messages';

export default function ContactMessagesTable({
  contactMessages
}: {
  contactMessages: ContactMessage[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>İsim</TableHead>
          <TableHead>E-posta</TableHead>
          <TableHead>Mesaj</TableHead>
          <TableHead>Tarih</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contactMessages.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
