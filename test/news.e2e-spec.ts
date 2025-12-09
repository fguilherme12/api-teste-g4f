import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/database/core/prisma.service';

describe('Feature: News Management (BDD)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createdNewsId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(
      new (await import('@nestjs/common')).ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('Scenario: Create News', () => {
    it('Given a valid news data, When creating a news, Then should return 201 and the created news', async () => {
      const newsData = {
        title: 'Test News Title',
        description: 'This is a test news description',
      };

      const response = await request(app.getHttpServer())
        .post('/news')
        .send(newsData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newsData.title);
      expect(response.body.description).toBe(newsData.description);
      expect(response.body).toHaveProperty('createdAt');

      createdNewsId = response.body.id;
    });

    it('Given invalid news data with title too long, When creating a news, Then should return 400 with validation error', async () => {
      const invalidNewsData = {
        title: 'a'.repeat(256),
        description: 'Valid description',
      };

      const response = await request(app.getHttpServer())
        .post('/news')
        .send(invalidNewsData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('Given invalid news data with missing required fields, When creating a news, Then should return 400 with validation error', async () => {
      const invalidNewsData = {
        title: 'Only title provided',
      };

      const response = await request(app.getHttpServer())
        .post('/news')
        .send(invalidNewsData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Scenario: List All News', () => {
    it('Given existing news in the database, When listing all news, Then should return 200 with an array of news', async () => {
      const response = await request(app.getHttpServer())
        .get('/news')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('description');
      }
    });

    it('Given the list endpoint is called, When retrieving news, Then should return news ordered by creation date descending', async () => {
      const response = await request(app.getHttpServer())
        .get('/news')
        .expect(200);

      if (response.body.length > 1) {
        const dates = response.body.map((news: any) => new Date(news.createdAt).getTime());
        const sortedDates = [...dates].sort((a, b) => b - a);
        expect(dates).toEqual(sortedDates);
      }
    });
  });

  describe('Scenario: Get News by ID', () => {
    it('Given a valid news ID, When getting news by ID, Then should return 200 with the news details', async () => {
      if (!createdNewsId) {
        const createResponse = await request(app.getHttpServer())
          .post('/news')
          .send({
            title: 'News for Get Test',
            description: 'Description for get test',
          });
        createdNewsId = createResponse.body.id;
      }

      const response = await request(app.getHttpServer())
        .get(`/news/${createdNewsId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdNewsId);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('createdAt');
    });

    it('Given an invalid news ID, When getting news by ID, Then should return 404 with not found error', async () => {
      const invalidId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .get(`/news/${invalidId}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('Scenario: Update News', () => {
    let updateNewsId: string;

    beforeEach(async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/news')
        .send({
          title: 'News to Update',
          description: 'Original description',
        });
      updateNewsId = createResponse.body.id;
    });

    it('Given a valid news ID and update data, When updating news, Then should return 200 with updated news', async () => {
      const updateData = {
        title: 'Updated News Title',
        description: 'Updated description',
      };

      const response = await request(app.getHttpServer())
        .put(`/news/${updateNewsId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('id', updateNewsId);
      expect(response.body.title).toBe(updateData.title);
      expect(response.body.description).toBe(updateData.description);
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('Given an invalid news ID, When updating news, Then should return 404 with not found error', async () => {
      const invalidId = '00000000-0000-0000-0000-000000000000';
      const updateData = {
        title: 'Updated Title',
        description: 'Updated description',
      };

      const response = await request(app.getHttpServer())
        .put(`/news/${invalidId}`)
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });

    it('Given a valid news ID but invalid update data with title too long, When updating news, Then should return error', async () => {
      const invalidUpdateData = {
        title: 'a'.repeat(256),
        description: 'Valid description',
      };

      const response = await request(app.getHttpServer())
        .put(`/news/${updateNewsId}`)
        .send(invalidUpdateData);

      expect([400, 500]).toContain(response.status);
      expect(response.body).toHaveProperty('message');
    });

    it('Given a valid news ID but invalid update data with extra fields, When updating news, Then should return 400 with validation error', async () => {
      const invalidUpdateData = {
        title: 'Valid title',
        description: 'Valid description',
        extraField: 'This should be rejected',
      };

      const response = await request(app.getHttpServer())
        .put(`/news/${updateNewsId}`)
        .send(invalidUpdateData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Scenario: Delete News', () => {
    let deleteNewsId: string;

    beforeEach(async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/news')
        .send({
          title: 'News to Delete',
          description: 'This news will be deleted',
        });
      deleteNewsId = createResponse.body.id;
    });

    it('Given a valid news ID, When deleting news, Then should return 204 and the news should be soft deleted', async () => {
      await request(app.getHttpServer())
        .delete(`/news/${deleteNewsId}`)
        .expect(204);

      const getResponse = await request(app.getHttpServer())
        .get(`/news/${deleteNewsId}`)
        .expect(404);

      expect(getResponse.body).toHaveProperty('message');
    });

    it('Given an invalid news ID, When deleting news, Then should return 404 with not found error', async () => {
      const invalidId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app.getHttpServer())
        .delete(`/news/${invalidId}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });

    it('Given a deleted news ID, When trying to delete again, Then should return 404 with not found error', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/news')
        .send({
          title: 'News to Delete Twice',
          description: 'This will be deleted twice',
        });
      const newsId = createResponse.body.id;

      await request(app.getHttpServer())
        .delete(`/news/${newsId}`)
        .expect(204);

      const secondDeleteResponse = await request(app.getHttpServer())
        .delete(`/news/${newsId}`)
        .expect(404);

      expect(secondDeleteResponse.body).toHaveProperty('message');
    });
  });
});

