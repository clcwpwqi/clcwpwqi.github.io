import configData from './generated/config.json';
import postsData from './generated/posts.json';
import type { AllConfig, PostsData, Article, CategoryConfig, LabelConfig } from '../types';

const config = configData as unknown as AllConfig;
const posts = postsData as unknown as PostsData;

export function getConfig(): AllConfig {
  return config;
}

export function getPostsData(): PostsData {
  return posts;
}

export function getArticles(): Article[] {
  return posts.articles;
}

export function getCategories(): CategoryConfig[] {
  return posts.categories;
}

export function getLabels(): LabelConfig {
  return posts.labels;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return posts.articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return posts.articles.filter(a => a.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return posts.articles.filter(a => a.tags.includes(tag));
}

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return posts.categories.find(c => c.slug === slug);
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  posts.articles.forEach(article => {
    article.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
