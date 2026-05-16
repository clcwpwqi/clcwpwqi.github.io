/**
 * 文章数据入口
 * 从 posts.json 加载，该文件由 scripts/build-posts.js 生成
 */
import type { Post, Category, Tag, PostsData } from '@/types';
import postsData from './posts.json';

// 类型断言确保数据格式正确
const data = postsData as PostsData;

// 导出数据
export const posts: Post[] = data.posts || [];
export const categories: Category[] = data.categories || [];
export const tags: Tag[] = data.tags || [];
export const labelsConfig = data.labelsConfig || {};

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
  return tags.map(t => t.name);
};

// 根据标签名获取标签配置
export const getTagByName = (name: string) => {
  return tags.find(t => t.name === name);
};

// 根据分类 slug 获取分类信息
export const getCategoryBySlug = (slug: string) => {
  return categories.find(c => c.slug === slug);
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
