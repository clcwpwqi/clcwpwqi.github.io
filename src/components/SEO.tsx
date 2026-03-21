/**
 * SEO 组件
 * 用于设置页面元数据
 */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/data/config';
// import type { SEO as SEOType } from '@/types';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  const fullDescription = description || siteConfig.description;
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const fullImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}/images/og.png`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={siteConfig.author} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteConfig.title} />

      {/* Telegram Card */}
      <meta name="telegram:card" content="summary_large_image" />
      <meta name="telegram:title" content={fullTitle} />
      <meta name="telegram:description" content={fullDescription} />
      <meta name="telegram:image" content={fullImage} />
      <meta name="telegram:creator" content={siteConfig.telegram?.replace('https://t.me/', '')} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};
