# :seedling: TechMatch - API

### [About](#information_source-about-the-app) • [Features](#heavy_check_mark-features) • [Technologies](#gear-technologies) • [Endpoints](#door-endpoints) • [Schemas](#bricks-schemas) • [Author](#star2-author)

## :information_source: About The App
<p align="center">
  <img src="./src/assets/images/logo.png" width=115 />
</p>

**API** developed for the webapp **TechMatch**, with a database that relays on the **MongoDB Atlas** cloud.
> :rocket: Available online on [Render](https://techmatch-api.onrender.com)!

The **front-end** of the application can be found at its [GitHub repository](https://github.com/camilafbarcellos/techmatch-api).
> :rocket: Available online on [Vercel](https://techmatch.vercel.app/)!


## :heavy_check_mark: Features
- [Express](https://expressjs.com/) API with complete CRUD routes to [Questions](#questions-endpoints), including token authentication for adding, updating and deleting a question;
    - Uses [JSON Web Token (JWT)](https://jwt.io/) to authenticate and authorize tokens that lasts 1h.
- Cloud [MongoDB Atlas](https://www.mongodb.com/atlas/database) database with [Questions](#question-entity) collection;
- Complete [Postman](https://www.postman.com/) collection containing all the REST API tests and a full detailed description.
    - You can download the JSON file of the [Postman collection](/github/sys-compass_API.postman_collection.json) and import it directly to your Postman to check the full API description and request examples;
    - At Postman, follow ``Import > Select file`` to correctly import the collection and use it.

## :gear: Technologies
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## :door: Endpoints

### Questions Endpoints
|       Route         |    Method    |                   Description                    |                                                                         
|   ---------------   | :----------: |  ----------------------------------------------  |                                                                           
|  `/questions`           |    POST      |  Creates a new question                              | 
|  `/questions`           |    GET       |  Gets all questions                                  |   
|  `/questions/:id`       |    GET       |  Gets a specific question by its ID                  |   
|  `/questions/:id`       |    PUT       |  Updates a specific question by its ID               |                                                        
|  `/questions/:id`       |    DELETE    |  Deletes a specific question by its ID               |                 


### Authentication Endpoints
|       Route         |    Method    |                   Description                    |                                                                         
|   ---------------   | :----------: |  ----------------------------------------------  |                                                                           
|  `/auth`     |    POST      |  Authenticates the admin credentials and generates an JWT token that allows creating, updating and deleting questions      | 

## :bricks: Schemas

### Questions Entity
|    FieldName   |    Type   | Required |
|----------------|:---------:|:--------:|
| `_id`          | ObjectId  |   true   |
| `question`     | String    |   true   |
| `category`     | String    |   true   |

<p align="center">
    <img src="./src/assets/images/database.png" width=80%>
</p>


## :star2: Author
| <img src="https://avatars.githubusercontent.com/camilafbarcellos" width=115>
|--
| <a href="https://github.com/camilafbarcellos">Camila Barcellos</a>

[↑ Back to top](#seedling-techmatch-api)