import { Context } from "https://edge.netlify.com";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

type Meta = Record<string, string>;

function extractOgp(metaElements: HTMLMetaElement[]): Meta {
  return metaElements
    .filter((element: HTMLMetaElement) => element.hasAttribute("property"))
    .reduce<Meta>((prev, element) => {
      const property = element.getAttribute("property")?.trim();
      if (!property) return { ...prev };
      const content = element.getAttribute("content") || "";
      return {
        ...prev,
        [property]: content,
      };
    }, {});
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: Request, context: Context) => {
  const url = new URL(request.url).searchParams.get("url");
  if (!url) {
    return context.json({ error: "The query parameter of url is required." });
  }
  const resp = await fetch(url);
  const html = await resp.text();
  const document = new DOMParser().parseFromString(html, "text/html");
  const meta = document?.querySelectorAll("meta");
  if (!meta) {
    return context.json({ error: "Meta element are not found." });
  }
  const ogp = extractOgp([...meta]);
  const response = await context.json(ogp);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET");
  return response;
};
