import { BlogPost, BlogMetadata } from '../types/blog';

export interface HashnodePost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: {
    markdown: string;
    html: string;
  };
  brief: string;
  publishedAt: string;
  updatedAt: string;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  author: {
    id: string;
    name: string;
    username: string;
  };
  publication: {
    id: string;
    title: string;
    url: string;
  };
  coverImage?: {
    url: string;
  };
  readTimeInMinutes: number;
  reactionCount: number;
  responseCount: number;
  featured: boolean;
  views: number;
  series?: {
    id: string;
    name: string;
    slug: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
  ogMetaData?: {
    image?: string;
  };
}

export interface HashnodePublication {
  id: string;
  title: string;
  displayTitle?: string;
  about?: {
    markdown?: string;
  };
  url: string;
  author?: {
    id: string;
    name: string;
    username: string;
  };
  posts: {
    edges: Array<{
      node: HashnodePost;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
  series?: Array<{
    id: string;
    name: string;
    slug: string;
    posts: {
      edges: Array<{
        node: HashnodePost;
      }>;
    };
  }>;
}

export class HashnodeService {
  private apiUrl = 'https://gql.hashnode.com/';
  private publicationId: string;
  private authToken?: string;

  constructor(publicationId: string, authToken?: string) {
    this.publicationId = publicationId;
    this.authToken = authToken;
  }

  private async request<T>(query: string, variables?: Record<string, any>): Promise<T> {

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = this.authToken;
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL error: ${result.errors[0].message}`);
    }

    return result.data;
  }

  async getPublication(): Promise<HashnodePublication> {
    const query = `
      query GetPublication($id: ObjectId!) {
        publication(id: $id) {
          id
          title
          displayTitle
          about {
            markdown
          }
          url
          author {
            id
            name
            username
          }
        }
      }
    `;

    const data = await this.request<{ publication: HashnodePublication }>(query, {
      id: this.publicationId,
    });

    return data.publication;
  }

  async getPosts(first: number = 10, after?: string): Promise<{
    posts: HashnodePost[];
    pageInfo: { hasNextPage: boolean; endCursor: string };
  }> {
    const query = `
      query GetPosts($publicationId: ObjectId!, $first: Int!, $after: String) {
        publication(id: $publicationId) {
          posts(first: $first, after: $after) {
            edges {
              node {
                id
                title
                subtitle
                slug
                content {
                  markdown
                  html
                }
                brief
                publishedAt
                updatedAt
                tags {
                  id
                  name
                  slug
                }
                author {
                  id
                  name
                  username
                }
                publication {
                  id
                  title
                  url
                }
                coverImage {
                  url
                }
                readTimeInMinutes
                reactionCount
                responseCount
                featured
                views
                series {
                  id
                  name
                  slug
                }
                seo {
                  title
                  description
                }
                ogMetaData {
                  image
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `;

    const data = await this.request<{ publication: HashnodePublication }>(query, {
      publicationId: this.publicationId,
      first,
      after,
    });

    return {
      posts: data.publication.posts.edges.map(edge => edge.node),
      pageInfo: data.publication.posts.pageInfo,
    };
  }

  async getPostBySlug(slug: string): Promise<HashnodePost | null> {
    const query = `
      query GetPost($publicationId: ObjectId!, $slug: String!) {
        publication(id: $publicationId) {
          post(slug: $slug) {
            id
            title
            subtitle
            slug
            content {
              markdown
              html
            }
            brief
            publishedAt
            updatedAt
            tags {
              id
              name
              slug
            }
            author {
              id
              name
              username
            }
            publication {
              id
              title
              url
            }
            coverImage {
              url
            }
            readTimeInMinutes
            reactionCount
            responseCount
            featured
            views
            series {
              id
              name
              slug
            }
            seo {
              title
              description
            }
            ogMetaData {
              image
            }
          }
        }
      }
    `;

    const data = await this.request<{ publication: { post: HashnodePost | null } }>(query, {
      publicationId: this.publicationId,
      slug,
    });

    return data.publication.post;
  }

  async getSeries(): Promise<Array<{
    id: string;
    name: string;
    slug: string;
    posts: HashnodePost[];
  }>> {
    const query = `
      query GetPublicationSeries($publicationId: ObjectId!) {
        publication(id: $publicationId) {
          seriesList {
            edges {
              node {
                id
                name
                slug
                posts(first: 20) {
                  edges {
                    node {
                      id
                      title
                      slug
                      brief
                      publishedAt
                      readTimeInMinutes
                      views
                      tags {
                        name
                      }
                      author {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.request<{
        publication: {
          seriesList: {
            edges: Array<{
              node: {
                id: string;
                name: string;
                slug: string;
                posts: {
                  edges: Array<{
                    node: HashnodePost;
                  }>;
                };
              };
            }>;
          };
        };
      }>(query, {
        publicationId: this.publicationId,
      });

      return data.publication.seriesList.edges.map(edge => ({
        id: edge.node.id,
        name: edge.node.name,
        slug: edge.node.slug,
        posts: edge.node.posts.edges.map(postEdge => postEdge.node)
      }));
    } catch (error) {
      console.error('Failed to fetch series from API, falling back to post extraction:', error);
      const { posts } = await this.getPosts(20);
      const seriesMap = new Map<string, {
        id: string;
        name: string;
        slug: string;
        posts: HashnodePost[];
      }>();

      posts.forEach(post => {
        if (post.series) {
          const seriesKey = post.series.id;
          if (!seriesMap.has(seriesKey)) {
            seriesMap.set(seriesKey, {
              id: post.series.id,
              name: post.series.name,
              slug: post.series.slug,
              posts: []
            });
          }
          seriesMap.get(seriesKey)!.posts.push(post);
        }
      });

      return Array.from(seriesMap.values());
    }
  }

  async getDraft(draftId: string): Promise<{
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    content: {
      markdown: string;
    };
  } | null> {
    const query = `
      query Draft($id: ObjectId!) {
        draft(id: $id) {
          id
          slug
          title
          subtitle
          content {
            markdown
          }
        }
      }
    `;

    const data = await this.request<{
      draft: {
        id: string;
        slug: string;
        title: string;
        subtitle?: string;
        content: {
          markdown: string;
        };
      } | null;
    }>(query, {
      id: draftId,
    });

    return data.draft;
  }

  async getSeriesPosts(seriesSlug: string): Promise<HashnodePost[]> {
    const query = `
      query GetSeriesPosts($publicationId: ObjectId!, $seriesSlug: String!) {
        publication(id: $publicationId) {
          series(slug: $seriesSlug) {
            posts(first: 20) {
              edges {
                node {
                  id
                  title
                  subtitle
                  slug
                  content {
                    markdown
                    html
                  }
                  brief
                  publishedAt
                  updatedAt
                  tags {
                    id
                    name
                    slug
                  }
                  author {
                    id
                    name
                    username
                  }
                  publication {
                    id
                    title
                    url
                  }
                  coverImage {
                    url
                  }
                  readTimeInMinutes
                  reactionCount
                  responseCount
                  featured
                  views
                  series {
                    id
                    name
                    slug
                  }
                  seo {
                    title
                    description
                  }
                  ogMetaData {
                    image
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const data = await this.request<{
        publication: {
          series: {
            posts: {
              edges: Array<{
                node: HashnodePost;
              }>;
            };
          };
        };
      }>(query, {
        publicationId: this.publicationId,
        seriesSlug,
      });

      return data.publication.series.posts.edges.map(edge => edge.node);
    } catch (error) {
      console.error('Failed to fetch series posts, falling back to filtering:', error);
      const { posts } = await this.getPosts(20);
      return posts.filter(post => post.series?.slug === seriesSlug);
    }
  }


  transformToBlogPost(hashnodePost: HashnodePost): BlogPost {
    return {
      slug: hashnodePost.slug,
      title: hashnodePost.title,
      subtitle: hashnodePost.subtitle,
      content: hashnodePost.content.html,
      excerpt: hashnodePost.brief,
      publishedAt: new Date(hashnodePost.publishedAt),
      updatedAt: new Date(hashnodePost.updatedAt),
      tags: hashnodePost.tags.map(tag => tag.name),
      category: hashnodePost.tags[0]?.name || 'general',
      author: hashnodePost.author.name,
      featured: hashnodePost.featured,
      draft: false,
      readingTimeMinutes: hashnodePost.readTimeInMinutes,
      wordCount: Math.round(hashnodePost.readTimeInMinutes * 200),
      views: hashnodePost.views,
      series: hashnodePost.series,
      coverImage: hashnodePost.coverImage?.url || hashnodePost.ogMetaData?.image,
      seo: {
        metaTitle: hashnodePost.seo?.title || hashnodePost.title,
        metaDescription: hashnodePost.seo?.description || hashnodePost.brief,
        keywords: hashnodePost.tags.map(tag => tag.name),
      },
    };
  }

  transformToBlogMetadata(publication: HashnodePublication): BlogMetadata {
    return {
      siteTitle: publication.displayTitle || publication.title,
      siteDescription: publication.about?.markdown || publication.title,
      siteUrl: publication.url,
      authorName: publication.author?.name || 'Author',
      authorEmail: '',
      socialLinks: {},
      theme: {
        primaryColor: '#2563eb',
        accentColor: '#3b82f6',
        backgroundColor: '#ffffff',
        textColor: '#111827',
      },
      navigation: [
        { label: 'Home', href: '/', external: false, order: 1 },
        { label: 'Posts', href: '/posts', external: false, order: 2 },
        { label: 'About', href: '/about', external: false, order: 3 },
      ],
      featuredPostsCount: 3,
      postsPerPage: 10,
    };
  }
}