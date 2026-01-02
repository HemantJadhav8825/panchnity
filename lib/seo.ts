import { Metadata } from 'next'
import { BRAND_NAME, TAGLINE, SITE_URL, SEO_KEYWORDS } from './constants'
import { Product } from '@/types/product'

export function generateHomeMetadata(): Metadata {
  return {
    title: `${BRAND_NAME} | ${TAGLINE}`,
    description: `Premium gold and silver temple idols, pooja items, and bhakti jewellery. Handcrafted with devotion by ${BRAND_NAME}. Authentic 22K gold and 925 silver religious items for your home temple.`,
    keywords: SEO_KEYWORDS.join(', '),
    openGraph: {
      title: `${BRAND_NAME} | ${TAGLINE}`,
      description: `Premium gold and silver temple idols, pooja items, and bhakti jewellery. Handcrafted with devotion.`,
      url: SITE_URL,
      siteName: BRAND_NAME,
      images: [
        {
          url: `${SITE_URL}/images/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: BRAND_NAME,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${BRAND_NAME} | ${TAGLINE}`,
      description: `Premium gold and silver temple idols, pooja items, and bhakti jewellery.`,
      images: [`${SITE_URL}/images/og-home.jpg`],
    },
    alternates: {
      canonical: SITE_URL,
    },
  }
}

export function generateProductsMetadata(): Metadata {
  return {
    title: `Products - ${BRAND_NAME}`,
    description: `Browse our collection of gold and silver temple idols, pooja items, and bhakti jewellery. Authentic 22K gold and 925 silver religious items.`,
    keywords: [...SEO_KEYWORDS, 'buy gold idol', 'buy silver murti', 'online pooja items'].join(', '),
    openGraph: {
      title: `Products - ${BRAND_NAME}`,
      description: `Browse our collection of gold and silver temple idols, pooja items, and bhakti jewellery.`,
      url: `${SITE_URL}/products`,
      siteName: BRAND_NAME,
      images: [
        {
          url: `${SITE_URL}/images/og-products.jpg`,
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} Products`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Products - ${BRAND_NAME}`,
      description: `Browse our collection of gold and silver temple idols, pooja items, and bhakti jewellery.`,
      images: [`${SITE_URL}/images/og-products.jpg`],
    },
    alternates: {
      canonical: `${SITE_URL}/products`,
    },
  }
}

export function generateProductMetadata(product: Product): Metadata {
  const title = `${product.name} - ${BRAND_NAME}`
  const description = `${product.description} ${product.material === 'gold' ? '22K' : '925'} ${product.material}, ${product.weight}. Handcrafted with devotion.`
  
  return {
    title,
    description,
    keywords: [...product.seoKeywords, ...SEO_KEYWORDS].join(', '),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${product.slug}`,
      siteName: BRAND_NAME,
      images: product.images.map((img) => ({
        url: img.startsWith('http') ? img : `${SITE_URL}${img}`,
        width: 1200,
        height: 1200,
        alt: product.name,
      })),
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.images.map((img) => 
        img.startsWith('http') ? img : `${SITE_URL}${img}`
      ),
    },
    alternates: {
      canonical: `${SITE_URL}/products/${product.slug}`,
    },
  }
}

export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) => 
      img.startsWith('http') ? img : `${SITE_URL}${img}`
    ),
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    category: product.category,
    material: product.material,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Purity',
        value: product.purity,
      },
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: product.weight,
      },
    ],
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: TAGLINE,
    sameAs: [
      'https://www.instagram.com/panchnity',
    ],
  }
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

