class Route {
  static routes = [];

  constructor(path, router) {
    this.path = path;
    this.router = router;

    if (!this.path.startsWith("/")) {
      throw new Error("Path should start with '/'");
    }

    if (Route.routes.includes(path)) {
      throw new Error("Path already exists");
    }

    Route.routes.push(path);
  }
}

module.exports = {
  Route,
};
