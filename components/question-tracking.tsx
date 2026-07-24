'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getQuestionByTrackingCode } from '@/actions/question-actions';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, Clock, XCircle, Search, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface QuestionResult {
  status: 'pending' | 'answered';
  question_text: string;
  answer_text?: string;
  created_at: string;
  answered_at?: string;
  asker_name?: string;
}

export function QuestionTracking() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuestionResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'd MMMM yyyy', { locale: tr });
  };

  const handleSearch = useCallback(async (searchCode: string) => {
    if (!searchCode.trim()) {
      toast.error('Lütfen takip kodunuzu giriniz');
      return;
    }

    setLoading(true);
    setResult(null);
    setNotFound(false);

    try {
      const data = await getQuestionByTrackingCode(searchCode.trim());
      if (data) {
        setResult(data as QuestionResult);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const kod = searchParams.get('kod');
    if (kod) {
      setCode(kod);
      handleSearch(kod);
    }
  }, [searchParams, handleSearch]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Search Input */}
      <div className="bg-background border border-border/50 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <Label htmlFor="tracking-code" className="text-base font-semibold">
            Takip Kodu
          </Label>
          <div className="flex gap-3">
            <Input
              id="tracking-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Takip kodunuzu giriniz"
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(code);
                }
              }}
            />
            <Button
              onClick={() => handleSearch(code)}
              disabled={loading}
              className="px-6"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Sorgula
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Sorunuz aranıyor...</p>
        </div>
      )}

      {/* Pending State */}
      {!loading && result && result.status === 'pending' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-amber-900">
              Sorunuz Henüz Cevaplanmadı
            </h3>
          </div>
          <p className="text-amber-800">
            Sorunuz <strong>{formatDate(result.created_at)}</strong> tarihinde alınmıştır. Lütfen daha sonra tekrar kontrol edin.
          </p>
          <div className="bg-white/60 rounded-xl p-4 border border-amber-200">
            <p className="text-sm font-medium text-amber-700 mb-2">Sorunuz:</p>
            <p className="text-amber-900">{result.question_text}</p>
          </div>
        </div>
      )}

      {/* Answered State */}
      {!loading && result && result.status === 'answered' && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">
                Sorunuz Cevaplandı
              </h3>
              {result.answered_at && (
                <p className="text-sm text-green-700">
                  {formatDate(result.answered_at)}
                </p>
              )}
            </div>
          </div>

          <blockquote className="border-l-4 border-green-300 pl-4 py-2 text-green-800 italic">
            {result.question_text}
          </blockquote>

          <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
            <p className="text-sm font-medium text-green-700 mb-3">Cevap:</p>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {result.answer_text}
            </p>
          </div>
        </div>
      )}

      {/* Not Found State */}
      {!loading && notFound && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-900">
              Soru Bulunamadı
            </h3>
          </div>
          <p className="text-red-800">
            Girdiğiniz takip kodu ile eşleşen bir soru bulunamadı. Lütfen kodunuzu kontrol edin.
          </p>
        </div>
      )}
    </div>
  );
}
