import { PsychologicalTest } from '@/types/psychological-tests';

/**
 * GAD-7 (Generalized Anxiety Disorder 7-item scale)
 * Yaygın Anksiyete Bozukluğu Ölçeği
 * 
 * Kaynak: Spitzer RL, Kroenke K, Williams JBW, Lowe B. 
 * A brief measure for assessing generalized anxiety disorder. 
 * Arch Intern Med. 2006;166:1092-1097.
 */
export const GAD7: PsychologicalTest = {
    id: 'gad7',
    slug: 'anksiyete-testi',
    title: 'Anksiyete (Kaygı) Testi',
    description: 'GAD-7, yaygın anksiyete bozukluğunu değerlendirmek için kullanılan kısa ve etkili bir tarama aracıdır. Bu test, son 2 hafta içinde yaşadığınız kaygı belirtilerini ölçer.',
    shortDescription: 'Son 2 haftadaki kaygı seviyenizi ölçün',
    duration: '2-3 dakika',
    questionCount: 7,
    icon: 'Brain',
    color: 'blue',

    questions: [
        {
            id: 1,
            text: 'Gergin, endişeli veya sinirli hissettiniz mi?',
            options: [
                { value: 0, label: 'Hiç' },
                { value: 1, label: 'Birkaç gün' },
                { value: 2, label: 'Günlerin yarısından fazlası' },
                { value: 3, label: 'Neredeyse her gün' }
            ]
        },
        {
            id: 2,
            text: 'Endişelenmeyi durduramadınız veya kontrol edemediğiniz oldu mu?',
            options: [
                { value: 0, label: 'Hiç' },
                { value: 1, label: 'Birkaç gün' },
                { value: 2, label: 'Günlerin yarısından fazlası' },
                { value: 3, label: 'Neredeyse her gün' }
            ]
        },
        {
            id: 3,
            text: 'Farklı konular hakkında çok fazla endişelendiniz mi?',
            options: [
                { value: 0, label: 'Hiç' },
                { value: 1, label: 'Birkaç gün' },
                { value: 2, label: 'Günlerin yarısından fazlası' },
                { value: 3, label: 'Neredeyse her gün' }
            ]
        },
        {
            id: 4,
            text: 'Rahatlamakta güçlük çektiniz mi?',
            options: [
                { value: 0, label: 'Hiç' },
                { value: 1, label: 'Birkaç gün' },
                { value: 2, label: 'Günlerin yarısından fazlası' },
                { value: 3, label: 'Neredeyse her gün' }
            ]
        },
        {
            id: 5,
            text: 'O kadar huzursuz hissettiniz ki yerinizde durmak zorlaştı mı?',
            options: [
                { value: 0, label: 'Hiç' },
                { value: 1, label: 'Birkaç gün' },
                { value: 2, label: 'Günlerin yarısından fazlası' },
                { value: 3, label: 'Neredeyse her gün' }
            ]
        },
        {
            id: 6,
            text: 'Kolayca rahatsız veya sinirli oldunuz mu?',
            options: [
                { value: 0, label: 'Hiç' },
                { value: 1, label: 'Birkaç gün' },
                { value: 2, label: 'Günlerin yarısından fazlası' },
                { value: 3, label: 'Neredeyse her gün' }
            ]
        },
        {
            id: 7,
            text: 'Kötü bir şey olacakmış gibi korktuğunuz oldu mu?',
            options: [
                { value: 0, label: 'Hiç' },
                { value: 1, label: 'Birkaç gün' },
                { value: 2, label: 'Günlerin yarısından fazlası' },
                { value: 3, label: 'Neredeyse her gün' }
            ]
        }
    ],

    scoring: {
        maxScore: 21,
        ranges: [
            {
                min: 0,
                max: 4,
                level: 'minimal',
                label: 'Minimal Kaygı',
                description: 'Kaygı belirtileriniz minimal düzeyde. Bu seviye genellikle normal kabul edilir ve günlük yaşamı olumsuz etkilemez.',
                color: 'emerald'
            },
            {
                min: 5,
                max: 9,
                level: 'mild',
                label: 'Hafif Kaygı',
                description: 'Hafif düzeyde kaygı belirtileri gösteriyorsunuz. Bu belirtiler rahatsız edici olabilir ancak genellikle yönetilebilir düzeydedir.',
                color: 'yellow'
            },
            {
                min: 10,
                max: 14,
                level: 'moderate',
                label: 'Orta Düzey Kaygı',
                description: 'Orta düzeyde kaygı belirtileri gösteriyorsunuz. Bu belirtiler günlük yaşamınızı etkileyebilir. Profesyonel destek almanızı öneririz.',
                color: 'orange'
            },
            {
                min: 15,
                max: 21,
                level: 'severe',
                label: 'Şiddetli Kaygı',
                description: 'Yüksek düzeyde kaygı belirtileri gösteriyorsunuz. Bu belirtiler günlük yaşamınızı önemli ölçüde etkileyebilir. En kısa sürede profesyonel destek almanızı öneriyoruz.',
                color: 'red'
            }
        ],
        disclaimer: 'Bu test yalnızca bilgilendirme amaçlıdır ve kesin bir tanı koyamaz. Sonuçlar, profesyonel bir değerlendirmenin yerini alamaz. Endişeleriniz varsa, lütfen bir ruh sağlığı uzmanına danışın.'
    }
};
