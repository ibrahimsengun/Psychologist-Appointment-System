'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BlogPostFormValues, blogPostFormSchema } from '@/types/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { TipTapEditor } from '../editor/tiptap-editor';
import { ImageUpload } from '../image-upload';

interface BlogPostFormProps {
  initialData?: BlogPostFormValues;
  onSubmit: (data: BlogPostFormValues) => Promise<any>;
}

export function BlogPostForm({ initialData, onSubmit }: BlogPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      excerpt: '',
      coverImage: '',
      status: 'draft'
    }
  });

  const handleSubmit = async (data: BlogPostFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success(initialData ? 'Blog yazısı güncellendi' : 'Blog yazısı oluşturuldu');
      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      toast.error(
        error instanceof Error ? error.message : 'Blog yazısı kaydedilirken bir hata oluştu'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlık</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İçerik</FormLabel>
              <FormControl>
                <TipTapEditor content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Özet</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kapak Görseli</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={() => field.onChange('')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durum</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="published">Yayınlandı</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mr-2">{initialData ? 'Güncelleniyor' : 'Oluşturuluyor'}</span>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : initialData ? (
            'Güncelle'
          ) : (
            'Oluştur'
          )}
        </Button>
      </form>
    </Form>
  );
}
