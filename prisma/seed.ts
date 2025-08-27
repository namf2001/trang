import { PrismaClient, UrlStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  console.log('🧹 Cleaning existing data...');
  await prisma.categoryURL.deleteMany();
  await prisma.countryURL.deleteMany();
  await prisma.xtreamURL.deleteMany();
  await prisma.category.deleteMany();
  await prisma.country.deleteMany();

  console.log('🌍 Seeding countries...');
  await prisma.country.createMany({
    data: [
      { name: 'Vietnam' },
      { name: 'United States' },
      { name: 'United Kingdom' },
      { name: 'Germany' },
      { name: 'France' },
      { name: 'Japan' },
      { name: 'South Korea' },
      { name: 'Thailand' },
      { name: 'Singapore' },
      { name: 'Australia' },
      { name: 'Canada' },
      { name: 'Brazil' },
      { name: 'India' },
      { name: 'China' },
      { name: 'Spain' },
      { name: 'Italy' },
      { name: 'Netherlands' },
      { name: 'Sweden' },
      { name: 'Norway' },
      { name: 'Denmark' },
    ],
  });

  console.log('📂 Seeding categories...');
  await prisma.category.createMany({
    data: [
      { name: 'SPORTS' },
      { name: 'SINGLE_STREAM' },
      { name: 'MOVIES' },
      { name: 'NEWS' },
      { name: 'ENTERTAINMENT' },
      { name: 'MUSIC' },
      { name: 'DOCUMENTARY' },
      { name: 'KIDS' },
      { name: 'EDUCATION' },
      { name: 'LIFESTYLE' },
      { name: 'COOKING' },
    ],
  });

  const createdCountries = await prisma.country.findMany();
  const createdCategories = await prisma.category.findMany();

  const sampleUrls = [
    'http://example-stream1.com/live',
    'http://example-stream2.com/channel',
    'http://example-stream3.com/broadcast',
    'http://example-stream4.com/tv',
    'http://example-stream5.com/media',
    'http://example-stream6.com/content',
    'http://example-stream7.com/streaming',
    'http://example-stream8.com/video',
    'http://example-stream9.com/watch',
    'http://example-stream10.com/play',
  ];

  const statuses = [UrlStatus.ACTIVE, UrlStatus.INACTIVE];

  console.log('🔗 Seeding country URLs...');
  for (const country of createdCountries.slice(0, 10)) {
    const urlsForCountry = sampleUrls.slice(0, Math.floor(Math.random() * 5) + 2);
    for (let i = 0; i < urlsForCountry.length; i++) {
      await prisma.countryURL.create({
        data: {
          countryId: country.id,
          url: `${urlsForCountry[i]}/${country.name.toLowerCase().replace(/\s+/g, '-')}/${i + 1}`,
          status: statuses[Math.floor(Math.random() * statuses.length)]!,
          isExpired: Math.random() < 0.1,
        },
      });
    }
  }

  console.log('📺 Seeding category URLs...');
  for (const category of createdCategories) {
    const urlsForCategory = sampleUrls.slice(0, Math.floor(Math.random() * 6) + 3);
    for (let i = 0; i < urlsForCategory.length; i++) {
      await prisma.categoryURL.create({
        data: {
          categoryId: category.id,
          url: `${urlsForCategory[i]}/${category.name.toLowerCase()}/${i + 1}`,
          status: statuses[Math.floor(Math.random() * statuses.length)]!,
          isExpired: Math.random() < 0.15,
        },
      });
    }
  }

  console.log('🛰️ Seeding Xtream URLs...');
  const xtreamCountries = createdCountries.slice(0, 5);
  const xtreamCredentials = [
    { username: 'Bargery88', password: 'fDhewFZQ' },
    { username: 'AlphaUser', password: 'a1B2c3D4' },
    { username: 'StreamPro', password: 'P@ssw0rd1' },
    { username: 'ViewerMax', password: 'ZxY12345' },
    { username: 'DemoAccount', password: 'DemoPass9' },
  ];
  let xtreamIndex = 0;
  for (const country of xtreamCountries) {
    for (let i = 0; i < 2; i++) {
      const cred = xtreamCredentials[xtreamIndex % xtreamCredentials.length]!;
      const base = 'http://pazzy.xyz:8080/get.php';
      const url = `${base}?username=${cred.username}&password=${cred.password}&type=m3u&output=ts`;
      await prisma.xtreamURL.create({
        data: {
          countryId: country.id,
          url,
          status: i % 2 === 0 ? UrlStatus.ACTIVE : UrlStatus.INACTIVE,
          isExpired: false,
        },
      });
      xtreamIndex++;
    }
  }

  console.log('⭐ Adding special sample data...');
  const sportsCategory = createdCategories.find(c => c.name === 'SPORTS');
  const moviesCategory = createdCategories.find(c => c.name === 'MOVIES');
  const newsCategory = createdCategories.find(c => c.name === 'NEWS');

  if (sportsCategory) {
    const sportsUrls = [
      'http://premium-sports1.com/live/football',
      'http://premium-sports2.com/live/basketball',
      'http://premium-sports3.com/live/tennis',
      'http://premium-sports4.com/live/soccer',
      'http://premium-sports5.com/live/baseball',
    ];
    for (const sportsUrl of sportsUrls) {
      await prisma.categoryURL.create({
        data: { categoryId: sportsCategory.id, url: sportsUrl, status: UrlStatus.ACTIVE, isExpired: false },
      });
    }
  }

  if (moviesCategory) {
    const movieUrls = [
      'http://premium-movies1.com/stream/hollywood',
      'http://premium-movies2.com/stream/bollywood',
      'http://premium-movies3.com/stream/korean',
      'http://premium-movies4.com/stream/anime',
    ];
    for (const movieUrl of movieUrls) {
      await prisma.categoryURL.create({
        data: { categoryId: moviesCategory.id, url: movieUrl, status: UrlStatus.ACTIVE, isExpired: false },
      });
    }
  }

  if (newsCategory) {
    const newsUrls = [
      'http://news-stream1.com/live/international',
      'http://news-stream2.com/live/local',
      'http://news-stream3.com/live/business',
      'http://news-stream4.com/live/technology',
    ];
    for (const newsUrl of newsUrls) {
      await prisma.categoryURL.create({
        data: { categoryId: newsCategory.id, url: newsUrl, status: UrlStatus.ACTIVE, isExpired: false },
      });
    }
  }

  const vietnamCountry = createdCountries.find(c => c.name === 'Vietnam');
  if (vietnamCountry) {
    const vietnamUrls = [
      'http://vn-stream1.com/vtv1',
      'http://vn-stream2.com/vtv2',
      'http://vn-stream3.com/vtv3',
      'http://vn-stream4.com/htv',
      'http://vn-stream5.com/vtc',
    ];
    for (const vietnamUrl of vietnamUrls) {
      await prisma.countryURL.create({
        data: { countryId: vietnamCountry.id, url: vietnamUrl, status: UrlStatus.ACTIVE, isExpired: false },
      });
    }
  }

  const finalCounts = {
    countries: await prisma.country.count(),
    categories: await prisma.category.count(),
    countryUrls: await prisma.countryURL.count(),
    categoryUrls: await prisma.categoryURL.count(),
    xtreamUrls: await prisma.xtreamURL.count(),
  };

  console.log('✅ Database seeding completed!');
  console.log('📊 Summary:');
  console.log(`   Countries: ${finalCounts.countries}`);
  console.log(`   Categories: ${finalCounts.categories}`);
  console.log(`   Country URLs: ${finalCounts.countryUrls}`);
  console.log(`   Category URLs: ${finalCounts.categoryUrls}`);
  console.log(`   Xtream URLs: ${finalCounts.xtreamUrls}`);
  console.log(`   Total URLs: ${finalCounts.countryUrls + finalCounts.categoryUrls + finalCounts.xtreamUrls}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });