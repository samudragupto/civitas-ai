# CivitasAI Primary Database Schema

The core persistence tier utilizes **PostgreSQL 16** managed via asynchronous SQLAlchemy ORM models and Alembic migrations.

## Entity Relationship Diagram (ERD)

```
+---------------------------------------------------------------------------------+
|                                    USERS                                        |
+---------------------------------------------------------------------------------+
| PK  | id                 | Integer      | Auto-increment                        |
| IDX | email              | String       | Unique, Not Null                      |
| IDX | username           | String       | Unique, Not Null                      |
|     | hashed_password    | String       | Bcrypt hash, Not Null                 |
|     | role               | Enum         | 'guest', 'registered', 'researcher',  |
|     |                    |              | 'admin'                               |
|     | is_active          | Boolean      | Default True                          |
|     | created_at         | DateTime     | Server default now()                  |
+---------------------------------------------------------------------------------+
                                       |
                                       | (1 to Many)
                                       v
+---------------------------------------------------------------------------------+
|                                  SIMULATIONS                                    |
+---------------------------------------------------------------------------------+
| PK  | id                 | Integer      | Auto-increment                        |
| FK  | user_id            | Integer      | CASCADE on delete, References users.id|
| IDX | title              | String       | Not Null                              |
|     | description        | String       | Nullable                              |
|     | scenario_type      | Enum         | 'optimistic', 'realistic',            |
|     |                    |              | 'pessimistic'                         |
|     | ai_advancement     | Integer      | 0 - 100 scale                         |
|     | climate_action     | Integer      | 0 - 100 scale                         |
|     | global_stability   | Integer      | 0 - 100 scale                         |
|     | population_growth  | Integer      | 0 - 100 scale                         |
|     | energy_innovation  | Integer      | 0 - 100 scale                         |
|     | space_investment   | Integer      | 0 - 100 scale                         |
|     | automation_adoption| Integer      | 0 - 100 scale                         |
|     | education_quality  | Integer      | 0 - 100 scale                         |
|     | healthcare_innov   | Integer      | 0 - 100 scale                         |
|     | results            | JSONB        | Generated structured forecast outputs |
|     | created_at         | DateTime     | Server default now()                  |
|     | updated_at         | DateTime     | Server default now() via trigger      |
+---------------------------------------------------------------------------------+
```

## Indexing & Performance Strategy
- **Users Table:** B-Tree unique composite indices on `(email)` and `(username)` to accelerate high-frequency authentication queries.
- **Simulations Table:** B-Tree index on `(user_id)` to ensure lightning-fast listing of user workspaces, combined with an active GIN/JSONB index on `(results)` to facilitate deep structured field extraction and OpenSearch syncing.
