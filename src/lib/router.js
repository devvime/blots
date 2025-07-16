import { RouterInstance } from "./helper.js";

export class Router {
  constructor() {
    this.routes = [];

    window.addEventListener("popstate", () => this.resolve());
    document.addEventListener("DOMContentLoaded", () => this.setDataLink());

    RouterInstance.set(this);
  }

  add(path, callback) {
    this.routes.push({ path, callback });
  }

  navigate(path) {
    history.pushState({}, "", path);
    document.querySelector("app").innerHTML = "";
    this.resolve();
    this.setDataLink();
  }

  setDataLink() {
    document.querySelectorAll("a").forEach((el) => {
      const target = el.getAttribute("target");
      if (target !== null) return;
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.style.cursor = "pointer";
        const link = e.currentTarget.getAttribute("href");
        if (link) this.navigate(link);
      });
    });
  }

  resolve() {
    const currentPath = window.location.pathname;
    const query = this.parseQueryParams(window.location.search);
    for (const route of this.routes) {
      const match = this.matchPath(route.path, currentPath);
      if (match) {
        const component = route.callback(match, query);
        if (component?.render) {
          component.render();
        }
        return;
      }
    }
    history.pushState({}, "", "/404");
    document.querySelector("app").innerHTML = "";
  }

  matchPath(routePath, currentPath) {
    const routeParts = routePath.split("/").filter(Boolean);
    const pathParts = currentPath.split("/").filter(Boolean);

    if (routeParts.length !== pathParts.length) return null;

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const pathPart = pathParts[i];

      if (routePart.startsWith(":")) {
        params[routePart.substring(1)] = decodeURIComponent(pathPart);
      } else if (routePart !== pathPart) {
        return null;
      }
    }

    return params;
  }

  parseQueryParams(search) {
    const query = {};
    const params = new URLSearchParams(search);
    params.forEach((value, key) => {
      query[key] = value;
    });
    return query;
  }
}
