/**
 * 文章数据
 * 从 posts.json 加载，该文件由 scripts/build-posts.js 生成
 */
import type { Post } from '@/types';
import postsData from './posts.json';

// 类型断言确保数据格式正确
export const posts: Post[] = postsData as Post[];

// 获取所有文章
export const getAllPosts = () => posts;

// 根据 slug 获取文章
export const getPostBySlug = (slug: string) => {
  return posts.find((post) => post.slug === slug);
};

// 根据分类获取文章
export const getPostsByCategory = (categorySlug: string) => {
  return posts.filter((post) => post.category === categorySlug);
};

// 根据标签获取文章
export const getPostsByTag = (tag: string) => {
  return posts.filter((post) => 
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
};

// 搜索文章
export const searchPosts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// 获取所有标签
export const getAllTags = () => {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

// 获取所有分类及其文章数
export const getCategoriesWithCount = () => {
  const categoryCount = new Map<string, number>();
  posts.forEach((post) => {
    const count = categoryCount.get(post.category) || 0;
    categoryCount.set(post.category, count + 1);
  });
  return categoryCount;
};
