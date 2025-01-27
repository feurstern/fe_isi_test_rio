![image](https://github.com/user-attachments/assets/2c952671-249d-4887-af54-2eabb5b7d12f)# Laravel x NextJS x Postgres

This README provides detailed instructions to install, build, and run the backend project using Docker and locally.

---

## Prerequisites

Before starting, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher recommended)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or higher recommended)
- Bun/Node (if running locally) - [Download bun](https://bun.sh/docs/installation)
 PHP - [Dowload PHP][https://www.php.net/downloads.php]

---


## Credentials  

The project uses a automatically seeder.  Role  1 = Lead,  Role 2 = team

```
      [
                "name" => "Hatsune Miku",
                "email" => "mikumiku@vocaloid.jp",
                "password" => Hash::make("password123!"),
                "role_id" => 1,
                "email_verified_at" => now(),
                "created_at" => now(),
            ],
            [
                "name" => "Yuukirin",
                "email" => "yuki@gmail.com",
                "password" => Hash::make("Yuukirinkawaii123!"),
                "role_id" => 2,
                "email_verified_at" => now(),
                "created_at" => now(),
           ]
```


To run with docker:
I am asssume that you're currently using Linux, and my current machine is using arch linux


```

```bash
sudo docker compose up
```

E
## Run with Docker

### Step 1: Build the Docker Image

1. Navigate to the project directory:
   ```bash
   cd authentication-app-express
   ```

2. Build the Docker image:
   ```bash
   docker-compose build
   ```

### Step 2: Start the Docker Container

1. Run the container:
   ```bash
   docker-compose up
   ```

2. The application will be available at:
   ```
   http://localhost:5454
   ```

### Step 3: Stop the Docker Container

1. To stop the container, press `CTRL+C` in the terminal running Docker Compose.
2. Alternatively, you can stop the containers with:
   ```bash
   docker-compose down
   ```

---


# Run Locally for the Backend

### Step 1: Preparation

1. Navigate to the project directory:
   ```bash
   cd  backend
   ```

2. Perform Migratio and Seeder
   ```bash
   php artisan migrate
   php artisan db:seeder
   ```

### Step 2: Run the Application

1. Start the application:
   ```bash
   php artisan serve 
   ```

2. The application will be available at:
   ```
   http://127.0.0.1:8000/ 
   ```
   depend on your php configuratio.

---



# Run Locally for the Client side

### Step 1: Install Dependencies

1. Navigate to the project directory:
   ```bash
   cd  client
   ```

2. Install bun modules:
   ```bash
   bun i
   ```

### Step 2: Run the Application

1. Start the application:
   ```bash
   bun run dev
   ```

2. The application will be available at:
   ```
   http://localhost:3000
   ```
----


# Troubleshooting

1. **Docker Issues**
   - Ensure your `.env` file is correctly placed and contains all required variables.
   - Check if port `8181` is already in use. If so, stop any services using it or change the port in the `docker-compose.yml` file.

2. **Local Build Issues**
   - Ensure you have Go installed and the required version is being used.




---
#A PI :
1. **Login**
 Post ->  http://127.0.0.1:8000/api/login


![image](https://github.com/user-attachments/assets/8fcc8b15-db66-4784-ae76-1fcdb2223cdb)

2. **Create Task**

   Post -> http://127.0.0.1:8000/api/task/create

![image](https://github.com/user-attachments/assets/3a778b7b-43ce-473d-8b07-4162481894c3)

3.  **Task list**

   Get-> 

   ![image](https://github.com/user-attachments/assets/5347c448-87c6-4e77-89be-bc2f5c2ed281)

4. **Delete task**
    post -> http://127.0.0.1:8000/api/task/delete/13
   ![image](https://github.com/user-attachments/assets/fcb7828d-ed5f-487a-875b-834e8dca7aa4)

6. **update**
  Post -> http://127.0.0.1:8000/api/task/update/6
   ![image](https://github.com/user-attachments/assets/f205c3cb-c4af-4c2e-a157-175495bb9b64)


---
#Screenshot


![image](https://github.com/user-attachments/assets/33edcc45-7c2e-4260-b133-92a4b9897dc5)



![image](https://github.com/user-attachments/assets/eef593f0-3c45-4dd2-8400-df8acf8cd8e3)



![image](https://github.com/user-attachments/assets/c8534acb-4704-4b59-a944-ade09e84ce8c)
