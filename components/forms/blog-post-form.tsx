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
import { BlogPost, BlogPostFormValues, blogPostFormSchema } from '@/types/blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ImageUpload } from '../image-upload';
import { MinimalTiptapEditor } from '../minimal-tiptap';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface BlogPostFormProps {
  initialData?: BlogPost;
  onSubmit:
    | ((data: BlogPostFormValues) => Promise<any>)
    | ((id: string, data: BlogPostFormValues) => Promise<any>);
}

export function BlogPostForm({ initialData, onSubmit }: BlogPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      cover_image: '',
      status: 'draft'
    }
  });

  const handleSubmit = async (data: BlogPostFormValues) => {
    try {
      setIsSubmitting(true);
      if (initialData) {
        await (onSubmit as (id: string, data: BlogPostFormValues) => Promise<any>)(
          initialData.id,
          data
        );
      } else {
        await (onSubmit as (data: BlogPostFormValues) => Promise<any>)(data);
      }
      toast.success(initialData ? 'Blog yazısı güncellendi' : 'Blog yazısı oluşturuldu');
      router.push('/admin/blog');
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
                <MinimalTiptapEditor
                  {...field}
                  className={cn('w-full', {
                    'border-destructive focus-within:border-destructive':
                      form.formState.errors.content
                  })}
                  output="html"
                  autofocus={true}
                  immediatelyRender={false}
                  editable={true}
                  injectCSS={true}
                  editorClassName="focus:outline-none p-5 h-full"
                  editorContentClassName="h-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover_image"
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
