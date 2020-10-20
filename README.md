# Research NLP Text parsing Project

## Description

The Project is a resarch project to integrate [MeaningCloud](https://www.meaningcloud.com/) API with content provided by user. It utilizes client facing webpacked frontend with service workers and simple backend to query the API

## Installation steps

- Install Node
- Install npm packages from `packages.json`
- Add API key from [MeaningCloud](https://www.meaningcloud.com/)

## Details

To utilize API key, we're using `.env` files. Put your api key in the file .env in the root of the project in syntax of:

```
API_KEY={key}
```

This file will not be commited to repo.

## Running

```
npm run build-dev
npm run build-prod
npm run start
```
Have fun!