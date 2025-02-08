'use client';

import { cn } from '@/lib/utils';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Redo2,
  Underline as UnderlineIcon,
  Undo2
} from 'lucide-react';
import { Button } from '../ui/button';

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TipTapEditor({
  content,
  onChange,
  placeholder = 'İçerik yazın...'
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'text-2xl font-bold'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),

      Image.configure({
        inline: true,
        allowBase64: true
      }),
      Color,
      Highlight,
      Placeholder.configure({
        placeholder
      })
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4'
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(editor.isActive('heading', { level: 1 }) && 'bg-accent')}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(editor.isActive('heading', { level: 2 }) && 'bg-accent')}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(editor.isActive('heading', { level: 3 }) && 'bg-accent')}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(editor.isActive('bold') && 'bg-accent')}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(editor.isActive('italic') && 'bg-accent')}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(editor.isActive('underline') && 'bg-accent')}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const url = window.prompt('URL girin:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={cn(editor.isActive('link') && 'bg-accent')}
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(editor.isActive('bulletList') && 'bg-accent')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(editor.isActive('orderedList') && 'bg-accent')}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            className={cn(editor.isActive('undo') && 'bg-accent')}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            className={cn(editor.isActive('redo') && 'bg-accent')}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
