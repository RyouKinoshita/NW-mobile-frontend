import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import { useArticles } from '../context/ArticleContext';

const ArticleCard = ({ article }) => {
  return (
    <View style={styles.card}>
      {article.imageUrl ? (
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{article.category}</Text>
        <Text style={styles.cardTitle}>{article.title}</Text>
        <Text style={styles.cardDate}>
          {new Date(article.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.cardExcerpt} numberOfLines={3}>
          {article.content}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
};

const ViewArticles = () => {
  const { articles } = useArticles();

  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Articles</Text>
        </View>
        
        <View style={styles.articlesContainer}>
          {articles.length === 0 ? (
            <Text style={styles.noArticles}>No articles yet</Text>
          ) : (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default ViewArticles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  articlesContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderImage: {
    height: 200,
    width: '100%',
    backgroundColor: '#ddd',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 15,
  },
  cardCategory: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  cardExcerpt: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  readMoreButton: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  readMoreText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  noArticles: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});