module.exports = (app) => {
    const conn = app.config.db;
    const _self = {};

    _self.buscarFornecedores = (req, res) => {
        conn.query('SELECT * FROM fornecedores', function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    message: 'Error',
                    data: error
                });
                return;
            }
            res.status(200).json({
                message: 'Fornecedores',
                data: results
            });
        });
    }

    _self.buscarFornecedor = (req, res) => {
        const id = req.params.id;
        const errors = [];

        if (!id) errors.push(`Id é obrigatório`);

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Paramentros faltando',
                error: errors
            });
            return;
        }

        conn.query(`SELECT * FROM fornecedores WHERE idfornecedor = ${id}`, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    message: 'Error',
                    data: error
                });
                return;
            }
            res.status(200).json({
                message: 'Fornecedor',
                data: results
            });
        });
    }

    _self.deletarFornecedor = (req, res) => {
        const id = req.params.id;
        const errors = [];

        if (!id) errors.push(`Id é obrigatório`);

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Paramentros faltando',
                error: errors
            });
            return;
        }

        conn.query(`DELETE FROM fornecedores WHERE idfornecedor = ${id}`, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    message: 'Error',
                    data: error
                });
                return;
            }
            res.status(200).json({
                message: 'Fornecedor excluido'
            });
        });
    }

    _self.atualizarFornecedor = (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const errors = [];
        
        if (!id) errors.push(`Id é obrigatório`);

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Paramentros faltando',
                error: errors
            });
            return;
        }

        let camposParaAtualizar = ``;
        if(data.nome_fornecedor) camposParaAtualizar += `nome_fornecedor = '${data.nome_fornecedor}',`;
        if(data.cnpj) camposParaAtualizar += ` cnpj = '${data.cnpj}',`;
        if(data.contato) camposParaAtualizar += ` contato = '${data.contato}'`;

        conn.query(`UPDATE fornecedores SET ${camposParaAtualizar} WHERE idfornecedor = ${id}`, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    message: 'Error',
                    data: error
                });
                return;
            }
            res.status(200).json({
                message: 'Fornecedor atualizado'
            });
        });
    }

    _self.criarFornecedor = (req, res) => {
        const data = req.body;
        const errors = [];
        
        if (!data.nome_fornecedor) errors.push(`Nome do fornecedor é obrigatório`);
        if (!data.cnpj) errors.push(`Cnpj do fornecedor é obrigatório`);

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Paramentros faltando',
                error: errors
            });
            return;
        }

        let campos = `nome_fornecedor, cnpj`;
        let valores = `'${data.nome_fornecedor}', '${data.cnpj}'`;
        if(data.contato) {
            campos += ', contato';
            valores += `, '${data.contato}'`;
        }

        conn.query(`INSERT INTO fornecedores (${campos}) VALUES (${valores})`, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    message: 'Error',
                    data: error
                });
                return;
            }
            res.status(200).json({
                message: 'Fornecedor criado'
            });
        });
    }

    return _self;
};