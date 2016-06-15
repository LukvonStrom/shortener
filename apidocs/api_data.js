define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "Gets an url by short id",
    "version": "0.1.0",
    "name": "GetId",
    "group": "URL",
    "description": "<p>Endpoints for manipulating the Short URLs.</p>",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Returns Eroor, if an error occurs at the query</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Returns Not Found when long url can't be found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n\"error\": \"internal error\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n\"error\": \"not found\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "domain",
            "description": "<p>example.tld</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"domain\": \"domain.tld\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://domain.tld/api/id/[put an id here]",
        "type": "json"
      }
    ],
    "filename": "apidoc/api.js",
    "groupTitle": "URL"
  },
  {
    "type": "post",
    "url": "/api/insert",
    "title": "Inserts a new URL",
    "version": "0.1.0",
    "name": "InsertURL",
    "group": "URL",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Returns A forbidden, if the URL is already stored in the Database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n\"error\": \"record exists already\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>saved successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"success\": \"saved successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XPOST -H \"Content-Type: application/x-www-form-urlencoded\" -d 'url=example.com&name=example' 'domain.tld/api/insert'",
        "type": "json"
      }
    ],
    "filename": "apidoc/api.js",
    "groupTitle": "URL"
  },
  {
    "type": "post",
    "url": "/api/insert",
    "title": "",
    "version": "0.1.0",
    "name": "InsertURL",
    "group": "URL",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Returns a forbidden, if the URL is already stored in the Database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\tHTTP/1.1 403 Forbidden\n    {\n    \"error\": \"record exists already\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>saved successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\tHTTP/1.1 200 OK\n\t{\n\t\"success\": \"saved successfully\"\n    }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -XPOST -H \"Content-Type: application/x-www-form-urlencoded\" -d 'url=example.com&name=example' 'domain.tld/api/insert'",
        "type": "json"
      }
    ],
    "filename": "apidoc/app.js",
    "groupTitle": "URL"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Gets the version of the API",
    "version": "0.1.0",
    "name": "GetVersion",
    "group": "Version",
    "description": "<p>Endpoint to view the current API Version.</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://domain.tld/api/",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "version",
            "description": "<p>Returns the APIs Version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\tHTTP/1.1 200 OK\n{\n\"version\": \"0.1.0\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api.js",
    "groupTitle": "Version"
  }
] });
