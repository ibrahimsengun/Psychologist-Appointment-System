'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Category } from '@/types/category';
import { getCategories } from '@/actions/category-actions';
import { cn } from '@/lib/utils';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CategoryMultiSelectProps {
    value: string[];
    onChange: (value: string[]) => void;
    disabled?: boolean;
}

export function CategoryMultiSelect({ value, onChange, disabled }: CategoryMultiSelectProps) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Kategoriler yüklenemedi:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const selectedCategories = categories.filter((cat) => value.includes(cat.id));

    const toggleCategory = (categoryId: string) => {
        const newValue = value.includes(categoryId)
            ? value.filter((id) => id !== categoryId)
            : [...value, categoryId];
        onChange(newValue);
    };

    const removeCategory = (categoryId: string) => {
        onChange(value.filter((id) => id !== categoryId));
    };

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between h-auto min-h-[44px] py-2"
                        disabled={disabled || loading}
                    >
                        <span className="text-muted-foreground">
                            {loading ? 'Yükleniyor...' : 'Kategori seçin'}
                        </span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Kategori ara..." />
                        <CommandEmpty>Kategori bulunamadı.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() => toggleCategory(category.id)}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value.includes(category.id) ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    <div className="flex flex-col">
                                        <span>{category.name}</span>
                                        {category.description && (
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {category.description}
                                            </span>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                        <Badge
                            key={category.id}
                            variant="secondary"
                            className="gap-1 pr-1"
                        >
                            {category.name}
                            <button
                                type="button"
                                onClick={() => removeCategory(category.id)}
                                disabled={disabled}
                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                                <span className="sr-only">Remove {category.name}</span>
                                <span className="h-3 w-3 flex items-center justify-center">×</span>
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
