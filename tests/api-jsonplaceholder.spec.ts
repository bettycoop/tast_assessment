import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Test Scenario - JSON Placeholder API', () => {
  
  test('TI_API_TC001 - GET /posts - Retrieve all posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('userId');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    
    expect(typeof firstPost.id).toBe('number');
    expect(typeof firstPost.userId).toBe('number');
    expect(typeof firstPost.title).toBe('string');
    expect(typeof firstPost.body).toBe('string');
  });

  test('TI_API_TC002 - GET /posts/{id} - Retrieve specific post', async ({ request }) => {
    const postId = 1;
    const response = await request.get(`${BASE_URL}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
    
    const post = await response.json();
    expect(post.id).toBe(postId);
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    
    expect(typeof post.userId).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(post.title.length).toBeGreaterThan(0);
    expect(post.body.length).toBeGreaterThan(0);
  });

  test('TI_API_TC003 - GET /posts/{id} - Handle non-existent post', async ({ request }) => {
    const nonExistentId = 999999;
    const response = await request.get(`${BASE_URL}/posts/${nonExistentId}`);
    
    expect(response.status()).toBe(404);
  });

  test('TI_API_TC004 - POST /posts - Create new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post Title',
      body: 'This is a test post body content for API testing',
      userId: 1
    };
    
    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(typeof createdPost.id).toBe('number');
    expect(createdPost.id).toBeGreaterThan(0);
  });

  test('TI_API_TC005 - POST /posts - Create post with missing fields', async ({ request }) => {
    const incompletePost = {
      title: 'Incomplete Post'
    };
    
    const response = await request.post(`${BASE_URL}/posts`, {
      data: incompletePost
    });
    
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(incompletePost.title);
  });

  test('TI_API_TC006 - PUT /posts/{id} - Update entire post', async ({ request }) => {
    const postId = 1;
    const updatedPost = {
      id: postId,
      title: 'Updated Post Title',
      body: 'This is the updated body content for the post',
      userId: 2
    };
    
    const response = await request.put(`${BASE_URL}/posts/${postId}`, {
      data: updatedPost
    });
    
    expect(response.status()).toBe(200);
    
    const responsePost = await response.json();
    expect(responsePost.id).toBe(postId);
    expect(responsePost.title).toBe(updatedPost.title);
    expect(responsePost.body).toBe(updatedPost.body);
    expect(responsePost.userId).toBe(updatedPost.userId);
  });

  test('TI_API_TC007 - PUT /posts/{id} - Update non-existent post', async ({ request }) => {
    const nonExistentId = 999999;
    const updatedPost = {
      id: nonExistentId,
      title: 'Updated Title',
      body: 'Updated body',
      userId: 1
    };
    
    const response = await request.put(`${BASE_URL}/posts/${nonExistentId}`, {
      data: updatedPost
    });
    
    expect(response.status()).toBe(500);
  });

  test('TI_API_TC008 - PATCH /posts/{id} - Partially update post', async ({ request }) => {
    const postId = 1;
    const partialUpdate = {
      title: 'Partially Updated Title'
    };
    
    const response = await request.patch(`${BASE_URL}/posts/${postId}`, {
      data: partialUpdate
    });
    
    expect(response.status()).toBe(200);
    
    const responsePost = await response.json();
    expect(responsePost.id).toBe(postId);
    expect(responsePost.title).toBe(partialUpdate.title);
    expect(responsePost).toHaveProperty('body');
    expect(responsePost).toHaveProperty('userId');
  });

  test('TI_API_TC009 - PATCH /posts/{id} - Update multiple fields', async ({ request }) => {
    const postId = 2;
    const partialUpdate = {
      title: 'New Title via PATCH',
      body: 'New body content via PATCH'
    };
    
    const response = await request.patch(`${BASE_URL}/posts/${postId}`, {
      data: partialUpdate
    });
    
    expect(response.status()).toBe(200);
    
    const responsePost = await response.json();
    expect(responsePost.id).toBe(postId);
    expect(responsePost.title).toBe(partialUpdate.title);
    expect(responsePost.body).toBe(partialUpdate.body);
    expect(responsePost).toHaveProperty('userId');
  });

  test('TI_API_TC010 - DELETE /posts/{id} - Delete existing post', async ({ request }) => {
    const postId = 1;
    
    const response = await request.delete(`${BASE_URL}/posts/${postId}`);
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toEqual({});
  });

  test('TI_API_TC011 - DELETE /posts/{id} - Delete non-existent post', async ({ request }) => {
    const nonExistentId = 999999;
    
    const response = await request.delete(`${BASE_URL}/posts/${nonExistentId}`);
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toEqual({});
  });

});
