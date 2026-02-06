'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { TimeBlock } from '@/types/appointments';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MoreHorizontal, Trash } from 'lucide-react';

interface TimeBlocksTableProps {
    timeBlocks: TimeBlock[];
    onDelete: (id: string) => Promise<void>;
}

export function TimeBlocksTable({ timeBlocks, onDelete }: TimeBlocksTableProps) {
    const formatTimeRange = (block: TimeBlock) => {
        if (!block.startTime || !block.endTime) {
            return 'Tüm gün';
        }
        return `${block.startTime} - ${block.endTime}`;
    };

    const getBlockTypeLabel = (blockType: string) => {
        return blockType === 'booked' ? 'Site Randevusu' : 'Manuel Blok';
    };

    const getBlockTypeBadgeClass = (blockType: string) => {
        return blockType === 'booked'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-orange-100 text-orange-800';
    };

    return (
        <div className="max-w-[90vw] overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tarih</TableHead>
                        <TableHead>Saat</TableHead>
                        <TableHead>Sebep</TableHead>
                        <TableHead>Tür</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {timeBlocks.map((block) => (
                        <TableRow key={block.id}>
                            <TableCell>{format(new Date(block.date), 'PPP', { locale: tr })}</TableCell>
                            <TableCell>{formatTimeRange(block)}</TableCell>
                            <TableCell>{block.reason || '-'}</TableCell>
                            <TableCell>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBlockTypeBadgeClass(
                                        block.blockType
                                    )}`}
                                >
                                    {getBlockTypeLabel(block.blockType)}
                                </span>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Menüyü aç</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => onDelete(block.id)}
                                            className="text-red-600"
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Sil
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                    {timeBlocks.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                                Henüz zaman bloğu eklenmemiş
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
