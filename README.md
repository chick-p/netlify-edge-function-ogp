# README

This netlify edge function that scrapes contents of meta tag from the head of HTML DOM.

## Usage

Deploy this function to Netlify App, and send request

```shell
$ curl https://NETLIFY_APP_URL/?url=https://www.github.com

{
  "fb:app_id": "1401488693436528",
  "og:image": "https://github.githubassets.com/images/modules/site/social-cards/github-social.png",
  "og:image:alt": "GitHub is where over 83 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...",
  "og:site_name": "GitHub",
  // ...
}
```

## Deploy

```shell
# Preview deploy using Netlify CLI
$ npm run deploy:dev

# Production deploy using Netlify CLI
$ npm run deploy:prod
```
