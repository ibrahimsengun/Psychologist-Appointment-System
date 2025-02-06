import Link from 'next/link';

const blogPosts = [
  {
    title: 'Anksiyete ile Başa Çıkma Yöntemleri',
    excerpt: 'Günlük hayatta anksiyete ile mücadele etmek için pratik ipuçları ve stratejiler.',
    slug: 'anksiyete-ile-basa-cikma-yontemleri'
  },
  {
    title: 'Sağlıklı İlişkiler Nasıl Kurulur?',
    excerpt: 'İlişkilerde mutluluğu ve dengeyi sağlamak için önemli adımlar ve tavsiyeler.',
    slug: 'saglikli-iliskiler-nasil-kurulur'
  },
  {
    title: 'Stres Yönetimi ve Mindfulness',
    excerpt: 'Stresi azaltmak ve zihinsel sağlığı iyileştirmek için mindfulness teknikleri.',
    slug: 'stres-yonetimi-ve-mindfulness'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.slug} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                Devamını Oku
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
