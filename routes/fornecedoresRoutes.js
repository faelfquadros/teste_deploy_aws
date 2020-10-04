module.exports = (app) => {
    const controller = app.controller.fornecedoresController;
    app.route('/api/fornecedores')
        .get(controller.buscarFornecedores)
        .post(controller.criarFornecedor);
    app.route('/api/fornecedor/:id')
        .get(controller.buscarFornecedor)
        .put(controller.atualizarFornecedor)
        .delete(controller.deletarFornecedor);
};