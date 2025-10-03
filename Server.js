        if (livroEncontrado) {
            resposta.json(livroEncontrado);
        } else {
            resposta.status(404).json({ "mensagem": "Livro nÃ£o encontrado." });
        }
    });
});

servidor.delete("/livros/:id", (requisicao, resposta) => {
    let codigoLivro = requisicao.params.id;
    bancoDados.run(`DELETE FROM livros WHERE id = ?`, [codigoLivro], function () {
        if (this.changes === 0) {
            resposta.status(404).json({ "mensagem": "Livro nÃ£o encontrado" });
        } else {
            resposta.json({ "mensagem": "Livro deletado com sucesso" });
        }
    });
});

servidor.put("/livros/:id", (requisicao, resposta) => {
    let codigoLivro = requisicao.params.id;
    let { titulo, autor, ano_publicacao, genero, idioma, preco } = requisicao.body;

    bancoDados.run(
        `UPDATE livros SET titulo = ?, autor = ?, ano_publicacao = ?, genero = ?, idioma = ?, preco = ? WHERE id = ?`,
        [titulo, autor, ano_publicacao, genero, idioma, preco, codigoLivro],
        function () {
            resposta.json({ "mensagem": "Livro atualizado com sucesso" });
        }
    );
});

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
