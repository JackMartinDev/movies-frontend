/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SearchImport } from './routes/search'
import { Route as IndexImport } from './routes/index'
import { Route as MoviesMovieIdImport } from './routes/movies.$movieId'

// Create/Update Routes

const SearchRoute = SearchImport.update({
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MoviesMovieIdRoute = MoviesMovieIdImport.update({
  path: '/movies/$movieId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
    '/movies/$movieId': {
      id: '/movies/$movieId'
      path: '/movies/$movieId'
      fullPath: '/movies/$movieId'
      preLoaderRoute: typeof MoviesMovieIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/search': typeof SearchRoute
  '/movies/$movieId': typeof MoviesMovieIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/search': typeof SearchRoute
  '/movies/$movieId': typeof MoviesMovieIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/search': typeof SearchRoute
  '/movies/$movieId': typeof MoviesMovieIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/search' | '/movies/$movieId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/search' | '/movies/$movieId'
  id: '__root__' | '/' | '/search' | '/movies/$movieId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SearchRoute: typeof SearchRoute
  MoviesMovieIdRoute: typeof MoviesMovieIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SearchRoute: SearchRoute,
  MoviesMovieIdRoute: MoviesMovieIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/search",
        "/movies/$movieId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/search": {
      "filePath": "search.tsx"
    },
    "/movies/$movieId": {
      "filePath": "movies.$movieId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
