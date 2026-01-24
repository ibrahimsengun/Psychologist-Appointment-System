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
import { Loader2, Save } from 'lucide-react';
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
      meta_description: '',
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
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sol Taraf - Ana İçerik */}
          <div className="flex-1 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Başlık</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-lg h-12"
                      placeholder="Blog yazısı başlığı..."
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
                  <FormLabel className="text-base font-semibold">Kapak Görseli</FormLabel>
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">İçerik</FormLabel>
                  <FormControl>
                    <MinimalTiptapEditor
                      {...field}
                      className={cn('w-full min-h-[700px]', {
                        'border-destructive focus-within:border-destructive':
                          form.formState.errors.content
                      })}
                      output="html"
                      autofocus={true}
                      immediatelyRender={false}
                      editable={true}
                      injectCSS={true}
                      editorClassName="focus:outline-none p-5 min-h-[650px]"
                      editorContentClassName="min-h-[650px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sağ Taraf - Ayarlar Sidebar */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="lg:sticky lg:top-4 space-y-6">
              {/* Kaydet Butonu - En Üstte */}
              <div className="bg-card border rounded-lg p-4 shadow-sm">
                <Button
                  type="submit"
                  className="w-full h-11 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {initialData ? 'Güncelleniyor…' : 'Oluşturuluyor…'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {initialData ? 'Güncelle' : 'Yayınla'}
                    </>
                  )}
                </Button>
              </div>

              {/* Durum */}
              <div className="bg-card border rounded-lg p-4 shadow-sm space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Yayın Durumu
                </h3>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500" />
                              Taslak
                            </div>
                          </SelectItem>
                          <SelectItem value="published">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              Yayında
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* SEO Ayarları */}
              <div className="bg-card border rounded-lg p-4 shadow-sm space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  SEO Ayarları
                </h3>
                <FormField
                  control={form.control}
                  name="meta_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Meta Açıklama</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <textarea
                            {...field}
                            value={field.value ?? ''}
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            placeholder="Arama sonuçlarında görünecek açıklama..."
                            maxLength={160}
                          />
                          <div className="flex justify-end">
                            <span className={cn(
                              'text-xs',
                              (field.value?.length || 0) > 160 ? 'text-destructive' : 'text-muted-foreground',
                              (field.value?.length || 0) >= 140 && (field.value?.length || 0) <= 160 ? 'text-green-600' : ''
                            )}>
                              {field.value?.length || 0}/160
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

