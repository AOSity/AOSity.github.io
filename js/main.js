document.addEventListener('DOMContentLoaded', function () {
    const model = new Model();
    const view = new View();
    const controller = new Controller(model, view);

    controller.initialize();
});
