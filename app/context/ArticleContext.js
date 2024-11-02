import React, { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from '../../src/config/api';
import axios from 'axios';

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  // Add article
  const addArticle = async (articleData) => {
    console.log(articleData)
    try {
      // API call to your backend
      const response = await axios.post(`${API_BASE_URL}/article/create-post`, articleData);
      setArticles((prevArticles) => [response.data, ...prevArticles]);
      return { success: true };
    } catch (error) {
      console.error('Error adding article:', error);
      return { success: false, error: error.message };
    }
  };

  // Get all articles
  const getAllArticles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      setArticles(response.data);
      return { success: true };
    } catch (error) {
      console.error('Error fetching articles:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete article
  const deleteArticle = async (articleId) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${articleId}`);
      setArticles(articles.filter(article => article.id !== articleId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting article:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    articles,
    addArticle,
    getAllArticles,
    deleteArticle,
  };

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};